import React from 'react';

type InputProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const Input: React.VFC<InputProps> = React.memo(function inside({ value, onChange }) {
  return (
    <input
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className='generalInput'
    />
  );
});

export { Input };
