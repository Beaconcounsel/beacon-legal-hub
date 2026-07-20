import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string | null
  message?: string
  sourcePage?: string
  leadId?: string
  createdAt?: string
}

const Email = ({ name, email, phone, message, sourcePage, leadId, createdAt }: Props) => {
  const safeName = name || 'Visitor'
  const safeEmail = email || ''
  const safePhone = phone || '—'
  const safeMessage = message || '—'
  const safeSource = sourcePage || 'Website'
  const safeLeadId = leadId || ''
  const safeCreatedAt = createdAt ? new Date(createdAt).toLocaleString('en-GB', { timeZone: 'Africa/Kigali' }) : '—'

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New lead submission from {safeName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New lead submission</Heading>
          <Text style={intro}>A new message was submitted on <strong>{safeSource}</strong>.</Text>

          <Hr style={hr} />

          <Section>
            <Text style={label}>Name</Text>
            <Text style={value}>{safeName}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>
              <Link href={`mailto:${safeEmail}`} style={link}>{safeEmail}</Link>
            </Text>

            <Text style={label}>Phone</Text>
            <Text style={value}>{safePhone}</Text>

            <Text style={label}>Submitted</Text>
            <Text style={value}>{safeCreatedAt}</Text>

            {safeLeadId && (
              <>
                <Text style={label}>Lead ID</Text>
                <Text style={value}><code style={code}>{safeLeadId}</code></Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Text style={label}>Message</Text>
          <Text style={messageBox}>{safeMessage}</Text>

          <Text style={footer}>Reply directly to this email to respond to the client.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ name, sourcePage }: Props) => `New lead from ${name || 'visitor'} — ${sourcePage || 'website'}`,
  displayName: 'Lead notification (admin)',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+250 788 123 456',
    message: 'I need help with a corporate matter.',
    sourcePage: 'Contact page',
    leadId: 'lead-123',
    createdAt: new Date().toISOString(),
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

const intro = {
  color: '#2c2c2c',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 24px',
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

const code = {
  backgroundColor: '#f5f0e8',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '13px',
  fontFamily: 'monospace',
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
