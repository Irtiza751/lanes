import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { LocalStorage } from '@/shared/lib/classes/LocalStorage'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '@/api'
import { LoginResponse } from './login-response.interface'
import { AxiosError } from 'axios'
// import { LoginError } from './login-error.interface'

const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  password: z.string().min(6),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const [showCredsError, setShowCredsError] = useState('')
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (creds: LoginForm) => {
    console.log(creds)
    setShowCredsError('')
    try {
      const res = await api.post<LoginResponse>('/auth/signin', creds)
      LocalStorage.setItem('token', res.data.token)
      LocalStorage.setItem('sessionId', res.data.id)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          setShowCredsError(error.response?.data.message)
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className='w-md'>
        {/* error */}
        {showCredsError && (
          <div className="text-center py-2 bg-red-500 mt-3 mx-3 rounded">
            <span>{showCredsError}</span>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="name@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="****************" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
