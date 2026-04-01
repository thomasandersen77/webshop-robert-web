import { Box, Container, Typography } from '@mui/material';

export function DemoBanner() {
  return (
    <Box
      sx={{
        bgcolor: 'warning.light',
        borderBottom: (t) => `2px solid ${t.palette.warning.dark}`,
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            color: 'warning.dark',
          }}
        >
          🔔 Dette er kun en demo
        </Typography>
      </Container>
    </Box>
  );
}
