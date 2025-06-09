// src/components/ui/dialog.tsx

import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'

export const Dialog = RadixDialog.Root

export const DialogTrigger = RadixDialog.Trigger

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="dialog-overlay" />
    <RadixDialog.Content ref={ref} className="dialog-content" {...props}>
      {children}
    </RadixDialog.Content>
  </RadixDialog.Portal>
))

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="dialog-header">{children}</div>
)

export const DialogTitle = RadixDialog.Title
