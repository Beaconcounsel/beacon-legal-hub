import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import BookConsultation from "./BookConsultation";
import { useLocation } from "react-router-dom";

const Layout = ({ children, hideBooking = false }: { children: ReactNode; hideBooking?: boolean }) => {
  const { pathname } = useLocation();
  const hideOnRoutes = ["/auth", "/admin", "/booking/cancel", "/fr/booking/cancel"];
  const shouldHide = hideBooking || hideOnRoutes.some((r) => pathname.startsWith(r));
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-[76px] md:pt-[90px]">
        <PageTransition>{children}</PageTransition>
        {!shouldHide && <BookConsultation />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
