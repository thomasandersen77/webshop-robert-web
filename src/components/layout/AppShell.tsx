import { Box, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { CartDrawer } from '../cart/CartDrawer';
import { MobileMenuDrawer } from '../navigation/MobileMenuDrawer';
import { DemoBanner } from './DemoBanner';
import { DesktopTopbar } from './DesktopTopbar';
import { Footer } from './Footer';
import { MobileTopbar } from './MobileTopbar';

export function AppShell() {
  const isMdUp = useMediaQuery((t: Theme) => t.breakpoints.up('md'));

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        pb: { xs: 'env(safe-area-inset-bottom, 0px)', md: 0 },
      }}
    >
      {isMdUp ? <DesktopTopbar /> : <MobileTopbar />}
      <DemoBanner />
      <MobileMenuDrawer />
      <CartDrawer />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
