export interface IAppProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function ButtonCommon(props: IAppProps) {
  const {
    children,
    type = "button",
    loading = false,
    className,
    onClick,
    disabled,
  } = props;
  return (
    <>
      <button
        disabled={disabled || loading}
        onClick={onClick}
        type={type}
        className={`${className}`}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            <>{children}</>
          </>
        ) : (
          <>{children}</>
        )}
      </button>
    </>
  );
}
