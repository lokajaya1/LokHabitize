import { NextResponse } from 'next/server'

import Habit from '@/database/habit.model'
import dbConnect from '@/lib/mongoose'
import { HabitCreateSchema, HabitUpdateSchema } from '@/lib/validations'
import { ValidationError, NotFoundError } from '@/lib/http-errors'
import handleError from '@/lib/handlers/error'
import { APIErrorResponse } from '@/types/global'

export async function GET(
  request: Request
): Promise<NextResponse | APIErrorResponse> {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id') // Ambil ID jika tersedia

    if (id) {
      // Jika ID diberikan, cari habit berdasarkan ID
      const habit = await Habit.findById(id)
      if (!habit) {
        throw new NotFoundError('Habit not found')
      }
      return NextResponse.json({ success: true, data: habit }, { status: 200 })
    }

    // Jika tidak ada ID, ambil semua habit
    const habits = await Habit.find()
    return NextResponse.json({ success: true, data: habits }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function POST(
  request: Request
): Promise<NextResponse | APIErrorResponse> {
  try {
    await dbConnect()

    const body = await request.json()

    const validatedData = HabitCreateSchema.safeParse(body)

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors)
    }

    const newHabit = await Habit.create(validatedData.data)

    return NextResponse.json({ success: true, data: newHabit }, { status: 201 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse | APIErrorResponse> {
  try {
    await dbConnect()

    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      throw new ValidationError({ id: ['Habit ID is required'] })
    }

    const validatedData = HabitUpdateSchema.safeParse(updateData)

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors)
    }

    const updatedHabit = await Habit.findByIdAndUpdate(id, validatedData.data, {
      new: true
    })

    if (!updatedHabit) {
      throw new NotFoundError('Habit not found')
    }

    return NextResponse.json(
      { success: true, data: updatedHabit },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function DELETE(
  request: Request
): Promise<NextResponse | APIErrorResponse> {
  try {
    await dbConnect()

    const body = await request.json()
    const { id } = body

    if (!id) {
      throw new ValidationError({ id: ['Habit ID is required'] })
    }

    const deletedHabit = await Habit.findByIdAndDelete(id)

    if (!deletedHabit) {
      throw new NotFoundError('Habit not found')
    }

    return NextResponse.json(
      { success: true, data: deletedHabit },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
