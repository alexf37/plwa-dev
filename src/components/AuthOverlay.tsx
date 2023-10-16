import { PropsWithChildren } from "react";

export function AuthOverlay({ children }: PropsWithChildren) {
  return (
    <div className="fixed z-30 grid h-full w-full place-content-center bg-white bg-opacity-20 filter backdrop-blur-sm">
      {children}
    </div>
  );
}
