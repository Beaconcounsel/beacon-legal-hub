import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  appointmentTime?: string
  matterType?: string | null
  cancelUrl?: string
}

const Email = ({ name, appointmentTime, matterType, cancelUrl }: Props) => {
  const safeName = name || 'there'
  const safeAppt = appointmentTime || 'your selected time'
  const safeMatter = matterType || '—'
  const safeCancelUrl = cancelUrl || '#'

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your consultation with Beacon Attorneyes & Consultants is confirmed for {safeAppt}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Consultation confirmed</Heading>
          <Text style={paragraph}>Dear {safeName},</Text>
          <Text style={paragraph}>
            We are writing to confirm your upcoming consultation with <strong>Beacon Attorneyes & Consultants</strong>.
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>{safeAppt}</Text>
            <Text style={highlightSub}>Kigali, Rwanda · Africa/Kigali (CAT)</Text>
          </Section>

          <Text style={label}>Host</Text>
          <Text style={value}>Daniel Mutiganda</Text>

          <Text style={label}>Matter</Text>
          <Text style={value}>{safeMatter}</Text>

          <Hr style={hr} />

          <Text style={paragraph}>
            Should you need to cancel or reschedule your appointment, please use the link below. Cancellations received at least 24 hours prior to the scheduled time are free of charge. Late cancellations and no-shows will be subject to the full consultation fee.
          </Text>

          <Button href={safeCancelUrl} style={button}>Cancel or reschedule</Button>

          <Text style={paragraph}>
            A calendar invitation will be sent to you shortly. Please retain this email for your records.
          </Text>

          <Text style={paragraph}>
            The information shared in connection with this consultation is treated as confidential. This email does not constitute legal advice and does not establish a solicitor-client relationship.
          </Text>

          <Text style={signature}>
            Sincerely,
            <br />
            <strong>Beacon Attorneyes & Consultants</strong>
            <br />
            KK 698 St, 2nd Floor, Gikondo Business Center, Kigali, Rwanda
            <br />
            <Link href="tel:+250788559603" style={link}>+250 788 55 96 03</Link> ·{' '}
            <Link href="mailto:info@beaconattorneys.rw" style={link}>info@beaconattorneys.rw</Link>
          </Text>

          <Text style={footer}>This is an automated confirmation. Please do not reply to this address.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ appointmentTime }: Props) => `Consultation confirmed — ${appointmentTime || 'Beacon Attorneyes & Consultants'}`,
  displayName: 'Booking confirmation (client)',
  previewData: {
    name: 'Jane Doe',
    appointmentTime: 'Monday, July 21, 2026 at 10:00 AM',
    matterType: 'Corporate & Commercial',
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

const hr = {
  borderColor: '#e0d8cd',
  margin: '24px 0',
}

const footer = {
  color: '#888888',
  fontSize: '12px',
  margin: '24px 0 0',
}
