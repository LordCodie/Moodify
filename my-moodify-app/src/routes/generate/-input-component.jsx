import { useForm } from "@tanstack/react-form"
import { useNavigate } from '@tanstack/react-router'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, RotateCcw } from "lucide-react"
import { getSongs } from "@/utilities/central-algo"
import React, { useState } from "react"
import { useSongs } from "@/context/SongsContext"
import { BlocksShuffleTwo } from "react-svg-spinners"

export default function InputComponent() {
    const navigate = useNavigate()
    const { setSongs } = useSongs()

    const [subError, setSubError] = useState(false)

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
        defaultValues: { command: '' },
        onSubmit: async ({ value }) => {
            // setSubError(true)

            console.log("command message:", value.command)

            const { success, data, message } = await getSongs(value.command)
            console.log({ success, data, message })
            if (!success) return setSubError(message)

            setSongs(data)

            navigate({ to: '/recommendations' })
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    return (
        <div className="p-12">
            <Card className="bg-white mt-16">
                <form onSubmit={handleSubmit}>

                    <CardHeader>
                        <CardTitle className="text-center text-xl">Tell Me How You're Feeling ?</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form.Field
                            name="command"
                            children={field => (
                                <>
                                    <div className="md:flex justify-center items-center flex-wrap">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={e => field.handleChange(e.target.value)}
                                            type="text"
                                            placeholder="I'm listening..."
                                            className="text-lg"
                                        />
                                        <p className="my-2 text-xs block text-base leading-relaxed text-gray-600">To give you the best recommendations, please specify a genre you enjoy and include any artist you’d like me to search for by wrapping their name in single quotes — <span className="text-xs text-gray-500 italic">(e.g. 'Drake')</span></p>
                                    </div>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="w-full flex justify-end items-end">
                        <form.Subscribe
                            selector={state => [state.canSubmit, state.isSubmitting, state.values.command]}
                            children={([canSubmit, isSubmitting, command]) => (
                                <>
                                    {
                                        subError ?
                                            (
                                                <>
                                                    <em>{subError}</em>
                                                    <Button
                                                        type="button"
                                                        className="bg-[#F4AC45] hover:bg-[#F42C04] ml-10"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            form.reset()
                                                            setSubError(false)
                                                        }}
                                                    >
                                                        <>Try Again <RotateCcw /></>
                                                    </Button>
                                                </>
                                            )
                                            :
                                            (<Button
                                                type="submit"
                                                className="bg-[#F4AC45] hover:bg-[#F42C04]"
                                                disabled={!command}>
                                                {isSubmitting ?
                                                    <><BlocksShuffleTwo /> Recommending Songs</>
                                                    :
                                                    <> <Send /> Send</>
                                                }
                                            </Button>)
                                    }
                                </>
                            )}
                        />
                    </CardFooter>

                </form>
            </Card>
        </div>
    )
}