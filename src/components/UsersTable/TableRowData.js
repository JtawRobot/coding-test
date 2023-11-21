import React, { useContext } from 'react';
import styled from 'styled-components';
import { CheckDiv, DateDiv, EmailDiv, NameDiv, StatusDiv, TableRow, UserIdDiv } from './CommonCSS';
import { evaluateSearch, showText } from '../../utils/utils';
import { UsersContext } from '../../Users';

const TableRowDataDiv = styled(TableRow)`
  background: none;
  font-size: 1rem;
  display: ${({display}) => display};
`;


const TableCheckBoxInput = styled.input`
  width: fit-content;
  height: fit-content;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;


const TableRowData = ({tableData, index}) => {

  const {setUsersList, searchString} = useContext(UsersContext);
  const {id, checked, firstName, lastName, email, status, created} = tableData;

  const onCheckboxChange = (e) => {
    setUsersList((prev) => {
      const prevCopy = [...prev];
      prevCopy[index].checked = e.target.checked;
      return prevCopy;
    });
  };

  return (
    <TableRowDataDiv display={ evaluateSearch(tableData, searchString) ? 'flex' : 'none'}>
      <CheckDiv >
      <TableCheckBoxInput checked={checked} type='checkbox' onChange={onCheckboxChange}  />
      </CheckDiv>
      <UserIdDiv >
        {showText(id, 12)}
      </UserIdDiv>
      <NameDiv>
        {showText(firstName , 16)}
      </NameDiv>
      <NameDiv>
        {showText(lastName , 16)}
      </NameDiv>
      <EmailDiv>
        {showText(email , 16)}
      </EmailDiv>
      <StatusDiv>
        {status || ''}
      </StatusDiv>
      <DateDiv >
        {showText(created?.toString(), 23)}
      </DateDiv>
    </TableRowDataDiv>
  )
}

export default TableRowData;