"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"


export default function Header({user}:{user: User | null}) {
  const router = useRouter()
  const supabase = createClient()


  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Notes App</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {
              user ? <Button 
              variant="ghost" 
              onClick={handleSignOut}
              className="button-hover"
            >
              Sign Out
            </Button> :
            <Link href="/login">Sign in</Link>
            }
          </nav>
        </div>
      </div>
    </header>
  )
}