import { styled } from '@mui/material';

export const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  borderRadius: '0.2rem',
  border: `1px solid ${theme.palette.background.paper}`
}));
