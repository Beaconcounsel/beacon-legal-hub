import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import BookingCalendar from "@/components/booking/BookingCalendar";
import BookingForm from "@/components/booking/BookingForm";
import { type Slot } from "@/lib/booking-slots";

const BookingPage = () => {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBooked = () => {
    setSelectedSlot(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <Layout>
      <SEOHead titleKey="seo.bookingTitle" descKey="seo.bookingDesc" />
      <section className="pt-12 md:pt-16 pb-0">
        <div className="container">
          <div className="max-w-3xl mb-6">
            <span className="label-uppercase">Book a Consultation</span>
            <h1 className="text-3xl md:text-4xl font-serif text-navy mt-2 mb-4">
              Schedule Your Private Consultation
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Choose an available 1-hour time slot to meet with Daniel Mutiganda.
              Sessions are available Monday to Friday, 9:00 AM – 12:00 PM and 2:00 PM – 3:00 PM (Africa/Kigali time).
            </p>
          </div>
        </div>
      </section>

      <section className="pt-6 pb-12 md:pb-16">
        <div className="container">
          {selectedSlot ? (
            <BookingForm
              slot={selectedSlot}
              onCancel={() => setSelectedSlot(null)}
              onBooked={handleBooked}
            />
          ) : (
            <BookingCalendar key={refreshKey} onSelect={setSelectedSlot} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BookingPage;