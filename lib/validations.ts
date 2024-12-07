import * as z from 'zod'

export const SignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine(
      (val, ctx) => {
        if (val !== ctx.parent.password) {
          return false
        }
        return true
      },
      {
        message: "Passwords don't match"
      }
    )
})

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
})
