import React, {memo} from 'react';
import styled from 'styled-components';

const IconContainter = styled.img`
  width: fit-content;
  height: fit-content;
`;

const IconButton = styled.button`
  width: fit-content;
  height: fit-content;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  transition: transform 0.2s linear;
  padding: 0px;

  &:disabled {
    pointer-events: none;  
  };

  &:hover {
    transform: scale(1.2);
  };


  
`;


const OperationButton = ({srcIcon, operation,  onOperationClick, alt="operation icon", ...otherProps }) => {
  
  const onButtonClick = () => {
    if(!onOperationClick) return; 
    onOperationClick(operation);
  };

  return (
    <IconButton onClick={onButtonClick} {...otherProps}>
      <IconContainter src={srcIcon} alt={alt} />
    </IconButton>
  )
}

export default memo(OperationButton);