import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { CheckDiv, DateDiv, EmailDiv, NameDiv, StatusDiv, TableRow, UserIdDiv } from './CommonCSS';
import sortIconDefault from '../../assets/icons/sort-icon-default.svg';
import sortIconActive from '../../assets/icons/sort-icon-active.svg';
import { UsersContext } from '../../Users';
import { TableCheckBoxInput } from '../UsersTable/CommonCSS';

const TableRowTitleDiv = styled(TableRow)`
  background: #404D59;
  font-size: 1.125rem;
  position: sticky;
  top: 0px;
  z-index: 1;
`;

const UserIDSortButton = styled.button`
  width: 20px;
  height: 100%;
  outline: none;
  border: none;
  background: none;
  padding: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ImageContainer = styled.img`
  width: fit-content;
  height: fit-content;
  padding: none;
  margin-top: -12px;
`;



const TableRowTitle = () => {
  const {usersList, setUsersList} = useContext(UsersContext);
  const [sortTable, setSortTable] = useState(false);

  const onSortClick = () => {

    setUsersList((prev) => {
      if(!sortTable) {
        return [...prev].sort((a,b) => a.id.localeCompare(b.id));
      }
      return [...prev].sort((a,b) => a.created.getTime() - b.created.getTime());
    });

    setSortTable((prev) => !prev);
  };

  const onCheckboxChange = (e) => {
    const checked = e.target.checked;
    setUsersList((prev) => {
        return [...prev].map((data) => ({...data, checked: checked}));
    })
  }

  return (
    <TableRowTitleDiv>
      <CheckDiv >
        <TableCheckBoxInput checked={usersList.length ? usersList.every((data) => data.checked) : false} type='checkbox' onChange={onCheckboxChange}/>
      </CheckDiv>
      <UserIdDiv >
        User ID
        <UserIDSortButton onClick={onSortClick}>
          {sortTable ? <ImageContainer src={sortIconActive} alt="sortIconActive"/> : <ImageContainer src={sortIconDefault} alt="sortIconDefault"/>}
        </UserIDSortButton>
      </UserIdDiv>
      <NameDiv>
        First Name
      </NameDiv>
      <NameDiv>
        Last Name
      </NameDiv>
      <EmailDiv>
        Email
      </EmailDiv>
      <StatusDiv>
        Status
      </StatusDiv>
      <DateDiv >
        Created On
      </DateDiv>
    </TableRowTitleDiv>
  )
}

export default TableRowTitle;