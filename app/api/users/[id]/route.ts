import { NextResponse } from 'next/server'
import Habit from '@/database/habit.model'
import dbConnect from '@/lib/mongoose'
import { NotFoundError } from '@/lib/http-errors'
import handleError from '@/lib/handlers/error'
import { HabitUpdateSchema } from '@/lib/validations'
import { APIErrorResponse } from '@/types/global'

async function findHabitById(id: string) {
  if (!id) throw new NotFoundError('Habit')

  await dbConnect()
  const habit = await Habit.findById(id)
  if (!habit) throw new NotFoundError('Habit')
  return habit
}

// GET Habit
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const habit = await findHabitById(params.id)
    return NextResponse.json({ success: true, data: habit }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

// DELETE Habit
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const habit = await Habit.findByIdAndDelete(params.id)
    if (!habit) throw new NotFoundError('Habit')

    return NextResponse.json({ success: true, data: habit }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

// UPDATE Habit
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = HabitUpdateSchema.parse(body)

    const updatedHabit = await Habit.findByIdAndUpdate(
      params.id,
      validatedData,
      {
        new: true
      }
    )

    if (!updatedHabit) throw new NotFoundError('Habit')

    return NextResponse.json(
      { success: true, data: updatedHabit },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
