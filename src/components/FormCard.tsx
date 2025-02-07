"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useAccountStore } from '@/store/Auth'
import { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const signupFormSchema = z.object({
    username: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string().min(8),
})

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type SignupInputs = z.infer<typeof signupFormSchema>;
type LoginInputs = z.infer<typeof loginFormSchema>;

export default function FormCard({ mode }: { mode: "signup" | "login" }) {
    const { createAccount, login } = useAccountStore()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const formSchema = mode === "signup" ? signupFormSchema : loginFormSchema

    const form = useForm<SignupInputs | LoginInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: mode === "signup" ? {
            username: "",
            email: "",
            password: "",
        } : {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: SignupInputs | LoginInputs) {
        try {
            setLoading(() => true)
            setError(null)

            if (mode === "signup") {
                const { username, email, password } = values as SignupInputs;
                const response = await createAccount(username, email, password)
                if (response.error) setError(() => response.error!.message)
                else {
                    const loginResponse = await login(email, password)
                    if (loginResponse.error) setError(() => loginResponse.error!.message)
                }
            } else {
                const { email, password } = values as LoginInputs;
                const loginResponse = await login(email, password)
                if (loginResponse.error) setError(() => loginResponse.error!.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(() => false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6 pb-8 flex flex-col items-center justify-center rounded-lg bg-black text-white w-80">
                {mode === "signup" && (
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="abc" className="border-gray-500" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="abc@gmail.com" className="border-gray-500" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••" className="border-gray-500" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <FormMessage className="text-red-500">{error}</FormMessage>}  
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Loading..." : mode === "signup" ? "Sign Up" : "Login"}
                </Button>
            </form>
        </Form>
    )
} 