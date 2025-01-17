import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { modalCloseCls } from "../../consts/className";
import { ModalContext } from ".";

interface ModalCloseProps {
  className?: string;
  children?: ReactNode;
}

const ModalClose = (props: ModalCloseProps) => {
  const { onCloseModal } = useContext(ModalContext);
  const { className, children } = props;

  const cls = useMemo(
    () => (className ? `${className} ${modalCloseCls}` : modalCloseCls),
    [className]
  );

  return (
    <>
      {children ? (
        isValidElement(children) ? (
          cloneElement(children as ReactElement, {
            onClick: onCloseModal,
          })
        ) : (
          Children.map(children, (child) =>
            cloneElement(child as ReactElement, {
              onClick: onCloseModal,
            })
          )
        )
      ) : (
        <button onClick={onCloseModal} className={cls}>
          X
        </button>
      )}
    </>
  );
};

export default ModalClose;
