import { NextResponse } from 'next/server'

import Habit from '@/database/habit.model'
import handleError from '@/lib/handlers/error'
import { NotFoundError } from '@/lib/http-errors'
import dbConnect from '@/lib/mongoose'
import { APIErrorResponse } from '@/types/global'
import { HabitUpdateSchema } from '@/lib/validations'

// GET /api/habits/[id]
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!id) throw new NotFoundError('Habit')

  try {
    await dbConnect()

    const habit = await Habit.findById(id)
    if (!habit) throw new NotFoundError('Habit')

    return NextResponse.json({ success: true, data: habit }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

// DELETE /api/habits/[id]
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!id) throw new NotFoundError('Habit')

  try {
    await dbConnect()

    const habit = await Habit.findByIdAndDelete(id)
    if (!habit) throw new NotFoundError('Habit')

    return NextResponse.json({ success: true, data: habit }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

// PUT /api/habits/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!id) throw new NotFoundError('Habit')

  try {
    await dbConnect()

    const body = await request.json()
    const validatedData = HabitUpdateSchema.parse(body)

    const updatedHabit = await Habit.findByIdAndUpdate(id, validatedData, {
      new: true
    })

    if (!updatedHabit) throw new NotFoundError('Habit')

    return NextResponse.json(
      { success: true, data: updatedHabit },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
