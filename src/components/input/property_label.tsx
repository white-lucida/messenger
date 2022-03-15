type PropertyLabelProps = {
  children: React.ReactNode;
};

const PropertyLabel: React.VFC<PropertyLabelProps> = ({ children }) => {
  return <label>{children}</label>;
};

export { PropertyLabel };
