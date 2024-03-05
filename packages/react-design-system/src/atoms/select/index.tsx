import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { cn } from "../../utils/cn";

interface IOption {
  value: string | number;
  label: string;
  key?: string;
  isDisabled?: boolean;
}

export interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  id: string;
  name: string;
  label: string;
  options?: IOption[];
  hint?: string;
  helpText?: string;
  errorMessage?: string;
  hideLabel?: boolean;
  isFullWidth?: boolean;
  className?: React.ComponentProps<"select">["className"];
}

export default React.forwardRef(
  (
    {
      id,
      name,
      label,
      options,
      hint,
      helpText,
      errorMessage,
      hideLabel = false,
      isFullWidth = false,
      className,
      ...props
    }: Props,
    ref: React.ForwardedRef<HTMLSelectElement>
  ): JSX.Element => {
    const hasHelpText = helpText !== undefined;
    const hasError = errorMessage !== undefined;

    const helpTextId = hasHelpText && `${id}-help`;
    const errorId = hasError && `${id}-error`;
    const inputDescriptionIDs =
      hasHelpText || hasError ? `${helpTextId} ${errorId}` : undefined;

    const selectContainerStyles = cn(className, { "w-full": isFullWidth });

    const labelContainerStyles = cn("flex", "justify-between", {
      "sr-only": hideLabel,
    });

    const labelStyles = cn("block", "text-sm", "text-gray-700", "mb-1");

    const hintStyles = cn("text-sm", "text-gray-500");

    const inputContainerStyles = cn("relative", "rounded-md", "shadow-sm");

    const inputBase = cn(
      "appearance-none",
      "bg-none",
      "border",
      "block",
      "w-full",
      "shadow-sm",
      "sm:text-sm",
      "rounded-md",
      "focus:ring-gray-900",
      "focus:border-gray-900",
      "border-gray-300",
      "pr-10",
      "p-2"
    );
    const inputError = cn("border-2", "border-error", "bg-error-light");
    const inputDisabled = cn("bg-gray-100", "text-gray-700");
    const inputStyles = cn(inputBase, {
      [inputError]: hasError,
      [inputDisabled]: props.disabled,
    });

    const iconWrapperStyles = cn(
      "absolute",
      "inset-y-0",
      "flex",
      "items-center",
      "pointer-events-none",
      "right-0",
      "pr-3"
    );

    const iconStyles = cn("h-5", "w-5", {
      "text-gray-400": !hasError,
      "text-error": hasError,
    });

    const textBase = cn("mt-2", "text-sm");
    const helpTextStyles = cn(textBase, "text-gray-700");
    const errorMessageStyles = cn(textBase, "text-error");

    return (
      <div className={selectContainerStyles}>
        <div className={labelContainerStyles}>
          <label htmlFor={id} className={labelStyles}>
            {label}
          </label>

          {hint && <span className={hintStyles}>{hint}</span>}
        </div>

        <div className={inputContainerStyles}>
          <select
            {...props}
            id={id}
            ref={ref}
            name={name}
            className={inputStyles}
            aria-invalid={hasError}
            aria-describedby={inputDescriptionIDs}
          >
            {options?.map((option: IOption) => (
              <option
                value={option.value}
                key={option.key ?? option.value}
                disabled={option.isDisabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className={iconWrapperStyles}>
            <HiChevronDown className={iconStyles} />
          </div>
        </div>

        {helpTextId && (
          <p className={helpTextStyles} id={helpTextId}>
            {helpText}
          </p>
        )}

        {errorId && (
          <p className={errorMessageStyles} id={errorId}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
