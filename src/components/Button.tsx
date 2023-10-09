import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Button = forwardRef(
  (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        type="button"
        {...props}
        ref={ref}
        className={twMerge(
          "pointer-events-auto grid h-10 w-10 place-content-center rounded-full border border-slate-200 bg-white text-slate-900 shadow",
          props.className,
        )}
      >
        {props.children}
      </button>
    );
  },
);
Button.displayName = "Button";
