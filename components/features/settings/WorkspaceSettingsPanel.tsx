'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeading } from '@/components/shared/PageHeading'

export function WorkspaceSettingsPanel() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Workspace settings"
        title="Settings"
        description="Manage workspace preferences, reporting cadence, and notifications."
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          <button
            type="button"
            className="whitespace-nowrap rounded-lg bg-muted px-3 py-2 text-left text-sm font-medium"
          >
            General
          </button>
          <button
            type="button"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
          >
            Notifications
          </button>
          <button
            type="button"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
          >
            Members & roles
          </button>
        </nav>

        <div className="flex flex-col gap-4">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">General preferences</CardTitle>
              <CardDescription>
                Set defaults for your reporting workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Workspace name</label>
                  <Input defaultValue="Pulseboard" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Week starts on</label>
                  <Select defaultValue="Monday">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium">Weekly reminders</p>
                  <p className="text-xs text-muted-foreground">
                    Send members a reminder before the weekly deadline.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="size-4 accent-primary"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => setSaved(true)}>
              {saved ? (
                <>
                  <Check data-icon="inline-start" />
                  Saved
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
