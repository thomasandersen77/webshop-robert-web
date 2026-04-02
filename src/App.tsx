import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShopUiProvider } from './context/ShopUiProvider';
import { AppRoutes } from './routes/AppRoutes';
import { theme } from './theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <ShopUiProvider>
            <AppRoutes />
          </ShopUiProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
