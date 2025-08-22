interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="border rounded-lg p-6 bg-card shadow-sm">{children}</div>
      </div>
    </div>
  )
}
