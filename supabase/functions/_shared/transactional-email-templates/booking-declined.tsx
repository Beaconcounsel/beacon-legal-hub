import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  appointmentTime?: string
  bookingUrl?: string
  note?: string | null
}

const Email = ({ name, appointmentTime, bookingUrl, note }: Props) => {
  const safeName = name || 'there'
  const safeAppt = appointmentTime || 'the requested time'
  const safeUrl = bookingUrl || 'https://beaconattorneys.rw/#book-consultation'

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Regarding your consultation request for {safeAppt}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Regarding your consultation request</Heading>
          <Text style={paragraph}>Dear {safeName},</Text>
          <Text style={paragraph}>
            Thank you for your interest in instructing <strong>Beacon Attorneyes &amp; Consultants</strong>. Following review by our senior counsel, we regret that we are unable to accommodate the following requested time:
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>{safeAppt}</Text>
            <Text style={highlightSub}>Not available · Africa/Kigali (CAT)</Text>
          </Section>

          {note ? <Text style={paragraph}>{note}</Text> : null}

          <Text style={paragraph}>
            We would be pleased to meet you at an alternative time. Please select another slot at your convenience using the link below.
          </Text>

          <Button href={safeUrl} style={button}>Choose another time</Button>

          <Hr style={hr} />

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
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ appointmentTime }: Props) => `Your consultation request — ${appointmentTime || 'alternative time required'}`,
  displayName: 'Booking request declined (client)',
  previewData: {
    name: 'Jane Doe',
    appointmentTime: 'Monday, July 21, 2026 at 10:00 AM',
    bookingUrl: 'https://beaconattorneys.rw/#book-consultation',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', color: '#2c2c2c' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { color: '#1d535e', fontSize: '24px', fontWeight: '600', margin: '0 0 16px', letterSpacing: '-0.01em' }
const paragraph = { color: '#2c2c2c', fontSize: '15px', lineHeight: '1.6', margin: '0 0 12px' }
const link = { color: '#1d535e', textDecoration: 'none' }
const highlightBox = { backgroundColor: '#f5f0e8', borderLeft: '3px solid #c9a84c', padding: '16px', margin: '16px 0 24px' }
const highlightText = { color: '#1d535e', fontSize: '18px', fontWeight: '600', margin: '0 0 4px' }
const highlightSub = { color: '#6b6b6b', fontSize: '13px', margin: '0' }
const hr = { borderColor: '#e6e1d8', margin: '24px 0' }
const signature = { color: '#2c2c2c', fontSize: '14px', lineHeight: '1.7', margin: '24px 0 0' }
const button = { backgroundColor: '#1d535e', color: '#ffffff', fontSize: '14px', padding: '12px 20px', borderRadius: '4px', textDecoration: 'none', display: 'inline-block', margin: '8px 0 16px' }
