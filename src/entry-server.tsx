import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import i18n from "./i18n";
import { AppRoutes } from "./App";
import "./index.css";

export async function render(url: string) {
  const lang = url === "/fr" || url.startsWith("/fr/") ? "fr" : "en";
  await i18n.changeLanguage(lang);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, enabled: false } },
  });

  return renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CookieConsentProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </CookieConsentProvider>
      </TooltipProvider>
    </QueryClientProvider>,
  );
}
