import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { type ButtonProps, Button } from "@/components/ui/button";
import * as React from "react";

type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  function LoadingButton({ loading, children, ...props }, ref) {
    const { pending } = useFormStatus();
    const isLoading = loading ?? pending;

    return (
      <Button ref={ref} disabled={isLoading} {...props}>
        <>
          {isLoading ? "অপেক্ষা করুন" : children}
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </>
      </Button>
    );
  },
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
