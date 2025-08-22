import { AuthLayout } from "@/components/auth-layout"
import { SignUpForm } from "./components/signup-form"

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your details to create your account"
    >
      <SignUpForm />
    </AuthLayout>
  )
}
