import { AuthLayout } from "@/components/auth-layout"
import { LoginForm } from "./components/login-form"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your email to sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  )
}
