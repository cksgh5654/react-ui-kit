import { FC, ReactNode, useContext, useEffect, useRef } from "react";
import { breadcrumbItemCls } from "../../consts/className";
import { BreadcrumbContext } from ".";

interface BreadcrumbItemProps {
  children: ReactNode;
  href: string;
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ href, children }) => {
  const { setTotalWidth } = useContext(BreadcrumbContext);
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setTotalWidth(
      (prev) => prev + (itemRef.current?.getBoundingClientRect().width || 0)
    );
  }, []);

  return (
    <a href={href} ref={itemRef} className={breadcrumbItemCls}>
      {children}
    </a>
  );
};

export default BreadcrumbItem;
