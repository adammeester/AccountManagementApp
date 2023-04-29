import { createTheme } from '@mui/material';
import Colours from './Colours';

const theme = createTheme({
  palette: Colours,
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'subtitle1'
          },
          style: {
            fontWeight: 700,
            fontSize: 24
          }
        },
        {
          props: {
            variant: 'body2'
          },
          style: {
            fontSize: 16
          }
        }
      ]
    }
  }
});

export default theme;
