import { styled } from '@mui/material';

export const ModalContentContainer = styled('div')(({ theme }) => ({
  border: '1px solid #f9f9f9',
  width: '30vh',
  padding: '16px 32px 24px',
  boxShadow:
    '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)',
  backgroundColor: theme.palette.background.default,
  borderRadius: '10px',
  '& h2': {
    color: theme.palette.primary.main
  }
}));
export const ModalHeader = styled('div')(({ theme }) => ({
  paddingBottom: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

export const ModalFooter = styled('div')(({ theme }) => ({
  paddingTop: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  textShadow: '1px 0.5px 0.2em black',
  '& button': {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));
