import React, { useRef, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as CreatableProps } from 'react-select/creatable';
import { useField } from '@unform/core';

interface IOptions {
  label: string,
  value: string,
}

interface Props extends CreatableProps<OptionTypeBase> {
  name: string;
  option: IOptions[];
}
const CreatableSelect: React.FC<Props> = ({ name, option, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (!ref.state.value) {
          return [];
        }
        // if (ref.isMulti) {
        //   console.log('aqui')
        //   if (!ref.state.value) {
        //     return [];
        //   }
        return ref.state.value.map((option: OptionTypeBase) => option.value);
        // }
        // console.log('aqui2')
        // if (!ref.state.value) {
        //   return '';
        // }
        // return ref.state.value.value;
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
    <Select
      defaultValue={defaultValue}
      ref={selectRef}
      options={option}
      classNamePrefix="react-select"
      isMulti={true}
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
export default CreatableSelect;