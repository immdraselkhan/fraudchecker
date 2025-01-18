import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

type ThemeToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: React.HTMLProps<HTMLElement>["className"];
};

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, ...props }, ref) => {
    const { theme, setTheme } = useTheme();

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={className}
        {...props}
      >
        <Sun className="h-5 w-5 dark:hidden" />
        <Moon className="hidden h-5 w-5 dark:block" />
      </Button>
    );
  },
);
ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
