import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  clientName?: string
  clientEmail?: string
  clientPhone?: string | null
  matterType?: string | null
  appointmentDisplay?: string
  cancelUrl?: string
}

const Email = ({ clientName, matterType, appointmentDisplay, cancelUrl }: Props) => {
  const safeName = clientName || 'there'
  const safeAppt = appointmentDisplay || 'your selected time'
  const safeMatter = matterType || '—'
  const safeCancelUrl = cancelUrl || '#'

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your consultation with Daniel Mutiganda is confirmed for {safeAppt}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Your consultation is confirmed.</Heading>
          <Text style={paragraph}>Dear {safeName},</Text>
          <Text style={paragraph}>Your consultation with Daniel Mutiganda is confirmed for:</Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>{safeAppt}</Text>
            <Text style={highlightSub}>Africa/Kigali (CAT)</Text>
          </Section>

          <Text style={label}>Matter</Text>
          <Text style={value}>{safeMatter}</Text>

          <Hr style={hr} />

          <Text style={paragraph}>Need to cancel? You can do so using the link below. Cancellations made at least 24 hours before the appointment are free of charge. Late cancellations and no-shows are subject to the full consultation fee.</Text>

          <Button href={safeCancelUrl} style={button}>Cancel or reschedule</Button>

          <Text style={signature}>
            Warm regards,
            <br />
            <strong>Beacon Attorneyes & Consultants</strong>
            <br />
            KG 190 St, RIM House, 1st Floor, Kigali, Rwanda
            <br />
            +250 788 55 96 03 · <Link href="mailto:info@beaconattorneys.rw" style={link}>info@beaconattorneys.rw</Link>
          </Text>

          <Text style={footer}>This is an automated confirmation. Please do not reply to this address.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ appointmentDisplay }: Props) => `Consultation confirmed — ${appointmentDisplay || 'Beacon Attorneyes'}`,
  displayName: 'Booking confirmation (client)',
  previewData: {
    clientName: 'Jane Doe',
    clientEmail: 'jane@example.com',
    clientPhone: '+250 788 123 456',
    matterType: 'Corporate',
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

const paragraph = {
  color: '#2c2c2c',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 12px',
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
  margin: '0',
}

const button = {
  backgroundColor: '#1d535e',
  color: '#f5f0e8',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  margin: '16px 0 24px',
}

const signature = {
  color: '#2c2c2c',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '24px 0 0',
}

const link = {
  color: '#1d535e',
  textDecoration: 'none',
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
