import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, styled } from '@mui/material';

const ActionsContainer = styled('div')(({ theme }) => ({
  '& svg': {
    color: theme.palette.primary.light
  }
}));

type TableActionsProps = {
  rowId: number;
};

const TableActions = ({ rowId }: TableActionsProps) => {
  return (
    <ActionsContainer>
      <IconButton onClick={() => console.log('edting ', rowId)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => console.log('deleting ', rowId)}>
        <DeleteIcon />
      </IconButton>
    </ActionsContainer>
  );
};

export default TableActions;
