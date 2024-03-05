import React from "react";
import { cn } from "../../utils/cn";
import { IconType } from "react-icons";

export interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label: string;
  type?: string;
  hint?: string;
  helpText?: string;
  errorMessage?: string;
  LeadingIcon?: IconType;
  leadingAction?: () => void;
  TrailingIcon?: IconType;
  trailingAction?: () => void;
  hideLabel?: boolean;
}

export default React.forwardRef(
  (
    {
      type = "text",
      id,
      label,
      hint,
      helpText,
      errorMessage,
      LeadingIcon,
      leadingAction,
      TrailingIcon,
      trailingAction,
      hideLabel = false,
      ...props
    }: Props,
    ref: React.ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const hasHelpText = helpText !== undefined;
    const hasError = errorMessage !== undefined;

    const helpTextId = hasHelpText && `${id}-help`;
    const errorId = hasError && `${id}-error`;
    const inputDescriptionIDs =
      hasHelpText || hasError ? `${helpTextId} ${errorId}` : undefined;

    const labelContainerStyles = cn("flex", "justify-between");

    const labelStyles = cn("block", "text-sm", "text-gray-700", {
      "sr-only": hideLabel,
    });

    const hintStyles = cn("text-sm", "text-gray-500");

    const inputContainerStyles = cn(
      "mt-1",
      "relative",
      "rounded-md",
      "shadow-sm"
    );

    const inputBase = cn(
      "block",
      "w-full",
      "shadow-sm",
      "sm:text-sm",
      "rounded-md",
      "focus:ring-gray-900",
      "focus:border-gray-900",
      "border-gray-300",
      "p-2"
    );

    const inputError = cn("border-2", "border-error", "bg-error-light");
    const inputDisabled = cn("bg-gray-100", "text-gray-700");
    const inputStyles = cn(inputBase, {
      [inputError]: hasError,
      [inputDisabled]: props.disabled || props.readOnly,
      "pr-10": TrailingIcon !== undefined,
      "pl-10": LeadingIcon !== undefined,
    });

    const iconWrapperBase = cn(
      "px-3",
      "absolute",
      "inset-y-0",
      "flex",
      "items-center"
    );
    const hasLeadingAction = typeof leadingAction !== "undefined";
    const leadingIconWrapperStyles = cn(
      iconWrapperBase,
      hasLeadingAction ? "cursor-pointer" : "pointer-events-none",
      "left-0"
    );
    const hasTrailingAction = typeof trailingAction !== "undefined";
    const trailingIconWrapperStyles = cn(
      iconWrapperBase,
      hasTrailingAction ? "cursor-pointer" : "pointer-events-none",
      "right-0"
    );

    const iconStyles = cn("h-5", "w-5", {
      "text-gray-400": !hasError,
      "text-error": hasError,
    });

    const textBase = cn("mt-2", "text-sm");
    const helpTextStyles = cn(textBase, "text-gray-700");
    const errorMessageStyles = cn(textBase, "text-error");

    return (
      <div className={props.className}>
        <div className={labelContainerStyles}>
          <label htmlFor={id} className={labelStyles}>
            {label}
          </label>

          {hint && <span className={hintStyles}>{hint}</span>}
        </div>

        <div className={inputContainerStyles}>
          {LeadingIcon &&
            (leadingAction ? (
              <button
                type="button"
                className={leadingIconWrapperStyles}
                onClick={leadingAction}
              >
                <LeadingIcon className={iconStyles} />
              </button>
            ) : (
              <div className={leadingIconWrapperStyles}>
                <LeadingIcon className={iconStyles} />
              </div>
            ))}

          <input
            {...props}
            id={id}
            ref={ref}
            type={type}
            className={inputStyles}
            aria-invalid={hasError}
            aria-describedby={inputDescriptionIDs}
          />

          {TrailingIcon &&
            (trailingAction ? (
              <button
                type="button"
                className={trailingIconWrapperStyles}
                onClick={trailingAction}
              >
                <TrailingIcon className={iconStyles} />
              </button>
            ) : (
              <div className={trailingIconWrapperStyles}>
                <TrailingIcon className={iconStyles} />
              </div>
            ))}
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
