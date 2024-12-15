'use server'

import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import { signIn } from '@/auth'
import Account from '@/database/account.model'
import User from '@/database/user.model'

import action from '../handlers/action'
import handleError from '../handlers/error'
import logger from '../logger'
import { NotFoundError, UnauthorizedError } from '../http-errors'
import { SignInSchema, SignUpSchema } from '../validations'
import { ActionResponse, ErrorResponse } from '@/types/global'

// Fungsi untuk Sign Up
export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema })

  if (validationResult instanceof Error) {
    logger.warn('Validation failed during sign-up', validationResult)
    return handleError(validationResult) as ErrorResponse
  }

  const { username, email, password } = validationResult.params!
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    logger.info(`Attempting sign-up for email: ${email}`)

    // Cek apakah user/email sudah ada
    const existingUser = await User.findOne({ email }).session(session)
    if (existingUser) throw new Error('User already exists')

    const existingUsername = await User.findOne({ username }).session(session)
    if (existingUsername) throw new Error('Username already exists')

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Buat user dan account
    const [newUser] = await User.create([{ username, name, email }], {
      session
    })

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: 'credentials',
          providerAccountId: email,
          password: hashedPassword
        }
      ],
      { session }
    )

    await session.commitTransaction()

    logger.info(`User created successfully: ${email}`)

    // Auto-login setelah registrasi
    await signIn('credentials', { email, password, redirect: false })

    return { success: true }
  } catch (error) {
    logger.error(
      { err: error },
      `Error occurred during sign-up for email: ${email}`
    )
    await session.abortTransaction()
    return handleError(error) as ErrorResponse
  } finally {
    await session.endSession()
  }
}

// Fungsi untuk Sign In
export async function signInWithCredentials(
  params: Pick<AuthCredentials, 'email' | 'password'>
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignInSchema })

  if (validationResult instanceof Error) {
    logger.warn('Validation failed during sign-in', validationResult)
    return handleError(validationResult) as ErrorResponse
  }

  const { email, password } = validationResult.params!

  try {
    logger.info(`Attempting sign-in for email: ${email}`)

    // Cari user berdasarkan email
    const existingUser = await User.findOne({ email })
    if (!existingUser) throw new NotFoundError('User')

    // Cari akun berdasarkan provider credentials
    const existingAccount = await Account.findOne({
      provider: 'credentials',
      providerAccountId: email
    })
    if (!existingAccount) throw new NotFoundError('Account')

    // Periksa password
    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password
    )
    if (!passwordMatch) throw new UnauthorizedError('Password does not match')

    // Login berhasil
    await signIn('credentials', { email, password, redirect: false })

    logger.info(`User signed in successfully: ${email}`)
    return { success: true }
  } catch (error) {
    logger.error(
      { err: error },
      `Error occurred during sign-in for email: ${email}`
    )
    return handleError(error) as ErrorResponse
  }
}
