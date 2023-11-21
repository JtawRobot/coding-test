import React, { Fragment, useCallback, useContext } from 'react';
import styled from 'styled-components';

import TableRowTitle from './TableRowTitle';
import { UsersContext } from '../../Users';
import TableRowData from './TableRowData';
import { evaluateSearch } from '../../utils/utils';

const UsersTableBody = styled.div`
  width: 100%;
  min-height: calc(100% - 44px);

  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width:  8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #A7B5C2;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #36404A ;
    cursor: pointer;
    background-clip: padding-box;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #36404A ;
  }
`;

export const EmptyRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #A7B5C2;
`;

const UsersTable = () => {
  const {usersList, searchString} = useContext(UsersContext);

  const showTableData = useCallback(() => {
    if (!usersList.length) {
      return (
        <EmptyRow>
          Empty List, Add User
        </EmptyRow>
      )
    }

    if (!usersList.filter((data) => evaluateSearch(data, searchString)).length){
      return (
        <EmptyRow>
          User Searching Not Found
        </EmptyRow>
      )
    }

    return (
      <Fragment>
        {usersList.map((data, index) => (
          <TableRowData key={`${data?.id} ${index}`} index={index} tableData={data} />))
        }
      </Fragment>
    )
    
  },[searchString, usersList])

  return (
    <UsersTableBody>
      <TableRowTitle />
      {showTableData()}
    </UsersTableBody>
  )
}

export default UsersTable;