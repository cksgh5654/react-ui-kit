import { toastBaseCls } from "@consts/className";
import { CSSProperties, useEffect, useMemo, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { createPortal } from "react-dom";
import ToastContent from "./ToastContent";
import ToastTitle from "./ToastTitle";
import ToastDescription from "./ToastDescription";

interface ToastProps {
  title: string;
  description: string;
  duration?: number;
}

type ToasterPositions =
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "top-left"
  | "top-center"
  | "top-right";

interface ToasterProps {
  className?: string;
  position?: ToasterPositions;
}
export const useToast = () => {
  const timeoutRef = useRef<number | null>(null);
  const rootRef = useRef<Root | null>(null);
  const domNodeRef = useRef<HTMLElement | null>(null);

  const toast = (
    { title, description, duration = 2000 }: ToastProps,
    toasterProps: ToasterProps = { position: "bottom-right" }
  ) => {
    if (!domNodeRef.current) {
      domNodeRef.current = document.createElement("div");
      domNodeRef.current.id = "ui-toaster";
      document.body.appendChild(domNodeRef.current);
    }

    if (domNodeRef.current) {
      if (!rootRef.current) rootRef.current = createRoot(domNodeRef.current);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      rootRef.current.render(
        createPortal(
          <Toaster {...toasterProps}>
            <ToastContent>
              <ToastTitle title={title} />
              <ToastDescription description={description} />
            </ToastContent>
          </Toaster>,
          domNodeRef.current
        )
      );

      timeoutRef.current = window.setTimeout(() => {
        rootRef.current?.unmount();
        rootRef.current = null;
        timeoutRef.current = null;
        if (domNodeRef.current && domNodeRef.current.parentNode) {
          domNodeRef.current.parentNode.removeChild(domNodeRef.current);
          domNodeRef.current = null;
        }
      }, duration);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
      if (domNodeRef.current && domNodeRef.current.parentNode) {
        domNodeRef.current.parentNode.removeChild(domNodeRef.current);
        domNodeRef.current = null;
      }
    };
  }, []);

  return { toast };
};
export const Toaster = ({
  className,
  position = "bottom-right",
  children,
}: ToasterProps & { children?: React.ReactNode }) => {
  const mapPositionToStyle: {
    [key in ToasterPositions]: Partial<
      Pick<
        CSSProperties,
        "top" | "bottom" | "left" | "right" | "position" | "transform"
      >
    >;
  } = {
    "bottom-left": { position: "fixed", bottom: "20px", left: "20px" },
    "bottom-center": {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "bottom-right": { position: "fixed", bottom: "20px", right: "20px" },
    "top-left": { position: "fixed", top: "20px", left: "20px" },
    "top-center": {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "top-right": { position: "fixed", top: "20px", right: "20px" },
  };

  const cls = useMemo(
    () => (className ? `${className} ${toastBaseCls}` : toastBaseCls),
    [className]
  );

  return (
    <div
      className={cls}
      style={{ ...mapPositionToStyle[position], zIndex: 9999 }}
    >
      {children}
    </div>
  );
};
