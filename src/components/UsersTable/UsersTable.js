import React, { useContext } from 'react';
import styled from 'styled-components';

import TableRowTitle from './TableRowTitle';
import { UsersContext } from '../../Users';
import TableRowData from './TableRowData';

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

const UsersTable = () => {
  const {usersList} = useContext(UsersContext);

  return (
    <UsersTableBody>
      <TableRowTitle />
      {usersList.map((data, index) => (
        <TableRowData key={`${data?.id} ${index}`} index={index} tableData={data} />
      ))}
    </UsersTableBody>
  )
}

export default UsersTable;