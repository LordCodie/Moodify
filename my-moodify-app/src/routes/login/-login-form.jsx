import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { ThreeDotsFade } from "react-svg-spinners"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export function LoginForm({
  className,
  ...props
}) {
  const { signin, googlesignin } = useAuth()

  const navigate = useNavigate()

  const [isSuccess, setIsSuccess] = useState(undefined)
  const [submitError, setSubmitError] = useState(false)

  const FieldInfo = ({ field }) => {
    return (
      <>
        {field.state.meta.isTouched && !field.state.meta.isValid
          ? <em>{field.state.meta.errors.join(',')}</em>
          : null}
        {field.state.meta.isValidating ? 'Loading...' : null}
      </>
    )
  }

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      setSubmitError(false)
      console.log("Form Data:", {
        email: value.email,
        password: value.password
      })
      const { success, message } = await signin(value.email, value.password)
      if (!success) {
        setSubmitError(message)
        // console.log("submitError", submitError)
        return
      }
      console.log(message)
      navigate({ to: '/generate' })
      console.log('submitted:', value)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white">

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-muted-foreground text-balance">
            Login to your Moodify account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'An email is required'
                    const regex = new RegExp("^.+@.+\\..+$")
                    if (!regex.test(value)) return 'Email is invialid'
                    return undefined
                  },
                  onChangeAsyncDebounceMs: 500
                }}
                children={field => (
                  <>
                    <div className="grid gap-3 mb-6">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                      <FieldInfo field={field} />
                    </div>
                  </>
                )}
              />

              {/* Password */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Password Is required"
                    if (value.length < 6) return "Password must be greater than 6 characters"
                    return undefined
                  },
                  onChangeAsyncDebounceMs: 500
                }}
                children={field => (
                  <>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="password"
                        required
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                )}
              />

              <div className="">
                {submitError && <em className="text-center py-2">{submitError}</em>}
              </div>


              <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <>
                    <Button
                      type="submit"
                      className="w-full mt-6 hover:text-[#FFFFFF] hover:bg-[#000000]"
                      disabled={!canSubmit}>
                      {isSubmitting ? <ThreeDotsFade /> : "Login"}
                    </Button>
                  </>
                )}
              />
            </form>

            <div
              className="text-center text-sm ">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                type="button"
                className="w-full hover:bg-[#F42C04]"
                onClick={async () => {
                  const { success, message } = await googlesignin()
                  if (!success) {
                    setSubmitError(message)
                    return
                  }
                  console.log("google pop over sign-in:", { success: success, message: message })
                  navigate({ to: '/generate' })
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor" />
                </svg>
                Login with Google
              </Button>
            </div>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
