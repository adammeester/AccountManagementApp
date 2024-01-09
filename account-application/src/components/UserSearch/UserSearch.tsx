import { Button, CircularProgress, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { GetUser } from '../../api/UserApi';
import { User } from '../../utils/types';
import UserSearchResults from '../UserSearchResults';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { SearchContainer } from '../../styles/FormStyles';
import { ErrorContainer } from '../../styles/ErrorStyles';
import { ContentContainer } from '../../styles/ContentStyles';

const SearchRow = styled('div')(({ theme }) => ({
  justifyContent: 'center',
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}));

const UserSearch = () => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await GetUser(input);
      setUser(response.data);
    } catch (err: any) {
      if (err.response.status === 400) {
        setError('Could not find user with that email.');
      }
    }
    setIsLoading(false);
  };

  return (
    <ContentContainer>
      <SearchContainer>
        <SearchRow>
          <TextField
            variant="outlined"
            color="secondary"
            label="Search for user"
            placeholder="user@email.com"
            onChange={e => setInput(e.target.value)}
          />
          <Button
            startIcon={<PersonSearchIcon />}
            onClick={handleSearch}
            variant="contained"
          >
            Search
          </Button>
        </SearchRow>
        {isLoading ? (
          <CircularProgress sx={{ marginTop: '2rem' }} />
        ) : user ? (
          <UserSearchResults user={user} />
        ) : (
          <ErrorContainer>{error}</ErrorContainer>
        )}
      </SearchContainer>
    </ContentContainer>
  );
};

export default UserSearch;
