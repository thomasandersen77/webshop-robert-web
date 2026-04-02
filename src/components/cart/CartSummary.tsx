import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { formatNokFromMinor } from '../../utils/format';

type Props = {
  /** Total fra backend (`total.amountMinor`); `null` hvis tom/ukjent. */
  totalMinor: number | null;
  loading?: boolean;
  onCheckout: () => void;
  onContinue: () => void;
};

export function CartSummary({ totalMinor, loading, onCheckout, onContinue }: Props) {
  return (
    <Box sx={{ mt: 'auto' }}>
      <Divider />
      <Box
        sx={{
          p: 2,
          pb: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: 2 }}
        >
          <Typography color="text.secondary" fontWeight={700}>
            Totalt
          </Typography>
          <Typography variant="h6" fontWeight={800}>
            {totalMinor != null ? formatNokFromMinor(totalMinor) : '—'}
          </Typography>
        </Stack>
        <Stack spacing={1.5}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={onCheckout}
            disabled={loading || totalMinor == null}
          >
            Gå til betaling
          </Button>
          <Button variant="outlined" color="inherit" fullWidth onClick={onContinue}>
            Fortsett å handle
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
