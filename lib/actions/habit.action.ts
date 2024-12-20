import mongoose from 'mongoose'
import Habit, { IHabitDoc } from '@/database/habit.model'
import action from '../handlers/action'
import handleError from '../handlers/error'
import { NotFoundError } from '../http-errors'
import { HabitCreateSchema, HabitUpdateSchema } from '../validations'
import { ActionResponse, ErrorResponse } from '@/types/global'

type HabitParams = {
  title: string
  goal: number
  repeat: 'Daily' | 'Weekly' | 'Monthly'
  startDate: string
  location?: string
  duration: number
  durationUnit: 'Mins' | 'Hours' | 'Times' | 'Km' | 'M'
  reminder?: string
}

export async function createHabit(
  params: Record<string, any>
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: HabitCreateSchema })

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse
  }

  const habitData = validationResult.params as HabitParams

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const newHabit = await Habit.create([habitData], { session })

    await session.commitTransaction()

    return { success: true, data: newHabit[0] }
  } catch (error) {
    await session.abortTransaction()

    return handleError(error) as ErrorResponse
  } finally {
    session.endSession()
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

  const habitData = validationResult.params as Partial<HabitParams>

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, habitData, {
      new: true,
      session,
      runValidators: true
    })

    if (!updatedHabit) {
      throw new NotFoundError('Habit')
    }

    await session.commitTransaction()

    return { success: true, data: updatedHabit }
  } catch (error) {
    await session.abortTransaction()

    return handleError(error) as ErrorResponse
  } finally {
    session.endSession()
  }
}

export async function deleteHabit(habitId: string): Promise<ActionResponse> {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const deletedHabit = await Habit.findByIdAndDelete(habitId, { session })

    if (!deletedHabit) {
      throw new NotFoundError('Habit')
    }

    await session.commitTransaction()

    return { success: true, data: deletedHabit }
  } catch (error) {
    await session.abortTransaction()

    return handleError(error) as ErrorResponse
  } finally {
    session.endSession()
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
