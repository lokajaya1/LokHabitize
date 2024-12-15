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
      details: errors
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

  // Jika error tidak dikenal
  logger.error({ err: error }, 'An unexpected error occurred')

  return formatResponse(responseType, 500, 'An unexpected error occurred')
}

export default handleError
