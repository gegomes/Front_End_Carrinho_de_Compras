// theme.ts
import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3366FF',
      light: '#5C8CFF',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#FFB800',
      contrastText: '#000'
    },
    success: {
      main: '#00C853'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#212121',
      secondary: '#555555'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 13, // 🔹 base menor (padrao é 14)

    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.75rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 500 },
    h5: { fontSize: '1.1rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
    subtitle1: { fontSize: '0.95rem' },
    subtitle2: { fontSize: '0.85rem' },
    body1: { fontSize: '0.9rem' },
    body2: { fontSize: '0.8rem' },
    button: { fontSize: '0.85rem', textTransform: 'none' }
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
          backgroundColor: '#F0F4FF'
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

export default theme
