import ReactSelect, { StylesConfig, OnChangeValue, GroupBase } from 'react-select';

type Option<T, K> = {
  value: T;
  label: K;
};

type SelectProps<T, K> = {
  options: Option<T, K>[];
  onChange: (value: T | undefined) => void;
};

const Select = <T, K>({ options, onChange }: SelectProps<T, K>) => {
  type _Option = Option<T, K>;
  const styles: StylesConfig<_Option, false, GroupBase<_Option>> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--input-color)',
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'var(--main-font-color)',
      transition: 'all 0.3s',
      backgroundColor: state.isFocused ? 'var(--button-color)' : 'var(--input-color)',
    }),
    container: (provided) => ({
      ...provided,
      color: 'var(--main-font-color)',
      backgroundColor: 'var(--input-color)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--main-font-color)',
      backgroundColor: 'var(--input-color)',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--input-color)',
    }),
  };

  return (
    <ReactSelect<_Option, false, GroupBase<_Option>>
      onChange={(newValue: OnChangeValue<{ value: T; label: K }, false>, _) =>
        onChange(newValue?.value)
      }
      options={options}
      styles={styles}
    />
  );
};

export { Select };
