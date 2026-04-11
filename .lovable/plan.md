

## Problem

The dropdown links use `scrollIntoView` directly but never update the browser's URL hash. The `Index.tsx` page filters sections based on `location.hash`, so the filtering never triggers — both on desktop and mobile.

## Fix

**File: `src/components/Header.tsx`** — Update `handleSectionClick` to use `navigate("/#about")` (etc.) instead of manual `scrollIntoView`. React Router will update `location.hash`, which triggers the `activeSection` logic in `Index.tsx`.

Specifically, replace the scroll logic with:
```ts
if (location.pathname === "/") {
  navigate(path, { replace: true }); // e.g. "/#about"
} else {
  navigate(path); // navigates to / with hash
}
```

**File: `src/pages/Index.tsx`** — Add a `useEffect` that scrolls to the target element when `location.hash` changes (after the section is rendered/shown):
```ts
useEffect(() => {
  if (location.hash) {
    const id = location.hash.slice(1);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }
}, [location.hash]);
```

This ensures: (1) the hash updates in the URL, (2) `activeSection` filters correctly, and (3) smooth scrolling still works.

