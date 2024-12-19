import mongoose from 'mongoose'
import Habit, { IHabitDoc } from '@/database/habit.model'
import action from '../handlers/action'
import handleError from '../handlers/error'
import { NotFoundError } from '../http-errors'
import { HabitCreateSchema, HabitUpdateSchema } from '../validations'
import { ActionResponse, ErrorResponse } from '@/types/global'

async function withTransaction<T>(
  callback: (session: mongoose.ClientSession) => Promise<T>
): Promise<T> {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const result = await callback(session)
    await session.commitTransaction()
    return result
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

export async function createHabit(
  params: Record<string, any>
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: HabitCreateSchema })

  if (validationResult instanceof Error) {
    console.error('Validation Error:', validationResult)
    return handleError(validationResult) as ErrorResponse
  }

  try {
    const habitData = validationResult.params
    const newHabit = await withTransaction(async (session) => {
      const [createdHabit] = await Habit.create([habitData], { session })
      return createdHabit
    })

    return { success: true, data: newHabit }
  } catch (error) {
    console.error('Error during habit creation:', error)
    return handleError(error) as ErrorResponse
  }
}

export async function updateHabit(
  habitId: string,
  params: Record<string, any>
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: HabitUpdateSchema })

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse
  }

  try {
    const updatedHabit = await withTransaction(async (session) => {
      const habit = await Habit.findByIdAndUpdate(
        habitId,
        validationResult.params,
        { new: true, session }
      )

      if (!habit) {
        throw new NotFoundError('Habit')
      }
      return habit
    })

    return { success: true, data: updatedHabit }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}

export async function deleteHabit(habitId: string): Promise<ActionResponse> {
  try {
    const deletedHabit = await withTransaction(async (session) => {
      const habit = await Habit.findByIdAndDelete(habitId, { session })
      if (!habit) {
        throw new NotFoundError('Habit')
      }
      return habit
    })

    return { success: true, data: deletedHabit }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}

export async function getHabits(): Promise<ActionResponse<IHabitDoc[]>> {
  try {
    const habits = await Habit.find()
    return { success: true, data: habits }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}

export async function getHabitById(habitId: string): Promise<ActionResponse> {
  try {
    const habit = await Habit.findById(habitId)

    if (!habit) {
      throw new NotFoundError('Habit')
    }

    return { success: true, data: habit }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}
