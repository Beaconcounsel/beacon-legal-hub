import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import StickyConsultation from "./StickyConsultation";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col overflow-x-hidden">
    <Header />
    <main className="flex-1 pt-16 md:pt-20">{children}</main>
    <Footer />
    <StickyConsultation />
  </div>
);

export default Layout;
