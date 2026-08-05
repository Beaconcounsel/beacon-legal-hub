import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  appointmentTime?: string
  bookingUrl?: string
  note?: string | null
}

const Email = ({ name, appointmentTime, bookingUrl, note }: Props) => {
  const safeName = name || 'Madame, Monsieur'
  const safeAppt = appointmentTime || 'le créneau demandé'
  const safeUrl = bookingUrl || 'https://beaconattorneys.rw/#book-consultation'

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Concernant votre demande de consultation pour {safeAppt}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Concernant votre demande de consultation</Heading>
          <Text style={paragraph}>Cher/Chère {safeName},</Text>
          <Text style={paragraph}>
            Nous vous remercions de l’intérêt que vous portez à <strong>Beacon Attorneyes &amp; Consultants</strong>. Après examen par notre avocat principal, nous regrettons de ne pouvoir retenir le créneau suivant :
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>{safeAppt}</Text>
            <Text style={highlightSub}>Indisponible · Afrique/Kigali (CAT)</Text>
          </Section>

          {note ? <Text style={paragraph}>{note}</Text> : null}

          <Text style={paragraph}>
            Nous serions heureux de vous rencontrer à un autre moment. Veuillez choisir un nouveau créneau à votre convenance via le lien ci-dessous.
          </Text>

          <Button href={safeUrl} style={button}>Choisir un autre créneau</Button>

          <Hr style={hr} />

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
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ appointmentTime }: Props) => `Votre demande de consultation — ${appointmentTime || 'autre créneau requis'}`,
  displayName: 'Demande de rendez-vous déclinée (client)',
  previewData: {
    name: 'Jane Doe',
    appointmentTime: 'lundi 21 juillet 2026 à 10:00',
    bookingUrl: 'https://beaconattorneys.rw/#book-consultation',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', color: '#2c2c2c' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { color: '#1d535e', fontSize: '24px', fontWeight: '600', margin: '0 0 16px', letterSpacing: '-0.01em' }
const paragraph = { color: '#2c2c2c', fontSize: '15px', lineHeight: '1.6', margin: '0 0 12px' }
const link = { color: '#1d535e', textDecoration: 'none' }
const highlightBox = { backgroundColor: '#f5f0e8', borderLeft: '3px solid #c9a84c', padding: '16px', margin: '16px 0 24px' }
const highlightText = { color: '#1d535e', fontSize: '18px', fontWeight: '600', margin: '0 0 4px' }
const highlightSub = { color: '#6b6b6b', fontSize: '13px', margin: '0' }
const hr = { borderColor: '#e6e1d8', margin: '24px 0' }
const signature = { color: '#2c2c2c', fontSize: '14px', lineHeight: '1.7', margin: '24px 0 0' }
const button = { backgroundColor: '#1d535e', color: '#ffffff', fontSize: '14px', padding: '12px 20px', borderRadius: '4px', textDecoration: 'none', display: 'inline-block', margin: '8px 0 16px' }
