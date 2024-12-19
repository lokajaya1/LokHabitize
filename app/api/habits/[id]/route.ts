import { NextResponse } from 'next/server'

import Habit from '@/database/habit.model'
import handleError from '@/lib/handlers/error'
import { NotFoundError, ValidationError } from '@/lib/http-errors'
import dbConnect from '@/lib/mongoose'
import { APIErrorResponse } from '@/types/global'
import { HabitUpdateSchema } from '@/lib/validations'

// GET /api/habits/[id]
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse | APIErrorResponse> {
  const { id } = params

  if (!id) {
    return handleError(
      new NotFoundError('Habit ID is required'),
      'api'
    ) as APIErrorResponse
  }

  try {
    await dbConnect()

    const habit = await Habit.findById(id)
    if (!habit) throw new NotFoundError('Habit not found')

    return NextResponse.json({ success: true, data: habit }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

// DELETE /api/habits/[id]
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse | APIErrorResponse> {
  const { id } = params

  if (!id) {
    return handleError(
      new NotFoundError('Habit ID is required'),
      'api'
    ) as APIErrorResponse
  }

  try {
    await dbConnect()

    const habit = await Habit.findByIdAndDelete(id)
    if (!habit) throw new NotFoundError('Habit not found')

    return NextResponse.json({ success: true, data: habit }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

// PUT /api/habits/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse | APIErrorResponse> {
  const { id } = params

  if (!id) {
    return handleError(
      new NotFoundError('Habit ID is required'),
      'api'
    ) as APIErrorResponse
  }

  try {
    await dbConnect()

    const body = await request.json()

    // Validate incoming data
    const validatedData = HabitUpdateSchema.safeParse(body)
    if (!validatedData.success) {
      return handleError(
        new ValidationError(validatedData.error.flatten().fieldErrors),
        'api'
      ) as APIErrorResponse
    }

    // Update habit
    const updatedHabit = await Habit.findByIdAndUpdate(id, validatedData.data, {
      new: true // Return the updated document
    })

    if (!updatedHabit) throw new NotFoundError('Habit not found')

    return NextResponse.json(
      { success: true, data: updatedHabit },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
