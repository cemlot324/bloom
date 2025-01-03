'use client'

import { useEffect, useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export function Notification() {
  const [showNotification, setShowNotification] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission)
      if (Notification.permission === "default") {
        setShowNotification(true)
      }
    }
  }, [])

  const requestPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      if (permission === "granted") {
        new Notification("Welcome!", {
          body: "Thank you for enabling notifications!",
        })
      }
      setShowNotification(false)
    }
  }

  if (!showNotification) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-[300px]">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <p className="text-sm">Would you like to receive notifications?</p>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setShowNotification(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 px-4 pb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNotification(false)}
          >
            No, thanks
          </Button>
          <Button
            size="sm"
            onClick={requestPermission}
          >
            Enable
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

