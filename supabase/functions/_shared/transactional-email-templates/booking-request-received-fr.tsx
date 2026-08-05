import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  appointmentTime?: string
  matterType?: string | null
}

const Email = ({ name, appointmentTime, matterType }: Props) => {
  const safeName = name || 'Madame, Monsieur'
  const safeAppt = appointmentTime || 'le créneau demandé'
  const safeMatter = matterType || '—'

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Nous avons bien reçu votre demande de consultation pour {safeAppt}. Elle est en cours d’examen.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Demande de consultation reçue</Heading>
          <Text style={paragraph}>Cher/Chère {safeName},</Text>
          <Text style={paragraph}>
            Nous vous remercions pour votre demande de consultation auprès de <strong>Beacon Attorneyes &amp; Consultants</strong>. Le créneau demandé a été réservé à titre provisoire.
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>{safeAppt}</Text>
            <Text style={highlightSub}>Demandé · Afrique/Kigali (CAT)</Text>
          </Section>

          <Text style={label}>Dossier</Text>
          <Text style={value}>{safeMatter}</Text>

          <Hr style={hr} />

          <Text style={paragraph}>
            Votre demande sera <strong>examinée et approuvée par un avocat principal</strong>. Après approbation, vous recevrez un e-mail de confirmation distinct comportant les détails définitifs du rendez-vous ainsi qu’une invitation d’agenda. Si le créneau demandé n’est pas disponible, nous vous proposerons d’autres possibilités.
          </Text>

          <Text style={paragraph}>
            Veuillez noter que le présent message accuse uniquement réception de votre demande et ne constitue pas un rendez-vous confirmé.
          </Text>

          <Text style={paragraph}>
            Les informations communiquées dans le cadre de cette demande sont traitées de manière confidentielle. Cet e-mail ne constitue pas un avis juridique et n’établit pas de relation avocat-client.
          </Text>

          <Text style={signature}>
            Cordialement,
            <br />
            <strong>Beacon Attorneyes &amp; Consultants</strong>
            <br />
            KK 698 St, 2e étage, Gikondo Business Center, Kigali, Rwanda
            <br />
            <Link href="tel:+250788559603" style={link}>+250 788 55 96 03</Link> ·{' '}
            <Link href="mailto:info@beaconattorneys.rw" style={link}>info@beaconattorneys.rw</Link>
          </Text>

          <Text style={footer}>Ceci est un accusé de réception automatique. Merci de ne pas répondre à cette adresse.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ appointmentTime }: Props) => `Demande de consultation reçue — ${appointmentTime || 'en cours d’examen'}`,
  displayName: 'Demande de rendez-vous reçue (client)',
  previewData: {
    name: 'Jane Doe',
    appointmentTime: 'lundi 21 juillet 2026 à 10:00',
    matterType: 'Corporate & Commercial',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', color: '#2c2c2c' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { color: '#1d535e', fontSize: '24px', fontWeight: '600', margin: '0 0 16px', letterSpacing: '-0.01em' }
const paragraph = { color: '#2c2c2c', fontSize: '15px', lineHeight: '1.6', margin: '0 0 12px' }
const label = { color: '#6b6b6b', fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '16px 0 4px' }
const value = { color: '#2c2c2c', fontSize: '15px', margin: '0 0 8px', lineHeight: '1.5' }
const link = { color: '#1d535e', textDecoration: 'none' }
const highlightBox = { backgroundColor: '#f5f0e8', borderLeft: '3px solid #c9a84c', padding: '16px', margin: '16px 0 24px' }
const highlightText = { color: '#1d535e', fontSize: '18px', fontWeight: '600', margin: '0 0 4px' }
const highlightSub = { color: '#6b6b6b', fontSize: '13px', margin: '0' }
const hr = { borderColor: '#e6e1d8', margin: '24px 0' }
const signature = { color: '#2c2c2c', fontSize: '14px', lineHeight: '1.7', margin: '24px 0 0' }
const footer = { color: '#9a9a9a', fontSize: '12px', margin: '24px 0 0' }
