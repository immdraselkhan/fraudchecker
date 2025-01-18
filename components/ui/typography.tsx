import Link, { LinkProps } from "next/link";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/shadcn/cn";
import * as React from "react";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      a: "",
      abbr: "",
      b: "",
      strong: "",
      cite: "",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      em: "",
      i: "",
      sub: "",
      sup: "",
      u: "",
      var: "",
      p: "leading-7 mb-4 &:not(:first-child)]:mt-6",
      h1: "text-4xl mb-5 font-extrabold lg:text-5xl",
      h2: "text-3xl mb-4 font-bold lg:text-4xl",
      h3: "text-2xl mb-3 font-semibold",
      h4: "text-xl mb-3 font-semibold",
      h5: "",
      h6: "",
      div: "",
      span: "",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      ol: "",
      li: "",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      lead: "text-xl text-muted-foreground",
      muted: "text-sm text-muted-foreground",
    },
  },
});

type VariantPropType = VariantProps<typeof typographyVariants>;

const excludedTags = ["a", "large", "lead", "muted"] as const;

type TypographyProps =
  | (React.HTMLAttributes<HTMLElement> &
      VariantPropType &
      LinkProps & {
        as: "a";
        asChild?: boolean;
        target?: string;
        rel?: string;
      })
  | (React.HTMLAttributes<HTMLElement> &
      VariantPropType & {
        as?: Exclude<VariantPropType["variant"], (typeof excludedTags)[number]>;
        href?: never;
        asChild?: boolean;
        target?: never;
        rel?: never;
      });

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, href, asChild, target, rel, ...props }, ref) => {
    const Component = asChild
      ? Slot
      : as === "a"
        ? Link
        : (as as React.ElementType) ||
          (excludedTags.includes(variant as (typeof excludedTags)[number])
            ? "p"
            : variant) ||
          "p";

    return (
      <Component
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
        href={as === "a" ? href : undefined}
        target={as === "a" ? target : undefined}
        rel={as === "a" ? rel : undefined}
      />
    );
  },
);
Typography.displayName = "Typography";

export { Typography };
