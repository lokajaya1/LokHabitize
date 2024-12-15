import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

import Account from '@/database/account.model'
import User from '@/database/user.model'
import handleError from '@/lib/handlers/error'
import { ValidationError } from '@/lib/http-errors'
import dbConnect from '@/lib/mongoose'
import { SignInWithOAuthSchema } from '@/lib/validations'

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json()

  await dbConnect()

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Validasi input data
    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user
    })

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors)

    const { username, email, image } = user

    // Slugify username untuk format bersih
    let slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true
    })

    // Pastikan username unik
    let existingUser = await User.findOne({ email }).session(session)
    if (!existingUser) {
      let usernameExists = await User.exists({
        username: slugifiedUsername
      }).session(session)

      // Tambahkan angka jika username duplikat
      if (usernameExists) {
        slugifiedUsername = `${slugifiedUsername}-${Date.now().toString().slice(-4)}`
      }

      // Buat user baru
      ;[existingUser] = await User.create(
        [{ username: slugifiedUsername, email, image }],
        { session }
      )
    } else {
      // Update image jika user sudah ada
      const updatedData: { image?: string } = {}

      if (existingUser.image !== image) updatedData.image = image

      if (Object.keys(updatedData).length > 0) {
        await User.updateOne(
          { _id: existingUser._id },
          { $set: updatedData }
        ).session(session)
      }
    }

    // Cek atau buat akun OAuth
    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId
    }).session(session)

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            username: slugifiedUsername,
            image,
            provider,
            providerAccountId
          }
        ],
        { session }
      )
    }

    // Commit transaksi database
    await session.commitTransaction()

    // Berikan respons sukses dengan informasi user
    return NextResponse.json({
      success: true,
      data: {
        userId: existingUser._id,
        username: existingUser.username,
        email: existingUser.email
      }
    })
  } catch (error: unknown) {
    await session.abortTransaction()
    return handleError(error, 'api') as NextResponse
  } finally {
    session.endSession()
  }
}
