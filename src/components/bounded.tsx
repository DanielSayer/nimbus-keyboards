import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BoundedProps = {
  as?: "section" | "footer";
  fullWidth?: boolean;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
};

function Bounded({
  as: Comp = "section",
  fullWidth = false,
  className,
  innerClassName,
  children,
}: BoundedProps) {
  return (
    <Comp
      className={cn(
        "px-6 py-10 md:py-20 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          !fullWidth && "max-w-7xl",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Comp>
  );
}

export { Bounded };
