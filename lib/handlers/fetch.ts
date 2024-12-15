import { RequestError } from '@/lib/http-errors'

interface FetchOptions extends RequestInit {
  timeout?: number
}

function isError(error: unknown): error is Error {
  return error instanceof Error
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  const config: RequestInit = {
    ...restOptions,
    headers: { ...defaultHeaders, ...customHeaders },
    signal: controller.signal
  }

  try {
    const response = await fetch(url, config)

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP Error: ${response.status}`)
    }

    return (await response.json()) as T
  } catch (err) {
    clearTimeout(timeoutId)

    const error = isError(err) ? err : new Error('Unknown error occurred')

    if (error.name === 'AbortError') {
      console.warn(`Request to ${url} timed out.`)
      throw new Error('Request timeout. Please try again later.')
    }

    console.error(`Error fetching ${url}: ${error.message}`)
    throw error
  }
}
