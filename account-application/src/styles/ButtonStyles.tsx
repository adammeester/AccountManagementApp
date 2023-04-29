import styled from '@emotion/styled';

export const ButtonStyles = styled('div')(({ theme }) => ({
  '& button': {
    textTransform: 'capitalize',
    marginTop: '1rem',
    width: '100%',
    color: 'white',
    backgroundColor: '#ea00d9'
  }
}));
