import { type PropsWithChildren } from "react";

export function ContentPortal({ children }: PropsWithChildren) {
  return (
    <div className="pointer-events-none absolute z-50 flex h-full w-full justify-between p-16">
      {children}
    </div>
  );
}
