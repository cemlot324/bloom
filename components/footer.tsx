"use client"


import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleAdminAccess = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "1234") {
      router.push("/admin")
      setIsOpen(false)
      setPassword("")
    } else {
      toast.error("Incorrect password")
      setPassword("")
    }
  }

  return (
    <footer className="bg-gray-100 border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Bloom. All rights reserved.
        </p>
        <div className="text-center mt-2">
          <button
            onClick={handleAdminAccess}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Admin Dashboard
          </button>
        </div>
      </div>

      {/* Password Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-red-200 focus:ring-red-500 focus:border-red-500"
            />
            <Button 
              type="submit"
              variant="outline"
              className="w-full text-red-500 border-red-500 hover:bg-red-50 
                hover:text-red-600 hover:border-red-600 transition-colors"
            >
              Access Dashboard
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </footer>
  )
}

