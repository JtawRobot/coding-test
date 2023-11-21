import React, { useContext } from 'react';
import styled from 'styled-components';
import { UsersContext } from '../../Users';

const DeleteWarningDiv = styled.div`
  width: 380px;
  height: 100px;
  background: #36404A; 
  position: relative;
  padding: 16px;
  box-sizing: border-box;
  color: #A7B5C2;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonDiv = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 8px;
`;

const SubmitButton = styled.button`
  width: fit-content;
  height: 40px;
  display: flex;
  justify-content: center;
  outline: none;
  border: 1px solid #78838C;
  background: inherit;
  align-items: center;
  font-size: 1rem;
  color: inherit;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 6px;
  transition: all 0.2s linear;

  &:hover {
    color: #36404A;
    background: #A7B5C2;
  }

`;


const DeleteWarning = () => {
  const {usersList, setUsersList, setShowWarning} = useContext(UsersContext);

  const onCancelClick = () => {
    setShowWarning(false);
  };

  const onConfirmClick = () => {
    setUsersList((prev) => {
      const prevCopyFilter = [...prev].filter((data) => !data.checked); 
      return prevCopyFilter;
    })
    setShowWarning(false);
  }

  return (
    <DeleteWarningDiv>
      Are you sure you want to delete {usersList.filter((data) => data.checked === true).length} item/s?
      <ButtonDiv>
        <SubmitButton onClick={onConfirmClick}> Confirm </SubmitButton>
        <SubmitButton onClick={onCancelClick}> Cancel </SubmitButton>
      </ButtonDiv>
    </DeleteWarningDiv>
  )
}

export default DeleteWarning;