import { Alert, Button, CircularProgress, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Account } from '../../utils/types';
import AccountResults from '../AccountResults';
import AddIcon from '@mui/icons-material/Add';
import CreateAccount from '../CreateAccount';
import { AddAccount, GetAccounts } from '../../api/AccountApi';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { ErrorContainer } from '../../styles/ErrorStyles';
import { ContentContainer } from '../../styles/ContentStyles';

const Accounts = () => {
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [error, setError] = useState('');
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAlertClose = () => {
    setShowError(false);
    setShowSuccess(false);
  };

  const handleShowAccountForm = () => {
    setShowAccountForm(!showAccountForm);
  };

  const handleEdit = () => {
    return null;
  };
  const handleDelete = () => {
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await GetAccounts();
        setAccounts(response.data);
      } catch (err: any) {
        setError(err.message);
        setShowError(true);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const handleCreateAccount = async (userId: number) => {
    try {
      const { data } = await AddAccount(userId);
      if (data) {
        setAccounts([...accounts, data]);
        setShowSuccess(true);
        setShowAccountForm(false);
      }
    } catch (err: any) {
      setError(err.message);
      setShowError(true);
    }
  };

  return isLoading ? (
    <CircularProgress color="secondary" />
  ) : (
    <ContentContainer>
      <CreateAccount
        isOpen={showAccountForm}
        handleCreateAccount={handleCreateAccount}
        handleClose={handleShowAccountForm}
      />
      {accounts.length ? (
        <AccountResults
          accounts={accounts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <ErrorContainer>No accounts to display.</ErrorContainer>
      )}
      <ButtonStyles>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleShowAccountForm}
        >
          Add Account
        </Button>
      </ButtonStyles>
      {showSuccess ? (
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <Alert variant="filled" severity="success">
            Account added!
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
    </ContentContainer>
  );
};

export default Accounts;
