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

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  logoUrl?: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  logoUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {logoUrl && (
          <Link href={siteUrl}>
            <Img src={logoUrl} alt={siteName} width="160" style={logo} />
          </Link>
        )}
        <Heading style={h1}>Welcome to {siteName}</Heading>
        <Text style={paragraph}>
          Thank you for creating an account. Please confirm your email address by clicking the button below.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Confirm email
        </Button>
        <Text style={paragraph}>
          This link was sent for{' '}
          <Link href={`mailto:${recipient}`} style={link}>
            {recipient}
          </Link>
          . If you did not create this account, you can safely ignore this email.
        </Text>
        <Text style={footer}>Beacon Attorneyes & Consultants · KG 190 St, RIM House, 1st Floor, Kigali, Rwanda</Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

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
