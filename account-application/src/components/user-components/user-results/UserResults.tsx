import { styled } from '@mui/material';
import {
  DataGrid,
  gridClasses,
  GridColumns,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { User } from '../../../utils/types';
import TableActions from '../../table-actions';

const UserResultsStyles = styled('div')(({ theme }) => ({
  height: 400,
  width: '100%'
}));

type UserDataFields = {
  id: number;
  name: string;
  email: string;
  salary: string;
  expenses: string;
  account?: string;
};

const columns: GridColumns<UserDataFields> = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'salary', headerName: 'Salary', width: 200 },
  { field: 'expenses', headerName: 'Expenses', width: 200 },
  { field: 'account', headerName: 'Account', width: 200 },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 220,
    renderCell: (params: GridRenderCellParams) => (
      <TableActions rowId={params.row.id} />
    )
  }
];

type UserResultsProps = {
  users: Array<User>;
  handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
};

const UserResults = ({ users }: UserResultsProps) => {
  const handleUserEdit = (id: any) => {
    console.log('editing ', id);
  };

  const parseUsers = (users: Array<User>): Array<UserDataFields> => {
    return users?.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        salary: `$${user.salary}`,
        expenses: `$${user.expenses}`,
        account: user.account ? user.account.id.toString() : 'No account'
      };
    });
  };

  return (
    <UserResultsStyles>
      <DataGrid
        columns={columns}
        rows={parseUsers(users)}
        getRowId={row => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        getRowSpacing={params => ({
          top: params.isFirstVisible ? 0 : 2,
          bottom: params.isLastVisible ? 0 : 2
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: theme => theme.palette.primary.dark
          },
          border: 'none'
        }}
        onCellEditCommit={params => handleUserEdit(params.id)}
      />
    </UserResultsStyles>
  );
};

export default UserResults;
