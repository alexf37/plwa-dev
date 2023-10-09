import React from "react";
import { twMerge } from "tailwind-merge";

export function ContentPortal({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={twMerge(
        "pointer-events-none absolute z-50 flex h-full w-full justify-between gap-6 p-16 max-sm:flex-col-reverse max-sm:justify-start max-sm:overflow-y-scroll",
        props?.className,
      )}
    >
      {children}
    </div>
  );
}
