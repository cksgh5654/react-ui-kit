import { FC, ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { breadcrumbItemCls } from "../../consts/className";
import { BreadcrumbContext } from ".";

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

  const breadcrumbCls = useMemo(
    () => (className ? `${className} ${breadcrumbItemCls}` : breadcrumbItemCls),
    []
  );

  return (
    <a href={href} ref={itemRef} className={breadcrumbCls}>
      {children}
    </a>
  );
};

export default BreadcrumbItem;
