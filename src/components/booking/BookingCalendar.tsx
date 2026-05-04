import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  BOOKING_HORIZON_WEEKS,
  formatDayLabel,
  formatSlotHour,
  generateSlotsForDate,
  getMondayOfWeek,
  getWorkingDaysOfWeek,
  isSlotBeyondHorizon,
  isSlotPast,
  type Slot,
} from "@/lib/booking-slots";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  onSelect: (slot: Slot) => void;
}

/**
 * Weekly calendar showing 5 working days (Mon-Fri) and 5 hourly slots per day.
 * Slots already booked or blocked on Daniel's Google Calendar are greyed out.
 */
const BookingCalendar = ({ onSelect }: Props) => {
  const [weekStart, setWeekStart] = useState<Date>(() => getMondayOfWeek(new Date()));
  const [busyStarts, setBusyStarts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const weekDays = useMemo(() => getWorkingDaysOfWeek(weekStart), [weekStart]);
  const weekStartIso = weekStart.toISOString();
  const weekEndIso = useMemo(
    () => new Date(weekStart.getTime() + 7 * 24 * 3600_000).toISOString(),
    [weekStart]
  );

  // Load busy slots for the visible week (DB bookings + Google Calendar via edge fn)
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("get-availability", {
          body: { fromIso: weekStartIso, toIso: weekEndIso },
        });
        if (cancelled) return;
        if (error) {
          console.error("availability error", error);
          toast.error("Could not load availability");
          setBusyStarts(new Set());
        } else {
          // data.busyStarts: array of ISO strings of slot starts that are taken
          const set = new Set<string>(((data as { busyStarts?: string[] })?.busyStarts) ?? []);
          setBusyStarts(set);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setBusyStarts(new Set());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [weekStartIso, weekEndIso]);

  const goPrevWeek = () => {
    const prev = new Date(weekStart.getTime() - 7 * 24 * 3600_000);
    if (prev.getTime() < Date.now() - 7 * 24 * 3600_000) return;
    setWeekStart(getMondayOfWeek(prev));
  };

  const goNextWeek = () => {
    const next = new Date(weekStart.getTime() + 7 * 24 * 3600_000);
    if (next.getTime() > Date.now() + BOOKING_HORIZON_WEEKS * 7 * 24 * 3600_000) return;
    setWeekStart(getMondayOfWeek(next));
  };

  const canGoPrev = weekStart.getTime() > Date.now() - 24 * 3600_000;
  const canGoNext = weekStart.getTime() + 7 * 24 * 3600_000 <
    Date.now() + BOOKING_HORIZON_WEEKS * 7 * 24 * 3600_000;

  const handleSlotClick = (slot: Slot) => {
    if (busyStarts.has(slot.startUtc)) return;
    if (isSlotPast(slot.startUtc)) return;
    if (isSlotBeyondHorizon(slot.startUtc)) return;
    onSelect(slot);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goPrevWeek}
          disabled={!canGoPrev || loading}
          aria-label="Previous week"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="text-sm md:text-base font-medium text-navy">
          Week of {formatDayLabel(weekDays[0])}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goNextWeek}
          disabled={!canGoNext || loading}
          aria-label="Next week"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Checking availability…
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 gap-2 min-w-[480px]">
            {weekDays.map((day) => {
              const slots = generateSlotsForDate(day);
              return (
                <div key={day.toISOString()} className="flex flex-col">
                  <div className="text-center text-xs md:text-sm font-semibold text-navy py-2 border-b border-border mb-2">
                    {formatDayLabel(day)}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {slots.map((slot) => {
                      const isBusy = busyStarts.has(slot.startUtc);
                      const isPast = isSlotPast(slot.startUtc);
                      const beyond = isSlotBeyondHorizon(slot.startUtc);
                      const disabled = isBusy || isPast || beyond;
                      return (
                        <button
                          key={slot.startUtc}
                          type="button"
                          onClick={() => handleSlotClick(slot)}
                          disabled={disabled}
                          aria-label={`${formatSlotHour(slot.hour)} on ${formatDayLabel(day)}${
                            isBusy ? " (unavailable)" : isPast ? " (past)" : ""
                          }`}
                          className={cn(
                            "text-xs md:text-sm py-2 px-2 rounded-md border transition-colors",
                            disabled
                              ? "bg-muted/40 border-border text-muted-foreground/60 cursor-not-allowed line-through"
                              : "bg-background border-border hover:bg-primary/10 hover:border-primary text-navy cursor-pointer"
                          )}
                        >
                          {formatSlotHour(slot.hour)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded border border-border bg-background" />
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded border border-border bg-muted/40" />
          Unavailable
        </div>
        <span>All times shown in Africa/Kigali (CAT, UTC+2).</span>
      </div>
    </div>
  );
};

export default BookingCalendar;