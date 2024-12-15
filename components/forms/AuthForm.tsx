'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { z, ZodType } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ROUTES from '@/constants/routes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues: T
  formType: 'SIGN_IN' | 'SIGN_UP'
  onSubmit: (data: T) => Promise<{ success: boolean }>
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  })

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data)
  }

  const buttonText = formType === 'SIGN_IN' ? 'Sign In' : 'Create Account'

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-4xl font-bold mb-4 text-center">
        {formType === 'SIGN_IN' ? 'Sign In' : 'Create an Account'}
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        {formType === 'SIGN_IN'
          ? 'Sign in with email'
          : 'Sign up with your email'}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {Object.keys(defaultValues || {})
            .filter((field) => !(formType === 'SIGN_UP' && field === 'name'))
            .map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={field.name === 'password' ? 'password' : 'text'}
                        placeholder={
                          field.name === 'email'
                            ? 'Email address'
                            : field.name === 'password'
                              ? 'Password'
                              : 'Enter your ' + field.name
                        }
                        {...field}
                        className="w-full p-4 rounded-full bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

          {formType === 'SIGN_IN' && (
            <p className="text-sm text-gray-600 text-center">
              Forgot your password?{' '}
              <Link href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </p>
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-purple-600 text-white p-4 rounded-full hover:bg-purple-700 flex items-center justify-center"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="loader animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                {buttonText}...
              </span>
            ) : (
              buttonText
            )}
          </Button>
        </form>
      </Form>

      <p className="text-gray-600 text-center text-sm mt-4">
        {formType === 'SIGN_IN' ? (
          <>
            Don't have an account?{' '}
            <Link
              href={ROUTES.SIGN_UP}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link
              href={ROUTES.SIGN_IN}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </>
        )}
      </p>

      {formType === 'SIGN_UP' && (
        <p className="text-gray-600 text-sm text-center mt-6">
          By clicking {buttonText}, you agree to our{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      )}
    </div>
  )
}

export default AuthForm
