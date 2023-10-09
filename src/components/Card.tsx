import React from "react";
import { twMerge } from "tailwind-merge";

export function Card({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...props}
      className={twMerge(
        "pointer-events-auto flex h-fit max-h-full w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-lg",
        props.className,
      )}
    >
      {children}
    </div>
  );
}
