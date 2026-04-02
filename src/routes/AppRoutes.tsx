import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminPage from '../pages/admin/AdminPage';
import DesignA from '../pages/DesignA';
import DesignB from '../pages/DesignB';
import DesignC from '../pages/DesignC';
import { RequireAdmin } from './RequireAdmin';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/design-a" replace />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        }
      />
      <Route element={<AppShell />}>
        <Route path="design-a" element={<DesignA />} />
        <Route path="design-b" element={<DesignB />} />
        <Route path="design-c" element={<DesignC />} />
      </Route>
      <Route path="*" element={<Navigate to="/design-a" replace />} />
    </Routes>
  );
}
