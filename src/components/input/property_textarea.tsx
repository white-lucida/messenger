import React from 'react';

type PropertyTextAreaProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const PropertyTextArea: React.VFC<PropertyTextAreaProps> = React.memo(function inside({
  value,
  onChange,
}) {
  return <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
});

export { PropertyTextArea };
