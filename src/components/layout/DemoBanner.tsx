import { Box, Container, Typography } from '@mui/material';

export function DemoBanner() {
  return (
    <Box
      sx={{
        bgcolor: 'error.light',
        borderBottom: (t) => `2px solid ${t.palette.error.dark}`,
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            color: 'error.dark',
          }}
        >
          🔔 Dette er kun en demo
        </Typography>
      </Container>
    </Box>
  );
}
