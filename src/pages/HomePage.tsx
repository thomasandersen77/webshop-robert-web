import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useCallback, useMemo, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { CategoryCard } from '../components/cards/CategoryCard';
import { ProductGridSection } from '../components/sections/ProductGridSection';
import { SearchBar } from '../components/search/SearchBar';
import { useCatalog } from '../context/CatalogContext';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { useShopUi } from '../context/useShopUi';
import { useHashScroll } from '../hooks/useHashScroll';

export default function HomePage() {
  useHashScroll();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { addToCart, cartError } = useShopUi();
  const { token } = useCustomerAuth();
  const { loading, error, refetch, categoryCards, allProducts, ready } = useCatalog();
  const [searchQuery, setSearchQuery] = useState('');

  const goHash = useCallback(
    (id: string) => {
      navigate({ pathname, hash: `#${id}` });
    },
    [navigate, pathname],
  );

  const goCategory = useCallback(
    (href: string) => {
      const h = href.startsWith('#') ? href : `#${href}`;
      navigate({ pathname, hash: h });
    },
    [navigate, pathname],
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q),
    );
  }, [allProducts, searchQuery]);

  const featuredProducts = useMemo(() => filteredProducts.slice(0, 8), [filteredProducts]);

  const newProducts = useMemo(() => {
    const list = filteredProducts.length ? filteredProducts : allProducts;
    return list.slice(Math.max(0, list.length - 4));
  }, [filteredProducts, allProducts]);

  return (
    <Box
      sx={{
        pb: 'calc(16px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {error ? (
        <Box sx={{ px: 2, pt: 2 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => void refetch()}>
                Prøv igjen
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      ) : null}
      {cartError && !token ? (
        <Box sx={{ px: 2, pt: 2 }}>
          <Alert severity="info" action={<Button component={RouterLink} to="/login" size="small">Logg inn</Button>}>
            {cartError}
          </Alert>
        </Box>
      ) : null}

      <Box
        sx={{
          position: 'relative',
          pt: { xs: 2.5, md: 4 },
          pb: { xs: 3, md: 5 },
          overflow: 'hidden',
          background: (t) =>
            `linear-gradient(152deg, ${t.palette.primary.dark} 0%, ${t.palette.primary.main} 48%, #152a3d 100%)`,
          borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: (t) =>
              `radial-gradient(ellipse 80% 60% at 100% 0%, ${alpha(t.palette.common.white, 0.12)} 0%, transparent 55%)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={2.5}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={800}
              sx={{
                color: 'common.white',
                letterSpacing: '-0.03em',
                fontSize: { xs: '1.65rem', sm: '2rem', md: '2.25rem' },
              }}
            >
              Hva ser du etter i dag?
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha('#ffffff', 0.88),
                maxWidth: 520,
                lineHeight: 1.6,
              }}
            >
              Handle raskt blant populære kategorier — store klikkflater, tydelig kontrast og enkel scrolling.
            </Typography>
            <SearchBar size="medium" surface="hero" value={searchQuery} onChange={setSearchQuery} />
            <Stack
              direction="row"
              spacing={1}
              sx={{ overflowX: 'auto', flexWrap: 'nowrap', pb: 0.5, pt: 0.5, mx: -0.25 }}
            >
              {categoryCards.map((c) => (
                <Chip
                  key={c.id}
                  label={c.title}
                  onClick={() => goCategory(c.href)}
                  variant="outlined"
                  sx={{
                    flexShrink: 0,
                    cursor: 'pointer',
                    fontWeight: 600,
                    borderRadius: 2,
                    color: 'common.white',
                    borderColor: alpha('#ffffff', 0.4),
                    bgcolor: alpha('#ffffff', 0.06),
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.14),
                      borderColor: alpha('#ffffff', 0.55),
                    },
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {!ready || loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              bgcolor: 'background.default',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }} id="categories">
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
                <Typography variant="h5" component="h2" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
                  Kategorier
                </Typography>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => goHash('products')}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: 'primary.main',
                  }}
                >
                  Se alle
                  <ChevronRightIcon sx={{ fontSize: 20 }} />
                </Link>
              </Stack>
              {categoryCards.length === 0 ? (
                <Typography color="text.secondary">Ingen kategorier i katalogen ennå.</Typography>
              ) : (
                <Grid container spacing={2}>
                  {categoryCards.map((cat) => (
                    <Grid
                      key={cat.id}
                      id={cat.id}
                      size={{ xs: 12, sm: 6, md: 3 }}
                      sx={{ scrollMarginTop: { xs: 96, md: 104 } }}
                    >
                      <CategoryCard category={cat} imageHeight={168} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>

          <ProductGridSection
            id="products"
            title="Utvalgte produkter"
            subtitle="Data fra API — bilder er placeholders (backend har ikke bilde-URL ennå)."
            products={featuredProducts}
            onAddToCart={(p) => void addToCart(p)}
            onSeeAll={() => goHash('categories')}
            grid="dense"
            sx={{
              bgcolor: 'background.paper',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          />

          <ProductGridSection
            title="Nye produkter"
            subtitle="Siste produkter i listen fra API-et."
            products={newProducts}
            onAddToCart={(p) => void addToCart(p)}
            onSeeAll={() => goHash('products')}
            grid="dense"
            sx={{ bgcolor: 'background.default' }}
          />

          <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                background: (t) =>
                  `linear-gradient(125deg, ${t.palette.primary.dark} 0%, ${t.palette.primary.main} 55%, ${t.palette.primary.light} 140%)`,
                color: 'primary.contrastText',
                border: (t) => `1px solid ${alpha(t.palette.common.white, 0.12)}`,
                boxShadow: '0 16px 48px rgba(22, 48, 73, 0.25)',
              }}
            >
              <Typography variant="subtitle1" fontWeight={800}>
                Tips
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.92, lineHeight: 1.6, maxWidth: 560 }}>
                Logg inn som kunde for å bruke handlekurven. Total og linjer hentes fra serveren.
              </Typography>
            </Paper>
          </Container>
        </>
      )}
    </Box>
  );
}
