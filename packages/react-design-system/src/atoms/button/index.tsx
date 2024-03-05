import { IconType } from "react-icons";
import { cn } from "../../utils/cn";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  id: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  LeadingIcon?: IconType;
  TrailingIcon?: IconType;
}

export default ({
  type = "button",
  variant = "primary",
  size = "lg",
  fullWidth,
  LeadingIcon,
  TrailingIcon,
  className,
  children,
  ...props
}: React.PropsWithChildren<Props>): JSX.Element => {
  const base = cn(
    className,
    "inline-flex",
    "items-center",
    "justify-center",
    "border",
    "rounded",
    "shadow-sm"
  );

  const small = cn("px-2", "py-1.5", "space-x-2", "text-xs");
  const medium = cn("px-4", "py-2", "space-x-2", "text-sm");
  const large = cn("px-6", "py-3", "space-x-2", "text-base");

  const primary = props.disabled
    ? cn("bg-gray-100", "border-transparent", "text-gray-500", "cursor-default")
    : cn(
        "bg-primary",
        "border-transparent",
        "text-primary-contrast",
        "hover:bg-primary-hover"
      );
  const secondary = props.disabled
    ? cn("border-gray-100", "text-gray-300", "cursor-default")
    : cn(
        "bg-white",
        "border-primary",
        "text-primary-contrast",
        "hover:bg-primary"
      );
  const tertiary = props.disabled
    ? cn("border-gray-100", "text-gray-300", "cursor-default")
    : cn("bg-white", "border-gray-300", "text-gray-700", "hover:bg-gray-100");
  const danger = props.disabled
    ? cn("bg-white", "border-gray-100", "text-gray-300", "cursor-default")
    : cn("bg-white", "border-error", "text-error", "hover:bg-error-light");

  const buttonStyles = cn(base, {
    [small]: size === "sm",
    [medium]: size === "md",
    [large]: size === "lg",

    [primary]: variant === "primary",
    [secondary]: variant === "secondary",
    [tertiary]: variant === "tertiary",
    [danger]: variant === "danger",

    "w-full": fullWidth,
  });

  const iconBase = cn("flex-shrink-0");
  const leadingStyles = iconBase;
  const trailingStyles = iconBase;

  const isClickable = props.onClick || type !== "button";
  const tabIndex = props.tabIndex ?? (!isClickable ? -1 : undefined);

  if (!isClickable)
    return (
      <div
        {...(props as React.ButtonHTMLAttributes<HTMLDivElement>)}
        className={buttonStyles}
        tabIndex={tabIndex}
      >
        {LeadingIcon && <LeadingIcon size={16} className={leadingStyles} />}

        <span className={cn("truncate")}>{children}</span>

        {TrailingIcon && <TrailingIcon size={16} className={trailingStyles} />}
      </div>
    );

  return (
    <button
      {...props}
      type={type}
      className={buttonStyles}
      tabIndex={tabIndex}
      data-testid="button"
    >
      {LeadingIcon && <LeadingIcon size={16} className={leadingStyles} />}

      <span className={cn("truncate")}>{children}</span>

      {TrailingIcon && <TrailingIcon size={16} className={trailingStyles} />}
    </button>
  );
};
