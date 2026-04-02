import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { useShopUi } from '../../context/useShopUi';

const drawerWidth = 288;

const HOME = '/';

export function MobileMenuDrawer() {
  const { navOpen, setNavOpen, openCart } = useShopUi();
  const { token, logout } = useCustomerAuth();
  const navigate = useNavigate();

  const go = useCallback(
    (path: string, hashId?: string) => {
      setNavOpen(false);
      navigate({ pathname: path, hash: hashId ? `#${hashId}` : undefined });
    },
    [navigate, setNavOpen],
  );

  return (
    <Drawer
      anchor="left"
      open={navOpen}
      onClose={() => setNavOpen(false)}
      slotProps={{
        paper: {
          sx: {
            width: drawerWidth,
          },
        },
      }}
    >
      <Toolbar sx={{ px: 2 }}>
        <Box
          component={RouterLink}
          to={HOME}
          onClick={() => setNavOpen(false)}
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography variant="subtitle1" fontWeight={700} color="primary.main">
            Robert Shop
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        <ListItemButton onClick={() => go(HOME)} sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Hjem" />
        </ListItemButton>
        <ListItemButton onClick={() => go(HOME, 'categories')} sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Kategorier" />
        </ListItemButton>
        <ListItemButton onClick={() => go(HOME, 'products')} sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemIcon>
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText primary="Tilbud" />
        </ListItemButton>
        <ListItemButton onClick={() => go(HOME, 'products')} sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemIcon>
            <NewReleasesIcon />
          </ListItemIcon>
          <ListItemText primary="Nyheter" />
        </ListItemButton>
        <ListItemButton onClick={() => setNavOpen(false)} sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Min konto" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setNavOpen(false);
            openCart();
          }}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Handlekurv" />
        </ListItemButton>
        {token ? (
          <ListItemButton
            onClick={() => {
              setNavOpen(false);
              logout();
            }}
            sx={{ borderRadius: 2 }}
          >
            <ListItemText primary="Logg ut (kunde)" />
          </ListItemButton>
        ) : (
          <ListItemButton
            onClick={() => {
              setNavOpen(false);
              navigate('/login');
            }}
            sx={{ borderRadius: 2 }}
          >
            <ListItemText primary="Logg inn" />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
}
