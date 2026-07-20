import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  clientName?: string
  clientEmail?: string
  clientPhone?: string | null
  organization?: string | null
  entityType?: string | null
  jurisdiction?: string | null
  matterType?: string | null
  message?: string | null
  appointmentTime?: string
  cancelUrl?: string
}

const Email = (props: Props) => {
  const safeName = props.clientName || 'Client'
  const safeEmail = props.clientEmail || ''
  const safePhone = props.clientPhone || '—'
  const safeOrg = props.organization || '—'
  const safeEntity = props.entityType || '—'
  const safeJurisdiction = props.jurisdiction || '—'
  const safeMatter = props.matterType || '—'
  const safeMessage = props.message || '—'
  const safeAppt = props.appointmentTime || '—'
  const safeCancelUrl = props.cancelUrl || '#'

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New consultation booking from {safeName} — {safeAppt}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New consultation booking</Heading>

          <Section style={highlightBox}>
            <Text style={highlightText}>{safeAppt}</Text>
            <Text style={highlightSub}>Africa/Kigali (CAT)</Text>
          </Section>

          <Section>
            <Text style={label}>Client</Text>
            <Text style={value}>{safeName} · <Link href={`mailto:${safeEmail}`} style={link}>{safeEmail}</Link></Text>

            <Text style={label}>Phone</Text>
            <Text style={value}>{safePhone}</Text>

            <Text style={label}>Organization</Text>
            <Text style={value}>{safeOrg}</Text>

            <Text style={label}>Entity type</Text>
            <Text style={value}>{safeEntity}</Text>

            <Text style={label}>Jurisdiction</Text>
            <Text style={value}>{safeJurisdiction}</Text>

            <Text style={label}>Matter</Text>
            <Text style={value}>{safeMatter}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={label}>Message</Text>
          <Text style={messageBox}>{safeMessage}</Text>

          <Text style={label}>Cancellation link</Text>
          <Text style={value}><Link href={safeCancelUrl} style={link}>{safeCancelUrl}</Link></Text>

          <Text style={footer}>Reply directly to this email to respond to the client.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ clientName, appointmentDisplay }: Props) => `New booking — ${clientName || 'client'} — ${appointmentDisplay || 'consultation'}`,
  displayName: 'Booking notification (admin)',
  previewData: {
    clientName: 'Jane Doe',
    clientEmail: 'jane@example.com',
    clientPhone: '+250 788 123 456',
    organization: 'Acme Ltd',
    entityType: 'Company',
    jurisdiction: 'Rwanda',
    matterType: 'Corporate',
    message: 'We need help with a contract review.',
    appointmentDisplay: 'Monday, July 21, 2026 at 10:00 AM',
    cancelUrl: 'https://beaconattorneys.rw/booking/cancel?token=sample',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#2c2c2c',
}

const container = {
  padding: '32px 24px',
  maxWidth: '560px',
  margin: '0 auto',
}

const h1 = {
  color: '#1d535e',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 16px',
  letterSpacing: '-0.01em',
}

const label = {
  color: '#6b6b6b',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '16px 0 4px',
}

const value = {
  color: '#2c2c2c',
  fontSize: '15px',
  margin: '0 0 8px',
  lineHeight: '1.5',
}

const link = {
  color: '#1d535e',
  textDecoration: 'none',
}

const highlightBox = {
  backgroundColor: '#f5f0e8',
  borderLeft: '3px solid #c9a84c',
  padding: '16px',
  margin: '16px 0 24px',
}

const highlightText = {
  color: '#1d535e',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 4px',
}

const highlightSub = {
  color: '#6b6b6b',
  fontSize: '13px',
  margin: '0',
}

const messageBox = {
  backgroundColor: '#f5f0e8',
  borderLeft: '3px solid #c9a84c',
  padding: '16px',
  fontSize: '15px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  margin: '8px 0 0',
}

const hr = {
  borderColor: '#e0d8cd',
  margin: '24px 0',
}

const footer = {
  color: '#888888',
  fontSize: '12px',
  margin: '24px 0 0',
}
