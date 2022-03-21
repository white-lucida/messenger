import ReactSelect from 'react-select';

type SelectProps<T, K> = {
  options: { value: T; label: K }[];
  onChange: (value: T | undefined) => void;
};

const Select = <T, K>({ options, onChange }: SelectProps<T, K>) => {
  return (
    <ReactSelect
      onChange={(value) => onChange(value?.value)}
      options={options}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: 'black',
          primary: 'gray',
          primary25: 'gray',
        },
      })}
    />
  );
};

export { Select };
