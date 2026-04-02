import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as adminApi from '../../api/adminApi';
import { ApiError } from '../../api/http';
import { useAuth } from '../../context/AuthContext';
import type { ProductCategoryResponse, ProductResponse } from '../../types/admin';
import { AdminGateTitle } from '../../routes/RequireAdmin';

export default function AdminPage() {
  const { token, logout, user } = useAuth();
  const [categories, setCategories] = useState<ProductCategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const [categoryName, setCategoryName] = useState('');
  const [catBusy, setCatBusy] = useState(false);
  const [catMsg, setCatMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [productCategoryId, setProductCategoryId] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [priceMinor, setPriceMinor] = useState('');
  const [ratingStars, setRatingStars] = useState('5');
  const [prodBusy, setProdBusy] = useState(false);
  const [prodMsg, setProdMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submitCategory = useCallback(async () => {
    if (!token) return;
    setCatMsg(null);
    setCatBusy(true);
    try {
      const created = await adminApi.createProductCategory(token, { name: categoryName });
      setCategories((prev) => [...prev, created]);
      setProductCategoryId((prev) => prev || created.id);
      setCategoryName('');
      setCatMsg({ ok: true, text: `Kategori opprettet: ${created.name} (${created.id})` });
    } catch (e) {
      const text = e instanceof ApiError ? e.message : 'Kunne ikke opprette kategori.';
      setCatMsg({ ok: false, text });
    } finally {
      setCatBusy(false);
    }
  }, [token, categoryName]);

  const submitProduct = useCallback(async () => {
    if (!token) return;
    setProdMsg(null);
    const price = Number.parseInt(priceMinor, 10);
    const rating = Number.parseInt(ratingStars, 10);
    if (!productCategoryId.trim()) {
      setProdMsg({ ok: false, text: 'Velg eller lim inn kategori-ID.' });
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setProdMsg({ ok: false, text: 'Pris (minor) må være et heltall ≥ 0.' });
      return;
    }
    if (Number.isNaN(rating) || rating < 1 || rating > 5) {
      setProdMsg({ ok: false, text: 'Vurdering må være 1–5.' });
      return;
    }
    setProdBusy(true);
    try {
      const created = await adminApi.createProduct(token, {
        categoryId: productCategoryId.trim(),
        name: productName,
        description: productDescription,
        priceMinor: price,
        ratingStars: rating,
      });
      setProducts((prev) => [...prev, created]);
      setProductName('');
      setProductDescription('');
      setPriceMinor('');
      setRatingStars('5');
      setProdMsg({ ok: true, text: `Produkt opprettet: ${created.name} (${created.id})` });
    } catch (e) {
      const text = e instanceof ApiError ? e.message : 'Kunne ikke opprette produkt.';
      setProdMsg({ ok: false, text });
    } finally {
      setProdBusy(false);
    }
  }, [token, productCategoryId, productName, productDescription, priceMinor, ratingStars]);

  return (
    <Box minHeight="100dvh" bgcolor="background.default" py={4}>
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2} mb={3}>
          <Box>
            <AdminGateTitle />
            <Typography variant="body2" color="text.secondary">
              Innlogget som {user?.email}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button component={RouterLink} to="/design-a" variant="outlined">
              Til butikk
            </Button>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logg ut
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={3}>
          <Card>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Ny produktkategori
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Tilsvarer <code>POST /api/admin/product-categories</code> med kropp{' '}
                <code>{`{ "name": "…" }`}</code>.
              </Typography>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'flex-start' }}>
                <TextField
                  label="Kategorinavn"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  fullWidth
                  required
                />
                <Button variant="contained" onClick={() => void submitCategory()} disabled={catBusy || !categoryName.trim()} sx={{ flexShrink: 0 }}>
                  {catBusy ? 'Oppretter…' : 'Opprett kategori'}
                </Button>
              </Stack>
              {catMsg ? (
                <Alert severity={catMsg.ok ? 'success' : 'error'} sx={{ mt: 2 }}>
                  {catMsg.text}
                </Alert>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Nytt produkt
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Tilsvarer <code>POST /api/admin/products</code>. Kategori må finnes i API-et (bruk en du nettopp
                opprettet, eller lim inn eksisterende ID).
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="admin-cat-label">Kategori</InputLabel>
                  <Select
                    labelId="admin-cat-label"
                    label="Kategori"
                    value={categories.some((c) => c.id === productCategoryId) ? productCategoryId : ''}
                    onChange={(e) => setProductCategoryId(e.target.value as string)}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Velg opprettet kategori…</em>
                    </MenuItem>
                    {categories.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name} ({c.id.slice(0, 8)}…)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Kategori-ID (manuelt)"
                  helperText="Hvis kategorien finnes fra før, lim inn full UUID her."
                  value={
                    categories.some((c) => c.id === productCategoryId) ? '' : productCategoryId
                  }
                  onChange={(e) => setProductCategoryId(e.target.value)}
                  fullWidth
                />
                <TextField label="Produktnavn" value={productName} onChange={(e) => setProductName(e.target.value)} required fullWidth />
                <TextField
                  label="Beskrivelse"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label="Pris (minor units, f.eks. øre)"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={priceMinor}
                  onChange={(e) => setPriceMinor(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Vurdering (stjerner)"
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                  value={ratingStars}
                  onChange={(e) => setRatingStars(e.target.value)}
                  required
                  fullWidth
                />
                <Button variant="contained" onClick={() => void submitProduct()} disabled={prodBusy}>
                  {prodBusy ? 'Oppretter…' : 'Opprett produkt'}
                </Button>
                {prodMsg ? (
                  <Alert severity={prodMsg.ok ? 'success' : 'error'}>{prodMsg.text}</Alert>
                ) : null}
              </Stack>
            </CardContent>
          </Card>

          {(categories.length > 0 || products.length > 0) && (
            <Card>
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Opprettet i denne økten
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  API-et eksponerer foreløpig ikke liste-endepunkter; her vises bare det du har opprettet siden
                  siden ble lastet.
                </Typography>
                {categories.length > 0 ? (
                  <>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      Kategorier
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, my: 0.5 }}>
                      {categories.map((c) => (
                        <li key={c.id}>
                          <Typography variant="body2">
                            {c.name} — <code>{c.id}</code>
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </>
                ) : null}
                {categories.length > 0 && products.length > 0 ? <Divider sx={{ my: 2 }} /> : null}
                {products.length > 0 ? (
                  <>
                    <Typography variant="subtitle2">Produkter</Typography>
                    <Box component="ul" sx={{ pl: 2, my: 0.5 }}>
                      {products.map((p) => (
                        <li key={p.id}>
                          <Typography variant="body2">
                            {p.name} — {p.priceMinor} minor — {p.ratingStars}★ — <code>{p.id}</code>
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </>
                ) : null}
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
