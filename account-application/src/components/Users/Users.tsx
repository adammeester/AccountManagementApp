import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  styled
} from '@mui/material';
import { useEffect, useState } from 'react';
import { NewUser, User } from '../../utils/types';
import UserResults from '../UserResults';
import AddIcon from '@mui/icons-material/Add';
import CreateUser from '../create-user';
import { AddUser, DeleteUser, GetUsers } from '../../api/UserApi';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { ErrorContainer } from '../../styles/ErrorStyles';
import { ContentContainer } from '../../styles/ContentStyles';

const UsersContainer = styled('div')(({ theme }) => ({}));

const Users = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [error, setError] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAlertClose = () => {
    setShowError(false);
  };

  const handleShowUserForm = () => {
    setShowUserForm(!showUserForm);
  };

  //TODO
  const handleEdit = (user: User) => {
    return null;
  };
  const handleDelete = async (id: number) => {
    try {
      await DeleteUser(id);
      setUsers(users.filter(user => user.id === id));
    } catch (err: any) {
      setError(err);
      setShowError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await GetUsers();
        if (response?.data?.length) {
          setUsers(response.data);
        }
      } catch (err: any) {
        setError(err.message);
        setShowError(true);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const handleCreateUser = async (user: NewUser) => {
    try {
      const { data } = await AddUser(user);
      if (data) {
        setUsers([...users, data]);
        setShowSuccess(true);
        setShowUserForm(false);
      }
    } catch (err: any) {
      setError(err.message);
      setShowError(true);
    }
  };

  return isLoading ? (
    <ContentContainer>
      <CircularProgress color="secondary" />
    </ContentContainer>
  ) : (
    <ContentContainer>
      <UsersContainer>
        {users?.length ? (
          <UserResults
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <ErrorContainer>No users to display.</ErrorContainer>
        )}
        <ButtonStyles>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleShowUserForm}
          >
            Add User
          </Button>
        </ButtonStyles>
        {showSuccess ? (
          <Snackbar
            open={showSuccess}
            autoHideDuration={6000}
            onClose={handleAlertClose}
          >
            <Alert variant="filled" severity="success">
              User added!
            </Alert>
          </Snackbar>
        ) : null}
        {error ? (
          <Snackbar
            open={showError}
            autoHideDuration={6000}
            onClose={handleAlertClose}
          >
            <Alert variant="filled" severity="error">
              Error! {error}
            </Alert>
          </Snackbar>
        ) : null}
      </UsersContainer>
      <CreateUser
        isOpen={showUserForm}
        handleCreateUser={handleCreateUser}
        handleClose={handleShowUserForm}
      />
    </ContentContainer>
  );
};

export default Users;
