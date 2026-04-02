import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useShopUi } from '../../context/useShopUi';
import { formatNokFromMinor } from '../../utils/format';
import { CartSummary } from './CartSummary';

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartLines,
    cartTotalMinor,
    cartLoading,
    cartError,
    removeLine,
  } = useShopUi();

  return (
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 400 },
            maxWidth: '100%',
            borderTopLeftRadius: { sm: 24 },
            borderBottomLeftRadius: { sm: 24 },
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" fontWeight={800}>
          Handlekurv
        </Typography>
        <IconButton onClick={() => setCartOpen(false)} aria-label="Lukk">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {cartError ? (
        <Box sx={{ px: 2, pt: 2 }}>
          <Alert severity="warning">{cartError}</Alert>
        </Box>
      ) : null}
      <Stack spacing={2} sx={{ p: 2, flex: 1, overflow: 'auto' }}>
        {cartLoading && cartLines.length === 0 ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={32} />
          </Box>
        ) : null}
        {cartLines.map((item) => (
          <Stack
            key={item.productId}
            direction="row"
            spacing={1.5}
            sx={{
              p: 1.5,
              borderRadius: 3,
              bgcolor: 'background.default',
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt=""
              sx={{
                width: 72,
                height: 72,
                objectFit: 'cover',
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight={700} noWrap>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Antall: {item.quantity}
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {formatNokFromMinor(item.lineTotalMinor)}
              </Typography>
              {item.quantity > 1 ? (
                <Typography variant="caption" color="text.secondary">
                  {formatNokFromMinor(item.unitPriceMinor)} × {item.quantity}
                </Typography>
              ) : null}
            </Box>
            <IconButton
              size="small"
              aria-label="Fjern"
              onClick={() => void removeLine(item.productId)}
              disabled={cartLoading}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <CartSummary
        totalMinor={cartTotalMinor}
        loading={cartLoading}
        onCheckout={() => setCartOpen(false)}
        onContinue={() => setCartOpen(false)}
      />
    </Drawer>
  );
}
