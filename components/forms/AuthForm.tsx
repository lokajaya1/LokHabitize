'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useForm,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler
} from 'react-hook-form'
import { z, ZodType } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ROUTES from '@/constants/routes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { ActionResponse } from '@/types/global'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues: T
  formType: 'SIGN_IN' | 'SIGN_UP'
  onSubmit: (data: T) => Promise<ActionResponse>
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit
}: AuthFormProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  })

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const response = await onSubmit(data)

    if (response?.success) {
      toast({
        title: 'Success',
        description:
          formType === 'SIGN_IN'
            ? 'Signed in successfully!'
            : 'Account created successfully!'
      })
      router.push(ROUTES.DASHBOARD)
    } else {
      toast({
        title: `Error ${response?.status}`,
        description: response?.error?.message,
        variant: 'destructive'
      })
    }
  }

  const buttonText = formType === 'SIGN_IN' ? 'Sign In' : 'Create Account'

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-4xl font-bold mb-4 text-center">
        {formType === 'SIGN_IN' ? 'Sign In' : 'Create an Account'}
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        {formType === 'SIGN_IN'
          ? 'Sign in with your email and password'
          : 'Sign up with your email and password'}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          field.name === 'password' && showPassword
                            ? 'text'
                            : field.name === 'password'
                              ? 'password'
                              : 'text'
                        }
                        placeholder={
                          field.name === 'email'
                            ? 'Email address'
                            : field.name === 'password'
                              ? 'Password'
                              : `Enter your ${field.name}`
                        }
                        {...field}
                        className="w-full p-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      {field.name === 'password' && (
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center bg-transparent shadow-none text-gray-500 hover:bg-transparent"
                        >
                          {showPassword ? (
                            <EyeIcon className="w-5 h-5" />
                          ) : (
                            <Image
                              src="/icons/eye-off.svg"
                              width={20}
                              height={20}
                              alt="eye off"
                              className="w-5 h-5"
                            />
                          )}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-primary text-white p-4 rounded-lg hover:bg-primary-dark flex items-center justify-center"
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
            Don&apos;t have an account?{' '}
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
    </div>
  )
}

export default AuthForm
