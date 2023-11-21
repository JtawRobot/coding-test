import React, { Fragment } from 'react';
import styled from 'styled-components';


const FormItemInput = styled.input`
  width: 100%;
  height: 26px;
  margin: 10px 0 0 0;
  padding: 0 0 0 4px;
  color: #A7B5C2;
  font-size: 1rem;
  outline: none;
  border: 1px solid #78838C;
  background: #36404A;

  &::placeholder {
    color: #78838C;
    opacity: 1; 
  }
  
  &::-ms-input-placeholder {
    color: #78838C;
  }
`;

const UsersFormInput = ({property, value, onInputChange}) => {

  const onFormItemInputchange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    onInputChange(property, value)
  };

  return (
    <Fragment>
      <FormItemInput value={value} onChange={onFormItemInputchange}/>
    </Fragment>
  )
}

export default UsersFormInput;