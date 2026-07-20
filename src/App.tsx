import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LanguageRouter from "./components/LanguageRouter";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import PracticeAreas from "./pages/PracticeAreas";
import Insights from "./pages/Insights";
import Research from "./pages/Research";
import OurApproach from "./pages/OurApproach";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import CancelBooking from "./pages/CancelBooking";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import OAuthConsent from "./pages/OAuthConsent";
import CookiePolicy from "./pages/CookiePolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route element={<LanguageRouter />}>
      {/* English routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Index />} />
      <Route path="/practice-areas" element={<PracticeAreas />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/research" element={<Research />} />
      <Route path="/our-approach" element={<OurApproach />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/booking/cancel" element={<CancelBooking />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/unsubscribe" element={<Unsubscribe />} />

      {/* French routes */}
      <Route path="/fr" element={<Landing />} />
      <Route path="/fr/home" element={<Index />} />
      <Route path="/fr/practice-areas" element={<PracticeAreas />} />
      <Route path="/fr/insights" element={<Insights />} />
      <Route path="/fr/research" element={<Research />} />
      <Route path="/fr/our-approach" element={<OurApproach />} />
      <Route path="/fr/contact" element={<Contact />} />
      <Route path="/fr/booking" element={<Booking />} />
      <Route path="/fr/booking/cancel" element={<CancelBooking />} />
      <Route path="/fr/cookie-policy" element={<CookiePolicy />} />
      <Route path="/fr/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/fr/terms-of-use" element={<TermsOfUse />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CookieConsentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <GoogleAnalytics />
          <AppRoutes />
          <CookieConsentBanner />
          <CookiePreferencesModal />
        </BrowserRouter>
      </CookieConsentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
