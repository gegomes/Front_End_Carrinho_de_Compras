// theme.ts
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3366FF',        // azul forte do header
      light: '#5C8CFF',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#FFB800',        // amarelo para destaques
      contrastText: '#000'
    },
    success: {
      main: '#00C853'         // verde de “Frete grátis”
    },
    background: {
      default: '#F5F5F5',     // cinza claro por trás dos cards
      paper: '#FFFFFF'        // branco dos cards
    },
    text: {
      primary: '#212121',
      secondary: '#555555'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          textTransform: 'none',
          boxShadow: 'none'
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: '#F0F4FF'  // leve azul de fundo no header do card
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          backgroundColor: '#3366FF'
        }
      }
    }
  }
})
export default theme;
