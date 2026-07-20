import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  message?: string
}

const Email = ({ name, message }: Props) => {
  const safeName = name || 'there'
  const safeMessage = message || ''

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Thank you — we've received your message.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you, {safeName}.</Heading>
          <Text style={paragraph}>We have received your message and a member of our team will get back to you shortly — typically within one business day.</Text>

          <Hr style={hr} />

          <Text style={label}>For reference, here is a copy of what you sent us:</Text>
          <Text style={messageBox}>{safeMessage}</Text>

          <Hr style={hr} />

          <Text style={paragraph}>Warm regards,</Text>
          <Text style={signature}>
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
  subject: 'We received your message — Beacon Attorneyes & Consultants',
  displayName: 'Lead confirmation (visitor)',
  previewData: {
    name: 'Jane Doe',
    message: 'I need help with a corporate matter.',
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
