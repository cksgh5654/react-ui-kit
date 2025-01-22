import { FC, ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { BreadcrumbContext } from ".";
import { breadcrumbItemCls } from "@consts/className";

interface BreadcrumbItemProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = (props) => {
  const { href, children, className } = props;
  const { setTotalWidth } = useContext(BreadcrumbContext);
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setTotalWidth(
      (prev) => prev + (itemRef.current?.getBoundingClientRect().width || 0)
    );
  }, []);

  const cls = useMemo(
    () => (className ? `${className} ${breadcrumbItemCls}` : breadcrumbItemCls),
    [className]
  );

  return (
    <a href={href} ref={itemRef} className={cls}>
      {children}
    </a>
  );
};

export default BreadcrumbItem;
