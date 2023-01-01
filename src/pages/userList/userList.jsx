import React, { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import CircularIndeterminate from '../../components/circularProgress/circularProgress';
import CreateButton from '../../components/createButton/createButton';
import Modal from '../../components/modal/modal';
import { decodedJwt, userList } from '../../services/user-service';
import './userList.css';

export const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [typeAction, setTypeAction] = useState({});
  const [userSelected, setUserSelected] = useState({});

  const userStatus = decodedJwt();

  const getUsersList = async () => {
    const usersListReq = await userList();
    if (usersListReq?.length) {
      setUsersList(usersListReq);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    const user = usersList.find((user) => user.id === typeAction.cardId);
    if (!user) return;
    setUserSelected({ ...user });
  }, [typeAction, usersList]);

  return usersList.length > 0 ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {userStatus?.rls === 'Admin' && (
        <CreateButton
          setModalOpen={setModalOpen}
          setTypeAction={setTypeAction}
          setUserSelected={setUserSelected}
        />
      )}
      <div className="user-list-container">
        {usersList.length > 0 &&
          usersList.map((user) => {
            return (
              <div key={user.id}>
                <Card
                  key={user.id}
                  data={{ ...user }}
                  setModalOpen={setModalOpen}
                  setTypeAction={setTypeAction}
                />
              </div>
            );
          })}
      </div>
      {modalOpen && Object.keys(userSelected).length > 0 && (
        <Modal
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          typeAction={typeAction}
          userSelected={userSelected}
          setUsersList={setUsersList}
          setUserSelected={setUserSelected}
        />
      )}
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: '30px',
      }}
    >
      <CircularIndeterminate />
    </div>
  );
};
