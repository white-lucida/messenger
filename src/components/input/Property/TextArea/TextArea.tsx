import React from 'react';

type TextAreaProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const TextArea: React.VFC<TextAreaProps> = React.memo(function inside({ value, onChange }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className='generalInput'
    />
  );
});

export { TextArea };
