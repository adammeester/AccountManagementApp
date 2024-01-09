import { styled } from '@mui/material';
import { DataGrid, gridClasses, GridRenderCellParams } from '@mui/x-data-grid';
import { Account } from '../../utils/types';
import TableActions from '../TableActions/TableActions';

const AccountResultsStyles = styled('div')(({ theme }) => ({
  height: 400,
  width: '100%'
}));

const columns = [
  { field: 'id', headerName: 'Id', width: 550 },
  { field: 'userId', headerName: 'Owner', width: 550 },
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

type AccountsResultsProps = {
  accounts: Array<Account>;
  handleEdit: () => void;
  handleDelete: () => void;
};

const AccountResults = ({
  accounts,
  handleEdit,
  handleDelete
}: AccountsResultsProps) => {
  const handleAccountEdit = (id: any) => {
    handleEdit();
    console.log('editing ', id);
  };

  return (
    <AccountResultsStyles>
      <DataGrid
        columns={columns}
        rows={accounts}
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
        onCellEditCommit={params => handleAccountEdit(params.id)}
      />
    </AccountResultsStyles>
  );
};

export default AccountResults;
