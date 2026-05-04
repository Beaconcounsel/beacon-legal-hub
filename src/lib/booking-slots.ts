/**
 * Booking slot utilities.
 * All slots are in Africa/Kigali timezone (CAT, UTC+2, no DST).
 * Slots: 9am, 10am, 11am, 2pm, 3pm — Mon-Fri only.
 */

export const KIGALI_TZ = "Africa/Kigali";
export const KIGALI_OFFSET_HOURS = 2; // UTC+2, no DST
export const SLOT_DURATION_MIN = 60;
export const SLOT_HOURS = [9, 10, 11, 14, 15] as const; // local hours in Kigali
export const BOOKING_HORIZON_WEEKS = 8;

export type Slot = {
  /** ISO UTC timestamp of slot start */
  startUtc: string;
  /** ISO UTC timestamp of slot end */
  endUtc: string;
  /** YYYY-MM-DD in Kigali */
  dateKey: string;
  /** Hour-of-day in Kigali (9, 10, 11, 14, 15) */
  hour: number;
};

/** Build a UTC Date for the given Kigali local Y/M/D/H/M. */
function kigaliToUtc(year: number, month: number, day: number, hour: number, minute = 0): Date {
  // Kigali is UTC+2 with no DST. Local hour H == UTC hour (H - 2).
  return new Date(Date.UTC(year, month - 1, day, hour - KIGALI_OFFSET_HOURS, minute, 0));
}

/** Format a Date as YYYY-MM-DD in Kigali timezone. */
export function formatDateKeyKigali(d: Date): string {
  // Add the offset to get Kigali wall-clock parts.
  const local = new Date(d.getTime() + KIGALI_OFFSET_HOURS * 3600_000);
  const y = local.getUTCFullYear();
  const m = String(local.getUTCMonth() + 1).padStart(2, "0");
  const day = String(local.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Day-of-week (0=Sun..6=Sat) in Kigali. */
export function getKigaliDow(d: Date): number {
  const local = new Date(d.getTime() + KIGALI_OFFSET_HOURS * 3600_000);
  return local.getUTCDay();
}

/** Returns true if date (in Kigali) is Monday-Friday. */
export function isWorkingDay(d: Date): boolean {
  const dow = getKigaliDow(d);
  return dow >= 1 && dow <= 5;
}

/** Returns the Monday of the week containing `d`, in Kigali. */
export function getMondayOfWeek(d: Date): Date {
  const dow = getKigaliDow(d); // 0=Sun..6=Sat
  const daysFromMonday = dow === 0 ? 6 : dow - 1;
  const local = new Date(d.getTime() + KIGALI_OFFSET_HOURS * 3600_000);
  local.setUTCDate(local.getUTCDate() - daysFromMonday);
  // Convert back to UTC midnight Kigali = 22:00 prev day UTC
  return kigaliToUtc(local.getUTCFullYear(), local.getUTCMonth() + 1, local.getUTCDate(), 0);
}

/** Returns the 5 working days (Mon-Fri) starting from the Monday containing `weekStart`. */
export function getWorkingDaysOfWeek(weekStart: Date): Date[] {
  const monday = getMondayOfWeek(weekStart);
  const days: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday.getTime() + i * 24 * 3600_000);
    days.push(d);
  }
  return days;
}

/** Generates all slots for a given Kigali date. */
export function generateSlotsForDate(date: Date): Slot[] {
  const dateKey = formatDateKeyKigali(date);
  const [yStr, mStr, dStr] = dateKey.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  return SLOT_HOURS.map((hour) => {
    const startUtc = kigaliToUtc(y, m, d, hour);
    const endUtc = new Date(startUtc.getTime() + SLOT_DURATION_MIN * 60_000);
    return {
      startUtc: startUtc.toISOString(),
      endUtc: endUtc.toISOString(),
      dateKey,
      hour,
    };
  });
}

/** Format slot hour for display (9 -> "9:00 AM", 14 -> "2:00 PM") */
export function formatSlotHour(hour: number): string {
  const h12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${h12}:00 ${ampm}`;
}

/** Format date for display, e.g. "Mon, May 4". */
export function formatDayLabel(d: Date): string {
  const local = new Date(d.getTime() + KIGALI_OFFSET_HOURS * 3600_000);
  const dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${dows[local.getUTCDay()]}, ${months[local.getUTCMonth()]} ${local.getUTCDate()}`;
}

/** Format full appointment date+time for display, e.g. "Monday, May 4, 2026 at 10:00 AM (CAT)". */
export function formatAppointmentDisplay(slotStartUtc: string): string {
  const d = new Date(slotStartUtc);
  const local = new Date(d.getTime() + KIGALI_OFFSET_HOURS * 3600_000);
  const dows = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
  const hour = local.getUTCHours();
  const h12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${dows[local.getUTCDay()]}, ${months[local.getUTCMonth()]} ${local.getUTCDate()}, ${local.getUTCFullYear()} at ${h12}:00 ${ampm} (CAT)`;
}

/** Returns true if the slot start is in the past (or starts within the next 30 minutes). */
export function isSlotPast(slotStartUtc: string): boolean {
  return new Date(slotStartUtc).getTime() < Date.now() + 30 * 60_000;
}

/** Returns true if the slot start is more than `weeks` weeks in the future. */
export function isSlotBeyondHorizon(slotStartUtc: string, weeks = BOOKING_HORIZON_WEEKS): boolean {
  return new Date(slotStartUtc).getTime() > Date.now() + weeks * 7 * 24 * 3600_000;
}