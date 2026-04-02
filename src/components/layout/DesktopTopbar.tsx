import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useShopUi } from '../../context/useShopUi';
import { SearchBar } from '../search/SearchBar';

export function DesktopTopbar() {
  const { openCart, cartItemCount } = useShopUi();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={trigger ? 2 : 0}
      sx={{
        top: 0,
        zIndex: (t) => t.zIndex.drawer + 1,
        borderBottom: (t) => (trigger ? 'none' : `1px solid ${t.palette.divider}`),
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
        <Toolbar disableGutters sx={{ gap: 2, py: 1.25, minHeight: 64 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              cursor: 'pointer',
              minWidth: 132,
              flexShrink: 0,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Typography variant="h6" fontWeight={800} color="primary.main">
              Robert Shop
            </Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, maxWidth: 560 }}>
            <SearchBar size="small" />
          </Box>

          <IconButton color="inherit" aria-label="Konto">
            <PersonOutlineIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Handlekurv" onClick={openCart}>
            <Badge badgeContent={cartItemCount} color="primary" invisible={cartItemCount === 0} max={99}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
