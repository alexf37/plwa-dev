export function Popover({ children }: React.PropsWithChildren) {
  return (
    <div className="pointer-events-auto absolute right-0 top-full mt-2 w-96 max-w-[90vw] rounded-3xl border bg-white p-6 shadow-lg">
      {children}
    </div>
  );
}
