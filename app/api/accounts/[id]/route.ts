import { NextResponse } from 'next/server'

import Account from '@/database/account.model'
import handleError from '@/lib/handlers/error'
import { NotFoundError, ValidationError } from '@/lib/http-errors'
import dbConnect from '@/lib/mongoose'
import { AccountSchema } from '@/lib/validations'
import { APIErrorResponse } from '@/types/global'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await dbConnect()

    const account = await Account.findById(id).lean()
    if (!account) throw new NotFoundError('Account')

    return NextResponse.json({ success: true, data: account }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    await dbConnect()

    const body = await request.json()
    const validatedData = AccountSchema.partial().parse(body)

    const updatedAccount = await Account.findByIdAndUpdate(id, validatedData, {
      new: true
    })

    if (!updatedAccount) throw new NotFoundError('Account')

    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    await dbConnect()

    const deletedAccount = await Account.findByIdAndDelete(id)
    if (!deletedAccount) throw new NotFoundError('Account')

    return NextResponse.json(
      { success: true, data: deletedAccount },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
