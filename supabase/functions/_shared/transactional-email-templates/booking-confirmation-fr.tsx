import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  appointmentTime?: string
  matterType?: string | null
  cancelUrl?: string
}

const Email = ({ name, appointmentTime, matterType, cancelUrl }: Props) => {
  const safeName = name || 'Madame, Monsieur'
  const safeAppt = appointmentTime || "l'horaire sélectionné"
  const safeMatter = matterType || '—'
  const safeCancelUrl = cancelUrl || '#'

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Votre consultation avec Beacon Attorneyes & Consultants est confirmée pour le {safeAppt}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Consultation confirmée</Heading>
          <Text style={paragraph}>Bonjour {safeName},</Text>
          <Text style={paragraph}>
            Nous avons le plaisir de confirmer votre prochaine consultation avec <strong>Beacon Attorneyes & Consultants</strong>.
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>{safeAppt}</Text>
            <Text style={highlightSub}>Kigali, Rwanda · Africa/Kigali (CAT)</Text>
          </Section>

          <Text style={label}>Conseiller</Text>
          <Text style={value}>Daniel Mutiganda</Text>

          <Text style={label}>Matière</Text>
          <Text style={value}>{safeMatter}</Text>

          <Hr style={hr} />

          <Text style={paragraph}>
            Si vous devez annuler ou reporter votre rendez-vous, veuillez utiliser le lien ci-dessous. Les annulations reçues au moins 24 heures avant l'heure prévue sont gratuites. Les annulations tardives et les absences non excusées seront soumises à l'intégralité des honoraires de consultation.
          </Text>

          <Button href={safeCancelUrl} style={button}>Annuler ou reporter</Button>

          <Text style={paragraph}>
            Vous recevrez sous peu une invitation à ajouter ce rendez-vous à votre calendrier. Nous vous invitons à conserver le présent courriel pour vos archives.
          </Text>

          <Text style={paragraph}>
            Les informations échangées dans le cadre de cette consultation sont traitées de manière confidentielle. Le présent courriel ne constitue pas un avis juridique et ne crée aucune relation avocat-client.
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
  subject: ({ appointmentTime }: Props) => `Consultation confirmée — ${appointmentTime || 'Beacon Attorneyes & Consultants'}`,
  displayName: 'Booking confirmation FR (client)',
  previewData: {
    name: 'Jean Dupont',
    appointmentTime: 'lundi 21 juillet 2026 à 10:00',
    matterType: "Droit des sociétés et commercial",
    cancelUrl: 'https://beaconattorneys.rw/booking/cancel?token=sample',
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

const highlightBox = {
  backgroundColor: '#f5f0e8',
  borderLeft: '3px solid #c9a84c',
  padding: '16px',
  margin: '16px 0 24px',
}

const highlightText = {
  color: '#1d535e',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 4px',
}

const highlightSub = {
  color: '#6b6b6b',
  fontSize: '13px',
  margin: '0',
}

const button = {
  backgroundColor: '#1d535e',
  color: '#f5f0e8',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  margin: '16px 0 24px',
}

const signature = {
  color: '#2c2c2c',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '24px 0 0',
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
