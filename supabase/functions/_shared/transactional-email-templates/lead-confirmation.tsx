import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  message?: string
}

const Email = ({ name, email, message }: Props) => {
  const safeName = name || 'there'
  const safeEmail = email || ''

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your inquiry has been received — Beacon Attorneyes & Consultants</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Inquiry received</Heading>
          <Text style={paragraph}>Dear {safeName},</Text>
          <Text style={paragraph}>
            Thank you for contacting <strong>Beacon Attorneyes & Consultants</strong>. We confirm that your inquiry has been received and is being reviewed by the appropriate legal team.
          </Text>
          <Text style={paragraph}>
            We aim to respond within one business day. If your matter is time-sensitive, please contact us directly at{' '}
            <Link href="tel:+250788559603" style={link}>+250 788 55 96 03</Link> or{' '}
            <Link href="mailto:info@beaconattorneys.rw" style={link}>info@beaconattorneys.rw</Link>.
          </Text>

          <Hr style={hr} />

          <Section>
            <Text style={label}>For your reference, a copy of your message is included below:</Text>
            <Text style={messageBox}>{message || '—'}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={paragraph}>
            The information you provide is treated as confidential and is intended solely for the purpose of assessing your matter. This email does not constitute legal advice and does not create a solicitor-client relationship.
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
  subject: 'We have received your inquiry — Beacon Attorneyes & Consultants',
  displayName: 'Lead confirmation (visitor)',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'I need assistance with a corporate governance matter.',
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
  fontWeight: '600' as const,
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
  margin: '0 0 8px',
}

const messageBox = {
  backgroundColor: '#f5f0e8',
  borderLeft: '3px solid #c9a84c',
  padding: '16px',
  fontSize: '15px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
}

const signature = {
  color: '#2c2c2c',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '4px 0 0',
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
