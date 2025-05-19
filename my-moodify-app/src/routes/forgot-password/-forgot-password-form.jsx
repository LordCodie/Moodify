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
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
// import { passwordReset } from "@/utilities/firebase/firebase-client"
import { useAuth } from "@/context/AuthContext"

export function ForgotPasswordForm({
    className,
    ...props
}) {
    const { passwordreset } = useAuth()

    const [isSuccess, setIsSuccess] = useState(false)
    const [submitError, setSubmitError] = useState(undefined)

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
        defaultValues: { email: '' },
        onSubmit: async ({ value }) => {
            setSubmitError(undefined)
            setIsSuccess(false)
            console.log("form:", { email: value.email })
            const { success, message } = await passwordreset(value.email)
            if (!success) {
                setSubmitError(message)
                return
            }
            setIsSuccess(true)
            console.log({ succes: success, message: message })
            console.log('Email Sent To:', value)
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
                    <CardTitle className="text-xl">Forgot Your Password ?</CardTitle>
                    <CardDescription>
                        Reset Your Account Password
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6">
                        {
                            !isSuccess ?
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-6">
                                        {/* Email */}
                                        <div className="grid gap-3">
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
                                                        <div className="flex items-center">
                                                            <Label htmlFor={field.name}>Email</Label>
                                                        </div>
                                                        <Input
                                                            id={field.name}
                                                            name={field.name}
                                                            value={field.state.value}
                                                            onChange={e => field.handleChange(e.target.value)}
                                                            type="email"
                                                            placeholder="m@example.com"
                                                            required
                                                        />
                                                        <FieldInfo field={field} />
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <form.Subscribe
                                            selector={state => [state.canSubmit, state.isSubmitting]}
                                            children={([canSubmit, isSubmitting]) => (
                                                <>
                                                    {
                                                        submitError
                                                            ?
                                                            <div className="w-full">{submitError}</div>
                                                            :
                                                            <Button type="submit" className="w-full" disabled={!canSubmit}>
                                                                {isSubmitting ? '...' : "Reset Password"}
                                                            </Button>
                                                    }
                                                </>
                                            )}
                                        />
                                    </div>
                                </form>
                                : <div className="text-center">An link has been sent to your email, please click on the link to change your password</div>
                        }

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}