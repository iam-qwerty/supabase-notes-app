"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { signup } from "../../login/actions"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await signup(formData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form action={handleSubmit} className="space-y-4">
        <div className="grid gap-4 grid-cols-2">
          {/* <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="firstName">
              First name
            </label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="lastName">
              Last name
            </label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              required
              disabled={isLoading}
            />
          </div> */}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full button-hover"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By clicking Create account, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <div className="mt-4 text-center text-sm">
        <Link 
          href="/login"
          className="text-primary hover:underline underline-offset-4"
        >
          Already have an account? Sign in
        </Link>
      </div>

      {/* <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="button-hover" disabled={isLoading}>
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.0003 2C6.4773 2 2.00034 6.477 2.00034 12C2.00034 17.523 6.4773 22 12.0003 22C17.5233 22 22.0003 17.523 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2ZM15.5923 17.892C14.6923 18.461 13.6743 18.75 12.0003 18.75C9.0633 18.75 6.6743 16.959 5.5383 14.389C5.1993 13.661 5.00034 12.852 5.00034 12C5.00034 8.691 8.0233 6 12.0003 6C13.4773 6 14.7863 6.434 15.8923 7.207L13.6933 9.406H13.6923C13.0343 8.918 12.1193 8.759 11.0003 9.061C9.8813 9.364 9.0633 10.083 8.6383 11.001C7.9393 12.542 8.5233 14.25 10.0003 15L10.0013 15.001C10.7913 15.428 11.6543 15.545 12.5013 15.26C13.3493 14.975 13.9793 14.312 14.2923 13.587H9.7503V10.587H17.8763C17.9543 11.118 18.0003 11.627 18.0003 12.119C18.0003 13.646 17.7613 14.99 17.1543 16.028C16.5483 17.067 15.8343 17.599 15.5923 17.892Z"/>
          </svg>
          Google
        </Button>
        <Button variant="outline" className="button-hover" disabled={isLoading}>
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.6823 2C16.5545 2 16.4268 2 16.2889 2C16.1511 2 16.0132 2 15.8753 2C15.7375 2 15.5996 2 15.4618 2C15.324 2 15.1861 2 15.0483 2H9.00732C4.64184 2 2 4.64184 2 9.00732V14.9927C2 19.3582 4.64184 22 9.00732 22H14.9927C19.3582 22 22 19.3582 22 14.9927V9.00732C22 4.64184 19.3582 2 14.9927 2H16.6823ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z"/>
          </svg>
          GitHub
        </Button>
      </div> */}
    </>
  )
}
