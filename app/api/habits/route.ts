import { NextResponse } from 'next/server'

import Habit from '@/database/habit.model'
import dbConnect from '@/lib/mongoose'
import { HabitCreateSchema, HabitUpdateSchema } from '@/lib/validations'
import { ValidationError, NotFoundError } from '@/lib/http-errors'
import handleError from '@/lib/handlers/error'
import { APIErrorResponse } from '@/types/global'

/**
 * GET - Fetch one habit or all habits.
 */
export async function GET(
  request: Request
): Promise<NextResponse | APIErrorResponse> {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id') // Fetch ID if provided

    if (id) {
      // Fetch habit by ID
      const habit = await Habit.findById(id)
      if (!habit) {
        throw new NotFoundError('Habit not found')
      }
      return NextResponse.json({ success: true, data: habit }, { status: 200 })
    }

    // Fetch all habits
    const habits = await Habit.find()
    return NextResponse.json({ success: true, data: habits }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

/**
 * POST - Create a new habit.
 */
export async function POST(
  request: Request
): Promise<NextResponse | APIErrorResponse> {
  try {
    await dbConnect()

    const body = await request.json()

    // Validate incoming data using zod schema
    const validatedData = HabitCreateSchema.safeParse(body)

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors)
    }

    // Create and save new habit
    const newHabit = new Habit(validatedData.data)
    await newHabit.save()

    return NextResponse.json({ success: true, data: newHabit }, { status: 201 })
  } catch (error) {
    console.error('Error creating habit:', error)
    return handleError(error, 'api') as APIErrorResponse
  }
}

/**
 * PUT - Update an existing habit by ID.
 */
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

    // Validate update data
    const validatedData = HabitUpdateSchema.safeParse(updateData)

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors)
    }

    // Update habit in database
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
    console.error('Error updating habit:', error)
    return handleError(error, 'api') as APIErrorResponse
  }
}

/**
 * DELETE - Remove a habit by ID.
 */
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

    // Delete habit from database
    const deletedHabit = await Habit.findByIdAndDelete(id)

    if (!deletedHabit) {
      throw new NotFoundError('Habit not found')
    }

    return NextResponse.json(
      { success: true, data: deletedHabit },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting habit:', error)
    return handleError(error, 'api') as APIErrorResponse
  }
}
