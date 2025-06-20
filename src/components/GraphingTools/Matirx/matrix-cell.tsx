"use client";

import type { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MatrixCellProps {
  value: number | string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
  className?: string;
}

export function MatrixCell({
  value,
  onChange,
  isReadOnly = false,
  className,
}: MatrixCellProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Allow empty string, numbers, and negative sign at the start
    if (/^-?\d*\.?\d*$/.test(e.target.value) || e.target.value === "") {
      onChange(e.target.value);
    }
  };

  return (
    <Input
      type="text" // Using text to allow for intermediate states like '-' or empty
      inputMode="numeric" // Hint for mobile keyboards
      value={value}
      onChange={handleChange}
      readOnly={isReadOnly}
      className={cn(
        "w-20 h-12 md:w-20 md:h-12 text-center text-lg md:text-xl font-code rounded-md shadow-inner focus:ring-accent focus:border-accent transition-all duration-150 ease-in-out",
        isReadOnly
          ? "bg-muted cursor-not-allowed"
          : "bg-background hover:border-accent/50",
        className
      )}
      aria-label="matrix cell"
    />
  );
}
