import { PropsWithChildren } from "react";

export function AuthCard({ children }: PropsWithChildren) {
  return (
    <div className="pointer-events-auto relative z-50 flex w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 opacity-100 shadow-lg">
      {children}
    </div>
  );
}
