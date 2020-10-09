import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  placeHolder: string;
}
const Select: React.FC<Props> = ({ name, placeHolder, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const customStyles = {
    container: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? '#39b100' : '#39b100',
      transition:
        'border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease',
      '&:hover': {
        boxShadow: '0 2px 4px 0 rgba(41, 56, 78, 0.1)',
      },
    }),
    control: (base: any, state: any) => ({
      ...base,
      background: '#AFeeee',
    }),
    valueContainer: (base: any, state: any) => ({
      ...base,
      background: '#AFeeee',
    }),
    option: (base: any, state: any) => ({
      ...base,
      color: state.isSelected ? '#ffffff' : '#39b100',
    }),
  };



  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      placeholder={placeHolder}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#AFeeee',
          primary: '#008000',
        },
      })}
      {...rest}
    />
  );
};
export default Select;
