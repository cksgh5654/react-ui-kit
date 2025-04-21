import { breadcrumbDropdownCls } from "@consts/className";
import { FC, ReactNode, useEffect, useRef } from "react";

interface BreadcrumbDropdownProps {
  children: ReactNode;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;

  className?: string;
}

const BreadcrumbDropdown: FC<BreadcrumbDropdownProps> = ({
  children,
  onClose,
  anchorRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, anchorRef]);

  return (
    <div
      className={breadcrumbDropdownCls}
      ref={dropdownRef}
      style={{
        position: "absolute",
      }}
    >
      {children}
    </div>
  );
};

export default BreadcrumbDropdown;
