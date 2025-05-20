import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md"></div>
              <span className="text-xl font-bold">Prepy</span>
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Reset your password</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                Send reset link
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link href="/signin" className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
