import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  message?: string
}

const Email = ({ name, email, message }: Props) => {
  const safeName = name || 'Madame, Monsieur'
  const safeEmail = email || ''

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Votre demande a bien été reçue — Beacon Attorneyes & Consultants</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Demande bien reçue</Heading>
          <Text style={paragraph}>Bonjour {safeName},</Text>
          <Text style={paragraph}>
            Nous vous remercions d'avoir contacté <strong>Beacon Attorneyes & Consultants</strong>. Nous confirmons que votre demande a bien été reçue et est en cours d'examen par l'équipe juridique compétente.
          </Text>
          <Text style={paragraph}>
            Nous nous efforçons de vous répondre dans un délai d'un jour ouvrable. Si votre affaire est urgente, veuillez nous contacter directement au{' '}
            <Link href="tel:+250788559603" style={link}>+250 788 55 96 03</Link> ou à l'adresse{' '}
            <Link href="mailto:info@beaconattorneys.rw" style={link}>info@beaconattorneys.rw</Link>.
          </Text>

          <Hr style={hr} />

          <Section>
            <Text style={label}>Pour votre référence, voici une copie de votre message :</Text>
            <Text style={messageBox}>{message || '—'}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={paragraph}>
            Les informations que vous nous communiquez sont traitées de manière confidentielle et sont destinées uniquement à l'évaluation de votre demande. Le présent courriel ne constitue pas un avis juridique et ne crée aucune relation avocat-client.
          </Text>

          <Text style={signature}>
            Cordialement,
            <br />
            <strong>Beacon Attorneyes & Consultants</strong>
            <br />
            KK 698 St, 2e étage, Gikondo Business Center, Kigali, Rwanda
            <br />
            <Link href="tel:+250788559603" style={link}>+250 788 55 96 03</Link> ·{' '}
            <Link href="mailto:info@beaconattorneys.rw" style={link}>info@beaconattorneys.rw</Link>
          </Text>

          <Text style={footer}>Ceci est une confirmation automatique. Veuillez ne pas répondre à cette adresse.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: 'Nous avons bien reçu votre demande — Beacon Attorneyes & Consultants',
  displayName: 'Lead confirmation FR (visitor)',
  previewData: {
    name: 'Jean Dupont',
    email: 'jean@example.com',
    message: 'Je souhaite obtenir des conseils en matière de gouvernance d\'entreprise.',
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
