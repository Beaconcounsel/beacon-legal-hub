/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface EmailChangeEmailProps {
  siteName: string
  logoUrl?: string
  // oldEmail is the user's current address (HookData.OldEmail). For the
  // NEW-recipient half of a secure email_change fanout, `email` equals the
  // recipient (NEW), so the "from" line must render oldEmail to read
  // "from OLD to NEW" instead of "from NEW to NEW".
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  logoUrl,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email change for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {logoUrl && <Img src={logoUrl} alt={siteName} width="160" style={logo} />}
        <Heading style={h1}>Confirm your email change</Heading>
        <Text style={paragraph}>
          You requested to change your email address for {siteName} from{' '}
          <Link href={`mailto:${oldEmail}`} style={link}>
            {oldEmail}
          </Link>{' '}
          to{' '}
          <Link href={`mailto:${newEmail}`} style={link}>
            {newEmail}
          </Link>
          .
        </Text>
        <Text style={paragraph}>Click the button below to confirm this change:</Text>
        <Button style={button} href={confirmationUrl}>
          Confirm email change
        </Button>
        <Text style={paragraph}>
          If you did not request this change, please secure your account immediately.
        </Text>
        <Text style={footer}>Beacon Attorneyes & Consultants · KG 190 St, RIM House, 1st Floor, Kigali, Rwanda</Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

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

const logo = {
  margin: '0 0 24px',
  display: 'block',
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
  margin: '0 0 20px',
}

const link = {
  color: '#1d535e',
  textDecoration: 'none',
}

const button = {
  backgroundColor: '#c9a84c',
  color: '#0f2d34',
  fontSize: '14px',
  fontWeight: '600' as const,
  borderRadius: '6px',
  padding: '12px 24px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '0 0 20px',
}

const footer = {
  color: '#888888',
  fontSize: '12px',
  margin: '32px 0 0',
  lineHeight: '1.5',
}
