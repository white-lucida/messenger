type LabelProps = {
  children: React.ReactNode;
};

const Label: React.VFC<LabelProps> = ({ children }) => {
  return <label>{children}</label>;
};

export { Label };
