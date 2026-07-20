import type { ReactElement } from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: (props: Record<string, unknown>) => ReactElement
  subject: string | ((props: Record<string, unknown>) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string | ((props: Record<string, unknown>) => string)
}

export const TEMPLATES: Record<string, TemplateEntry> = {}
