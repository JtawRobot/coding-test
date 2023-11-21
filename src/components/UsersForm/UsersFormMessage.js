import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

const UsersMessage = styled.div`
  width: 320px;
  height: fit-content;
  color: #E1E1E1;
  margin: 0 0 8px 0;
  background: ${({color}) => color};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  padding: 8px;
  font-size: 1rem;
  display: ${({display}) => display};
  box-sizing: border-box;
  flex-direction: column;
`;

const List = styled.ul`
  margin: 0px;
  padding: 0px 16px;
`;

const UsersFormMessage = ({visible, error, messages, onCloseMessage}) => {

  useEffect(() => {
    if(visible) {
      setTimeout(function() {
        onCloseMessage();
       }, 2500);
    }
  }, [visible, onCloseMessage])

  const renderMessage = useCallback(() => {
    if (messages.length > 1) {
      return (
      <List>
        {messages.map((message) => (
          <li key={message}>
            {message}
          </li>
        ))}
      </List>
      )
    }
    return messages[0];
  }, [messages])
  
  return (
    <UsersMessage  color={error ? 'red' : 'green'} display={visible ? 'flex' : 'none'}>
      {renderMessage()}
    </UsersMessage>
  )
}

export default UsersFormMessage;