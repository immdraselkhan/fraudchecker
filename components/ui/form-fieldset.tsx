import { cn } from "@/lib/shadcn/cn";
import * as React from "react";

type FormFieldsetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  className?: string;
};

const FormFieldset = React.forwardRef<HTMLFieldSetElement, FormFieldsetProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <fieldset ref={ref} className={cn(className)} {...props}>
        {children}
      </fieldset>
    );
  },
);
FormFieldset.displayName = "FormFieldset";

type FormLegendProps = React.HTMLAttributes<HTMLLegendElement> & {
  className?: string;
};

const FormLegend = React.forwardRef<HTMLLegendElement, FormLegendProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <legend ref={ref} className={cn(className)} {...props}>
        {children}
      </legend>
    );
  },
);
FormLegend.displayName = "FormLegend";

export { FormFieldset, FormLegend };
