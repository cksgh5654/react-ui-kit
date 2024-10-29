const TabContent = (props) => {
  const { children, isActive } = props;
  return isActive ? <>{children}</> : null;
};

export default TabContent;
