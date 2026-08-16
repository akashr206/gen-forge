import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded border border-input bg-transparent px-3.5 py-3 text-[16px] transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:font-normal focus-visible:border-primary focus-visible:ring-0 focus-visible:shadow-[0_0_20px_rgba(79,70,229,0.15)] disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props} />
  );
}

export { Textarea }
