import type { ReactElement } from 'npm:react@18.3.1'
import { template as leadNotification } from './lead-notification.tsx'
import { template as leadConfirmation } from './lead-confirmation.tsx'
import { template as leadConfirmationFr } from './lead-confirmation-fr.tsx'
import { template as bookingConfirmation } from './booking-confirmation.tsx'
import { template as bookingConfirmationFr } from './booking-confirmation-fr.tsx'
import { template as bookingNotification } from './booking-notification.tsx'
import { template as bookingRequestReceived } from './booking-request-received.tsx'
import { template as bookingRequestReceivedFr } from './booking-request-received-fr.tsx'
import { template as bookingDeclined } from './booking-declined.tsx'
import { template as bookingDeclinedFr } from './booking-declined-fr.tsx'

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
  'lead-confirmation-fr': leadConfirmationFr,
  'booking-confirmation': bookingConfirmation,
  'booking-confirmation-fr': bookingConfirmationFr,
  'booking-notification': bookingNotification,
  'booking-request-received': bookingRequestReceived,
  'booking-request-received-fr': bookingRequestReceivedFr,
  'booking-declined': bookingDeclined,
  'booking-declined-fr': bookingDeclinedFr,
}
