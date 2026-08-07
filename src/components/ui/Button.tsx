import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-rm-brand-red text-white hover:bg-rm-brand-red-hover focus:ring-rm-brand-red",
        gold: "bg-rm-brand-gold text-rm-neutral-900 hover:bg-rm-brand-gold-dark focus:ring-rm-brand-gold",
        outline: "border-2 border-rm-brand-red text-rm-brand-red bg-transparent hover:bg-red-50 focus:ring-rm-brand-red",
        ghost: "text-rm-neutral-700 hover:bg-rm-neutral-100 focus:ring-rm-neutral-400",
        danger: "bg-rm-danger text-white hover:bg-rm-danger-hover focus:ring-rm-danger",
      },
      size: {
        sm: "h-9 px-3 text-sm gap-1.5",
        md: "h-11 px-5 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2",
        xl: "h-14 px-8 text-lg gap-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  )
);

Button.displayName = "Button";
export { buttonVariants };
