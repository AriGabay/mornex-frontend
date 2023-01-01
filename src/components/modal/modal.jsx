import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Modal as ModalMui, TextField } from '@mui/material';
import Select from '../selectButton/selectButton';
import {
  createUserRequest,
  decodedJwt,
  removeUserRequest,
  updateUserRequest,
} from '../../services/user-service';
import { eventBus } from '../../services/event-bus';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
  maxWidth: '400px',
  minWidth: '250px',
};

export default function Modal({
  isOpen = false,
  setModalOpen,
  typeAction,
  userSelected,
  setUsersList,
  setUserSelected,
}) {
  const [dataInputs, setDataInputs] = React.useState(
    userSelected.role ? { role: userSelected.role } : { role: 'User' }
  );
  const userStatus = decodedJwt();

  const updateUser = async () => {
    if (userSelected.id === userStatus.id) {
      eventBus.dispatch('error', {
        message: "Admin canֿֿֿֿ't update himself",
      });
      return;
    }
    const updateUser = await updateUserRequest(userSelected?.id, dataInputs);
    setUsersList((prev) => {
      const idx = prev.findIndex((user) => user.id === userSelected.id);
      prev[idx] = { ...updateUser };
      return [...prev];
    });
    eventBus.dispatch('success', {
      message: `User ID ${updateUser?.id} Updated`,
    });
    handleClose();
  };

  const removeUser = async () => {
    if (userSelected?.id === userStatus?.id) {
      eventBus.dispatch('error', {
        message: "User canֿֿֿֿ't remove himself",
      });
      return;
    }
    await removeUserRequest(userSelected?.id);
    setUsersList((prev) => {
      // eslint-disable-next-line
      const newData = prev.filter((user) => {
        if (user.id !== userSelected.id) return user;
      });
      return [...newData];
    });
    eventBus.dispatch('success', {
      message: `User ID ${userSelected?.id} Deleted`,
    });
    handleClose();
  };
  const createUser = async () => {
    if (userStatus?.rls !== 'Admin') return;
    if (!dataInputs?.email || !dataInputs?.username || !dataInputs?.role) {
      eventBus.dispatch('error', { message: 'Missing parameters' });
      return;
    }
    const newUser = await createUserRequest(dataInputs);
    setUsersList((prev) => [...prev, newUser]);
    eventBus.dispatch('success', {
      message: `User Created`,
    });
    handleClose();
  };

  const handleChange = ({ name, value }) => {
    setDataInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setUserSelected({});
    setModalOpen(false);
  };
  const validateEmail = ({ value }) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailRegex.test(value)) {
      console.log('yes');
      handleChange(value);
    }
  };

  const contentComponent = () => {
    if (!Object.keys(userSelected).length > 0) return;
    if (typeAction.type === 'edit' && Object.keys(userSelected).length > 0) {
      return (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Modal
          </Typography>
          <Typography mb={2} id="modal-modal-description" sx={{ mt: 2 }}>
            Edit User ID : {userSelected?.id}
          </Typography>
          <TextField
            style={{ marginBottom: '10px' }}
            title="email"
            placeholder="email"
            name="email"
            defaultValue={userSelected?.email}
            onChange={(event) => handleChange(event.target)}
          />
          <TextField
            style={{ marginBottom: '10px' }}
            title="Username"
            placeholder="Username"
            name="username"
            defaultValue={userSelected?.username}
            onChange={(event) => handleChange(event.target)}
          />
          <Select
            options={['Admin', 'User']}
            title="Role"
            selected={userSelected?.role}
            setSelected={setDataInputs}
          />
          <Button onClick={() => updateUser()}>Update</Button>
          <Button onClick={() => handleClose()}>Exit</Button>
        </Box>
      );
    } else if (
      typeAction.type === 'delete' &&
      Object.keys(userSelected).length > 0
    ) {
      return (
        <Box sx={style}>
          <Typography
            pl={'10px'}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Delete Modal
          </Typography>
          <Typography
            id="modal-modal-title"
            style={{
              backgroundColor: 'pink',
              color: 'lightyellow',
              background: '#8c8c8c',
              padding: '10px',
              borderRadius: '10px',
            }}
            variant="h6"
            component="h2"
          >
            Are you sure that you want delete user id : {userSelected?.id}
          </Typography>
          <Button onClick={() => removeUser()}>Delete</Button>
          <Button onClick={() => handleClose()}>Exit</Button>
        </Box>
      );
    } else {
      return (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Modal
          </Typography>
          <Typography mb={2} id="modal-modal-description" sx={{ mt: 2 }}>
            Create User
          </Typography>
          <TextField
            style={{ marginBottom: '10px' }}
            title="email"
            placeholder="email"
            name="email"
            onChange={(event) => validateEmail(event.target)}
          />
          <TextField
            style={{ marginBottom: '10px' }}
            title="Username"
            placeholder="Username"
            name="username"
            onChange={(event) => handleChange(event.target)}
          />
          <TextField
            style={{ marginBottom: '10px' }}
            title="Password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event.target)}
          />
          <Select
            options={['Admin', 'User']}
            title="Role"
            selected={dataInputs?.role}
            setSelected={setDataInputs}
          />
          <Button onClick={() => createUser()}>Create</Button>
          <Button onClick={() => handleClose()}>Exit</Button>
        </Box>
      );
    }
  };

  return (
    <ModalMui
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {contentComponent()}
    </ModalMui>
  );
}
