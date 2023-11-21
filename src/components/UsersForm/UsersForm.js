import React, { Fragment, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { UsersContext } from '../../Users';
import UsersFormInput from './UsersFormInput';
import UsersFormMessage from './UsersFormMessage';
import { evaluateSearch, validateEmail } from '../../utils/utils';

const UsersFormBody = styled.div`
  width: 320px;
  height: ${({height}) => height};
  background: #36404A; 
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  color: #A7B5C2;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseIcon = styled.button`
  width: fit-content;
  height: fit-content;
  background: none;
  border: none;
  outline: none;
  padding: none;
  font-size: 1.5rem;
  position: absolute;
  top: 4px;
  right: 4px;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
`;

const FormLabelSpan = styled.span`
  width: fit-content;
  font-size: 1.125rem;
  margin: 16px 0 0 0;
`;

const FormItemLabel = styled(FormLabelSpan)`
  align-self: flex-start;
  font-size: 1rem;
`;

const FormItemSelect = styled.select`
  width: 100%;
  height: 26px;
  margin: 10px 0 0 0;
  color: #A7B5C2;
  outline: none;
  border: 1px solid #78838C;
  background: #36404A;
  border-radius: none;
  text-transform: capitalize;
`;

const UserSelect = styled(FormItemSelect)`
  margin: 16px 0 0 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  outline: none;
  border: 1px solid #78838C;
  background: inherit;
  align-items: center;
  font-size: 1rem;
  color: inherit;
  margin: 32px 0 0 0;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 6px;
  transition: all 0.2s linear;

  &:hover {
    color: #36404A;
    background: #A7B5C2;
  }

  `;

  const SelectUserOption = styled.option`
    display: ${({display}) => display};
  `;

const formLabel = {
  'ADD': 'ADD USER',
  'EDIT': 'EDIT USER'
};

const UsersForm = () => {
  const {showForm, setShowForm, usersList, setUsersList, searchString} = useContext(UsersContext);
  const [formMessage, setFormMessage] = useState({visible: false, error: false, messages: []});
  const [selectedIndex, setSelectedindex] = useState('default');
  const [formItems, setFormItems] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: 'REGISTERED',
  });

  const onCloseForm = () => {
    setFormItems((prev) => ({...prev, firstName: '', lastName: '',  email: '', status: 'REGISTERED'}));
    setSelectedindex("default");
    setShowForm((prev) => ({...prev, visible:false,}));
  };

  const onCloseMessage = useCallback(() => {
    setFormMessage((prev) => ({...prev, visible: false}));
  }, [])

  const onInputChange = useCallback((property, value) => {
    setFormItems((prev) => ({...prev, [property]: value}));
  }, [])

  const onSelectChange = (e) => {
    e.preventDefault();
    setFormItems((prev) => ({...prev, status: e.target.value}));
  };

  const onEditUserchange = (e) => {
    e.preventDefault();
    const index = e.target.value;
    const selectedUser = [...usersList][index];
    setSelectedindex(index);
    setFormItems(() => ({firstName: selectedUser.firstName, lastName: selectedUser.lastName, email: selectedUser.email, status: selectedUser.status }))
  };

  const onFormSubmit = () => {

    const {firstName, lastName, email, status} = formItems;

    if (!firstName || !lastName) {
      if (!validateEmail(email)) {
        setFormMessage((prev) => ({...prev, visible: true, error: true, messages:['Missing Fields', 'Invalid email']}));
        return;
      }
      setFormMessage((prev) => ({...prev, visible: true, error: true, messages:['Missing Fields']}));
      return;
    };

    if (!validateEmail(email)) {
      setFormMessage((prev) => ({...prev, visible: true, error: true, messages:['Invalid email']}));
      return;
    }
    
    if (showForm.type === "ADD") {
      const id = `${firstName.toLowerCase()}${lastName.toLowerCase()}`.replaceAll(' ', '');
      const checkDupeId = usersList.filter((data) => data?.id?.includes(id)).length;
      const generateNewId = checkDupeId > 0 ? id+`${checkDupeId}` : id;
      setUsersList((prev) => [...prev, 
        {checked: false, id: generateNewId, 
        firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase(), email: email.toLowerCase(), 
        status, created: new Date()}])
  
      setFormMessage((prev) => ({...prev, visible: true, error: false, messages:['New User Added!']}));
      setFormItems((prev) => ({...prev, firstName: '', lastName: '', email: '', status: 'REGISTERED'}));
      return;
    }

    // on EDIT

    if (selectedIndex === 'default') {
      setFormMessage((prev) => ({...prev, visible: true, error: true, messages:['Select User to Edit']}));
      return;
    }

    setUsersList((prev) => {
      const listCopy = [...prev];
      listCopy[selectedIndex].firstName = firstName.toLowerCase();
      listCopy[selectedIndex].lastName = lastName.toLowerCase();
      listCopy[selectedIndex].email = email.toLowerCase();
      listCopy[selectedIndex].status = status;
      return listCopy;
    })

    setFormMessage((prev) => ({...prev, visible: true, error: false, messages:['Update Succeeded!']}));
    setSelectedindex("default");
    setFormItems((prev) => ({...prev, firstName: '', lastName: '', email: '', status: 'REGISTERED'}));
  };

  return (
    <Fragment>
      <UsersFormMessage visible={formMessage.visible} error={formMessage.error} messages={formMessage.messages} onCloseMessage={onCloseMessage}/>
      <UsersFormBody height={showForm.type === 'ADD' ? '432px' : '480px'}>
        <CloseIcon onClick={onCloseForm}>
          x
        </CloseIcon>
        <FormLabelSpan>
          {formLabel[showForm.type]}
        </FormLabelSpan>
        {showForm.type === 'EDIT' && 
          <UserSelect value={selectedIndex} onChange={onEditUserchange}>
            <SelectUserOption value="default" disabled>Select User</SelectUserOption>
            {usersList.map((data, index) => (<SelectUserOption display={evaluateSearch(data, searchString) ? 'default' : 'none'} 
            key={`${index} ${data.firstName}`} value={index}> {`${data.firstName} ${data.lastName} (${data.id})`} </SelectUserOption>))}
          </UserSelect>}
        <FormItemLabel>
          First Name*
        </FormItemLabel>
        <UsersFormInput property='firstName' value={formItems.firstName} onInputChange={onInputChange}/>
        <FormItemLabel>
          Last Name*
        </FormItemLabel>
        <UsersFormInput property='lastName' value={formItems.lastName} onInputChange={onInputChange}/>
        <FormItemLabel>
          Email*
        </FormItemLabel>
        <UsersFormInput property='email' value={formItems.email} onInputChange={onInputChange}/>
        <FormItemLabel>
          Status
        </FormItemLabel>
        <FormItemSelect value={formItems.status} onChange={onSelectChange}>
          <option value="REGISTERED">REGISTERED</option>
          <option value="INITIATED">INITIATED</option>
        </FormItemSelect>
        <SubmitButton onClick={onFormSubmit}>
          SUBMIT
        </SubmitButton>
      </UsersFormBody>
    </Fragment>
  )
}

export default UsersForm;