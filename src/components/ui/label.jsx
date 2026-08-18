// src/components/ui/label.jsx

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority"; // Para gerenciar variantes de estilo

// Definição das classes de estilo (Tailwind CSS)
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={labelVariants({ className })}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
