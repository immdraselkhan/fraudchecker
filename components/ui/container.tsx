import { cn } from "@/lib/shadcn/cn";
import * as React from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?:
    | "article"
    | "aside"
    | "figcaption"
    | "figure"
    | "footer"
    | "header"
    | "main"
    | "mark"
    | "nav"
    | "section"
    | "summary";
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Element = "section", className, ...props }, ref) => (
    <Element
      className={cn("container mx-auto", className)}
      ref={ref}
      {...props}
    />
  ),
);
Container.displayName = "Container";

export { Container };
