import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div className={cn("rounded-xl border border-gray-200 bg-white shadow-sm", className)} ref={ref} {...props} />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div className={cn("p-6 pb-0", className)} ref={ref} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div className={cn("p-6", className)} ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div className={cn("flex items-center p-6 pt-0", className)} ref={ref} {...props} />
));
CardFooter.displayName = "CardFooter";
