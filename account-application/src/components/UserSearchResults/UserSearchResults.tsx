import { styled } from '@mui/material';
import { User } from '../../utils/types';

const UserContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.paper
}));
const UserHeader = styled('div')(({ theme }) => ({
  padding: '0.2rem',
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.text.secondary
}));
const UserBody = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  '& div': {
    display: 'inline',
    color: theme.palette.primary.light,
    fontWeight: 700,
    margin: theme.spacing(6)
  },
  '& span': {
    margin: theme.spacing(1),
    fontWeight: 400,
    display: 'inline'
  }
}));

type UserSearchResultsProps = {
  user: User;
};
const UserSearchResults = ({ user }: UserSearchResultsProps) => {
  return (
    <UserContainer>
      <UserHeader>
        <h2>User: {user.id}</h2>
      </UserHeader>
      <UserBody>
        <div>
          Name: <span>{user.name}</span>
        </div>
        <div>
          Email: <span>{user.email}</span>
        </div>
        <div>
          Salary: <span>${user.salary}</span>
        </div>
        <div>
          Expenses: <span>${user.expenses}</span>
        </div>
        <div>
          Account Number:
          <span>{user.account ? user.account.id : 'Create Account'}</span>
        </div>
      </UserBody>
    </UserContainer>
  );
};

export default UserSearchResults;
