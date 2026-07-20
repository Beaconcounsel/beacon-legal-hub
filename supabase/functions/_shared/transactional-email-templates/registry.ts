import type { ReactElement } from 'npm:react@18.3.1'
import { template as leadNotification } from './lead-notification.tsx'
import { template as leadConfirmation } from './lead-confirmation.tsx'
import { template as bookingConfirmation } from './booking-confirmation.tsx'
import { template as bookingNotification } from './booking-notification.tsx'

export interface TemplateEntry {
  component: (props: Record<string, unknown>) => ReactElement
  subject: string | ((props: Record<string, unknown>) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string | ((props: Record<string, unknown>) => string)
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'lead-notification': leadNotification,
  'lead-confirmation': leadConfirmation,
  'booking-confirmation': bookingConfirmation,
  'booking-notification': bookingNotification,
}
