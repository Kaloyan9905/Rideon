import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
  mobilePadding?: string;
  className?: string;
}

const MaxWidthWrapper = ({
  children,
  maxWidth = "max-w-none",
  padding = "p-4",
  mobilePadding,
  className,
}: MaxWidthWrapperProps) => {
  const wrapperClass = `
        ${maxWidth}
        ${padding || mobilePadding}
        mx-auto
        w-full
        box-border
        ${className}
    `;

  return <div className={wrapperClass}>{children}</div>;
};

export default MaxWidthWrapper;
