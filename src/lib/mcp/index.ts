import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getAvailabilityTool from "./tools/get-availability";
import listMyBookingsTool from "./tools/list-my-bookings";
import createBookingTool from "./tools/create-booking";
import cancelBookingTool from "./tools/cancel-booking";

// Build the OAuth issuer from the Supabase project ref (Vite inlines this at
// build time as a literal, so the entry stays import-safe — no runtime env
// read at module top level). The fallback keeps the issuer well-formed during
// the throwaway manifest-extract eval, where a token never verifies.
const projectRef =
  import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "beacon-attorneyes-mcp",
  title: "Beacon Attorneyes & Consultants",
  version: "0.1.0",
  instructions:
    "Tools for the Beacon Attorneyes & Consultants law firm site. Use `get_availability` to find open consultation slots, `create_booking` to book one under the signed-in user, `list_my_bookings` to see the user's bookings, and `cancel_booking` to cancel one. All booking tools act as the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    getAvailabilityTool,
    listMyBookingsTool,
    createBookingTool,
    cancelBookingTool,
  ],
});