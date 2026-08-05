import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  appointmentTime?: string
  matterType?: string | null
}

const Email = ({ name, appointmentTime, matterType }: Props) => {
  const safeName = name || 'there'
  const safeAppt = appointmentTime || 'your selected time'
  const safeMatter = matterType || '—'

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>We have received your consultation request for {safeAppt}. It is now under review.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Consultation request received</Heading>
          <Text style={paragraph}>Dear {safeName},</Text>
          <Text style={paragraph}>
            Thank you for your request for a consultation with <strong>Beacon Attorneyes &amp; Consultants</strong>. Your requested time has been provisionally reserved.
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>{safeAppt}</Text>
            <Text style={highlightSub}>Requested · Africa/Kigali (CAT)</Text>
          </Section>

          <Text style={label}>Matter</Text>
          <Text style={value}>{safeMatter}</Text>

          <Hr style={hr} />

          <Text style={paragraph}>
            Your request will be <strong>reviewed and approved by a senior counsel</strong>. Once approved, you will receive a separate confirmation email with the final appointment details and a calendar invitation. If the requested time is unavailable, we will write to you and propose alternatives.
          </Text>

          <Text style={paragraph}>
            Please note that this email acknowledges receipt of your request only; it does not constitute a confirmed appointment.
          </Text>

          <Text style={paragraph}>
            The information shared in connection with this request is treated as confidential. This email does not constitute legal advice and does not establish a solicitor-client relationship.
          </Text>

          <Text style={signature}>
            Sincerely,
            <br />
            <strong>Beacon Attorneyes &amp; Consultants</strong>
            <br />
            KK 698 St, 2nd Floor, Gikondo Business Center, Kigali, Rwanda
            <br />
            <Link href="tel:+250788559603" style={link}>+250 788 55 96 03</Link> ·{' '}
            <Link href="mailto:info@beaconattorneys.rw" style={link}>info@beaconattorneys.rw</Link>
          </Text>

          <Text style={footer}>This is an automated acknowledgement. Please do not reply to this address.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ appointmentTime }: Props) => `Consultation request received — ${appointmentTime || 'under review'}`,
  displayName: 'Booking request received (client)',
  previewData: {
    name: 'Jane Doe',
    appointmentTime: 'Monday, July 21, 2026 at 10:00 AM',
    matterType: 'Corporate & Commercial',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', color: '#2c2c2c' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { color: '#1d535e', fontSize: '24px', fontWeight: '600', margin: '0 0 16px', letterSpacing: '-0.01em' }
const paragraph = { color: '#2c2c2c', fontSize: '15px', lineHeight: '1.6', margin: '0 0 12px' }
const label = { color: '#6b6b6b', fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '16px 0 4px' }
const value = { color: '#2c2c2c', fontSize: '15px', margin: '0 0 8px', lineHeight: '1.5' }
const link = { color: '#1d535e', textDecoration: 'none' }
const highlightBox = { backgroundColor: '#f5f0e8', borderLeft: '3px solid #c9a84c', padding: '16px', margin: '16px 0 24px' }
const highlightText = { color: '#1d535e', fontSize: '18px', fontWeight: '600', margin: '0 0 4px' }
const highlightSub = { color: '#6b6b6b', fontSize: '13px', margin: '0' }
const hr = { borderColor: '#e6e1d8', margin: '24px 0' }
const signature = { color: '#2c2c2c', fontSize: '14px', lineHeight: '1.7', margin: '24px 0 0' }
const footer = { color: '#9a9a9a', fontSize: '12px', margin: '24px 0 0' }
