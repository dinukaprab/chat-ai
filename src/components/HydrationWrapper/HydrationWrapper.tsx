"use client";

import { useState, useEffect, ReactNode } from "react";

interface HydrationWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function HydrationWrapper({
  children,
  fallback,
}: HydrationWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      fallback || (
        <div
          style={{
            backgroundColor: "var(--bg-color)",
          }}
        />
      )
    );
  }

  return <>{children}</>;
}
