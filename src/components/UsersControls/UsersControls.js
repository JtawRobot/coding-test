import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import addIcon from '../../assets/icons/add-icon.svg';
import editIcon from '../../assets/icons/edit-icon.svg';
import deleteIcon from '../../assets/icons/delete-icon.svg';
import OperationButton from './OperationButton';
import { UsersContext } from '../../Users';
import { debouncer } from '../../utils/utils';
import Tooltip from '../UtilComponents/Tooltip';


const UserConstrolsDiv = styled.div`
  width: 100%;
  background: #404D59;
  height: 44px;
  padding: 0px 8px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid #5C6F81;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const SearchInput = styled.input`
  width: 160px;
  height: 24px;
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

const GapLine = styled.span`
  width: 1px; 
  height: 24px;
  border-right: 1px solid #E1E1E1;
`;

const UserControls = () => {

  const {usersList, setShowForm, setShowWarning, searchString, setSearchString} = useContext(UsersContext);

  const onOperationClick = useCallback((operation) => {
    switch (operation) {
      case 'ADD':
        setShowForm((prev) => ({...prev, visible: true, type: 'ADD'}));
        break;
      case 'EDIT': 
        setShowForm((prev) => ({...prev, visible: true, type: 'EDIT'}));
        break;
      case 'DELETE': 
        setShowWarning(true);
        break;
      default: 
        break;
    }
  }, [setShowForm, setShowWarning]);

  const onSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchString(value);
  };

  const debounceOnSearch = debouncer(onSearch, 200);

  return (
    <UserConstrolsDiv> 
      <Tooltip
        label={<OperationButton srcIcon={addIcon} operation="ADD" onOperationClick={onOperationClick} alt='add icon'/>} 
        text={'Add User'}
        control={true}
      />
      <GapLine />
      <Tooltip
        label={<OperationButton srcIcon={editIcon} operation="EDIT" onOperationClick={onOperationClick} alt='edit icon' disabled={!usersList.length || !usersList.filter((data) => data.id.includes(searchString)).length}/>} 
        text={'Edit User'}
        control={true}
      />
      <GapLine />
      <Tooltip
        label={<OperationButton srcIcon={deleteIcon} operation="DELETE" onOperationClick={onOperationClick} alt='delete icon' disabled={!usersList.some((data) => data.checked)}/>} 
        text={'Delete User'}
        control={true}
      />
      <GapLine />
      <SearchInput placeholder="Search User" onChange={debounceOnSearch}/>
    </UserConstrolsDiv>
  )
  ;
};

export default UserControls;

