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
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  logoUrl?: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  logoUrl,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset your password for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {logoUrl && <Img src={logoUrl} alt={siteName} width="160" style={logo} />}
        <Heading style={h1}>Reset your password</Heading>
        <Text style={paragraph}>
          We received a request to reset your password for your account. Click the button below to choose a new password.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Reset password
        </Button>
        <Text style={paragraph}>
          If you did not request a password reset, you can safely ignore this email. Your password will not be changed.
        </Text>
        <Text style={footer}>Beacon Attorneyes & Consultants · KK 698 St, 2nd Floor, Gikondo Business Center, Kigali, Rwanda</Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

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
