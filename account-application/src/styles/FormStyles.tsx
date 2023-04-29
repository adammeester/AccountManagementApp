import { styled } from '@mui/material';

export const FormStyles = styled('div')(({ theme }) => ({
  '& label': {
    color: 'white !important'
  },
  '& .MuiFormControl-root': {
    marginTop: '1rem'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
      color: 'white'
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main
    }
  },
  '& button': {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.text.secondary,
    textTransform: 'capitalize'
  }
}));
export const SearchContainer = styled('div')(({ theme }) => ({
  '& label': {
    color: 'white !important'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
      color: 'white'
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main
    }
  },
  '& button': {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));

export const FormFooter = styled('div')(({ theme }) => ({
  paddingTop: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  textShadow: '1px 0.5px 0.2em black'
}));
