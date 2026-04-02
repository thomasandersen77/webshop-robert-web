import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ProductItem } from '../../types/shop';
import { ProductCard } from '../cards/ProductCard';

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  products: ProductItem[];
  onAddToCart: (product: ProductItem) => void;
  onSeeAll?: () => void;
  seeAllLabel?: string;
  /** Grid sizing: default editorial / app */
  grid?: 'default' | 'dense';
  sx?: SxProps<Theme>;
};

export function ProductGridSection({
  id,
  title,
  subtitle,
  products,
  onAddToCart,
  onSeeAll,
  seeAllLabel = 'Se alle',
  grid = 'default',
  sx,
}: Props) {
  const size =
    grid === 'dense' ? { xs: 6, sm: 4, md: 3 } : { xs: 12, sm: 6, lg: 3 };

  return (
    <Box id={id} sx={sx}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h4" component="h2" fontWeight={700}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5, maxWidth: 560 }}>
                {subtitle}
              </Typography>
            ) : null}
          </Box>
          {onSeeAll ? (
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={onSeeAll}
              sx={{
                cursor: 'pointer',
                fontWeight: 700,
                color: 'primary.main',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                flexShrink: 0,
              }}
            >
              {seeAllLabel}
              <ChevronRightIcon fontSize="small" />
            </Link>
          ) : null}
        </Stack>
        {products.length === 0 ? (
          <Typography color="text.secondary" variant="body2">
            Ingen produkter å vise.
          </Typography>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {products.map((p) => (
              <Grid key={p.id} size={size}>
                <ProductCard product={p} onAddToCart={onAddToCart} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
