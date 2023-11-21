import React, { useState, createContext, Suspense } from "react";
import styled from "styled-components";
import UsersControls from "./components/UsersControls";
import UsersTable from "./components/UsersTable";
import { initialUsers } from "./utils/utils";
import DeleteWarning from "./components/UsersControls/DeleteWarning";

const UsersForm = React.lazy(() => import("./components/UsersForm"));


const UsersLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;

  @media (max-width: 1000px) {
    justify-content: unset;
  }
`;

const Backdrop = styled(UsersLayout)`
  background: rgba(0,0,0,0.6);
  position: fixed;
  top: 0px;
  left: 0px; 
  flex-direction: column;
  display: ${({display}) => display};
  z-index: 3;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const UsersBody = styled.div`
  max-width: 1040px;
  width: fit-content;
  border: 1px solid #A7B5C2;
  min-height: 176px;
  height: 308px;
  display: flex;
  flex-direction: column;
`;


export const UsersContext = createContext();

const Users = () => {

  const [usersList, setUsersList] = useState([ ...initialUsers ]);
  const [searchString, setSearchString] = useState('');
  const [showForm, setShowForm] = useState({visible: false,  type: 'ADD'});
  const [showWarning, setShowWarning] = useState(false);

  return (
    <UsersContext.Provider value={{ usersList, setUsersList, showForm, setShowForm, setShowWarning, searchString, setSearchString }}>
      <UsersLayout>
        <UsersBody>
          <UsersControls />
          <UsersTable />
        </UsersBody>
      </UsersLayout>
      <Backdrop display={showForm.visible || showWarning ? 'flex' : 'none'}>
        <Suspense fallback={null}>
          {showForm.visible && <UsersForm />}
        </Suspense>
        {showWarning && <DeleteWarning />}
      </Backdrop>
    </UsersContext.Provider>
  );
}

export default Users;
