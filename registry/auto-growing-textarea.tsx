"use client";

import {
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export interface AutoGrowingTextAreaProps {
  placeholder?: string;
  className?: string;
  value: string;
  disabled?: boolean;
  /**
   * Maximum height of the textarea in pixels
   */
  maxHeight?: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const autoGrowingTextAreaVariants = cva(
  "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background resize-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      scrollable: {
        true: "overflow-y-auto",
        false: "overflow-hidden",
      },
    },
    defaultVariants: {
      scrollable: false,
    },
  }
);

const AutoGrowingTextArea: FC<AutoGrowingTextAreaProps> = ({
  placeholder,
  className,
  value,
  maxHeight,
  disabled,
  onChange,
  onKeyDown,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState(value);

  const adjustHeight = useCallback(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      if (maxHeight) {
        textArea.style.height = `${
          textArea.scrollHeight > maxHeight ? maxHeight : textArea.scrollHeight
        }px`;
      } else {
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    }
  }, [maxHeight]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(event.target.value);
      onChange(event);
      adjustHeight();
    },
    [adjustHeight, onChange]
  );

  // Add effect to sync internal state with prop changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    adjustHeight();
  }, [value, internalValue, adjustHeight]);

  return (
    <textarea
      ref={textAreaRef}
      value={internalValue}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        autoGrowingTextAreaVariants({
          scrollable: typeof maxHeight === "number",
        }),
        className
      )}
      rows={1}
    />
  );
};

export default AutoGrowingTextArea;
