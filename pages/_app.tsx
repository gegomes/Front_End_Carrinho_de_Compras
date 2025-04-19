// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import theme from '@/utils/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Header />
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
