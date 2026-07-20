/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  siteName: string
  logoUrl?: string
  token: string
}

export const ReauthenticationEmail = ({ siteName, logoUrl, token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification code for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {logoUrl && <Img src={logoUrl} alt={siteName} width="160" style={logo} />}
        <Heading style={h1}>Confirm your identity</Heading>
        <Text style={paragraph}>Use the verification code below to complete your request:</Text>
        <Text style={code}>{token}</Text>
        <Text style={paragraph}>This code will expire shortly. If you did not request this, you can safely ignore this email.</Text>
        <Text style={footer}>Beacon Attorneyes & Consultants · KG 190 St, RIM House, 1st Floor, Kigali, Rwanda</Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

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

const code = {
  fontFamily: 'Courier, monospace',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  letterSpacing: '0.05em',
  color: '#0f2d34',
  backgroundColor: '#f5f0e8',
  padding: '16px 24px',
  borderRadius: '6px',
  display: 'inline-block',
  margin: '0 0 24px',
}

const footer = {
  color: '#888888',
  fontSize: '12px',
  margin: '32px 0 0',
  lineHeight: '1.5',
}
