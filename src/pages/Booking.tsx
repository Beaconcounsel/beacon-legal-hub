import { useEffect } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const BookingPage = () => {
  useEffect(() => {
    const id = window.setTimeout(() => {
      const el = document.getElementById("book-consultation");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Layout>
      <SEOHead titleKey="seo.bookingTitle" descKey="seo.bookingDesc" />
      <div className="container py-12 text-center text-muted-foreground">
        Loading consultation booking…
      </div>
    </Layout>
  );
};

export default BookingPage;
