import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { RequestError, ValidationError } from '@/lib/http-errors'
import logger from '../logger'

export type ResponseType = 'api' | 'server'

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors || null // Pastikan null jika errors tidak tersedia
    }
  }

  // Jika responseType adalah 'api', gunakan NextResponse JSON
  if (responseType === 'api') {
    return NextResponse.json(responseContent, { status })
  }

  // Jika responseType adalah 'server', kembalikan dalam bentuk object
  return { status, ...responseContent }
}

/**
 * Penanganan error untuk aplikasi LokHabitize.
 * Menghandle berbagai tipe error termasuk RequestError, ZodError, dan Error umum.
 */
const handleError = (error: unknown, responseType: ResponseType = 'server') => {
  // Log awal untuk tipe error yang diterima
  logger.error(
    { type: typeof error, rawError: error },
    'Raw error data received'
  )

  // Jika error adalah turunan dari RequestError
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} Error: ${error.message}`
    )

    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    )
  }

  // Jika error berasal dari validasi Zod
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    )

    logger.error({ err: error }, `Validation Error: ${validationError.message}`)

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    )
  }

  // Jika error adalah Error umum
  if (error instanceof Error) {
    logger.error({ message: error.message, stack: error.stack })

    return formatResponse(responseType, 500, error.message)
  }

  // Jika error adalah string
  if (typeof error === 'string') {
    logger.error({ message: error }, 'String error encountered')

    return formatResponse(responseType, 500, error)
  }

  // Jika error adalah objek biasa
  if (typeof error === 'object' && error !== null) {
    logger.error({ err: error }, 'Unknown object error encountered')

    return formatResponse(
      responseType,
      500,
      'An unexpected object error occurred'
    )
  }

  // Jika error tidak dikenal
  logger.error({ err: error }, 'An unexpected error occurred')

  return formatResponse(responseType, 500, 'An unexpected error occurred')
}

export default handleError
