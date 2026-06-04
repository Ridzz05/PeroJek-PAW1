// MASTER DATA UI PRREVIEW

import React, { useEffect, useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ConfirmDialog from '../components/ConfirmDialog';
import { useLanguage } from '../i18n/i18n';

const emptyForms = {
  categories: { id: null, name: '', slug: '', icon: 'DirectionsCar' },
  vehicles: {
    id: null,
    category_id: '',
    brand: '',
    model: '',
    license_plate: '',
    daily_rate: '',
    status: 'Available',
    image_url: '',
  },
  customers: { id: null, name: '', phone: '', identity_number: '', address: '' },
};

const tabs = [
  { key: 'categories', labelKey: 'master_data.categories' },
  { key: 'vehicles', labelKey: 'master_data.vehicles' },
  { key: 'customers', labelKey: 'master_data.customers' },
];

const csrfToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

const slugify = (value) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

export default function MasterData() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialog, setDialog] = useState({ open: false, entity: 'categories', mode: 'create' });
  const [form, setForm] = useState(emptyForms.categories);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, entity: null, item: null });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const currencyFormatter = useMemo(() => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }), []);

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    setLoading(true);
    try {
      const [categoryRes, vehicleRes, customerRes] = await Promise.all([
        fetch('/api/categories', { headers: { Accept: 'application/json' } }),
        fetch('/api/vehicles', { headers: { Accept: 'application/json' } }),
        fetch('/api/customers', { headers: { Accept: 'application/json' } }),
      ]);

      if (!categoryRes.ok || !vehicleRes.ok || !customerRes.ok) {
        throw new Error('Failed to load master data');
      }

      const [categoryData, vehicleData, customerData] = await Promise.all([
        categoryRes.json(),
        vehicleRes.json(),
        customerRes.json(),
      ]);

      setCategories(Array.isArray(categoryData) ? categoryData : []);
      setVehicles(Array.isArray(vehicleData) ? vehicleData : []);
      setCustomers(Array.isArray(customerData) ? customerData : []);
    } catch (err) {
      console.error(err);
      showToast(t('master_data.toast_load_failed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const currentRows = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const rows = { categories, vehicles, customers }[activeTab] || [];

    if (!query) {
      return rows;
    }

    return rows.filter((item) => {
      if (activeTab === 'categories') {
        return [item.name, item.slug, item.icon].some((value) => String(value || '').toLowerCase().includes(query));
      }

      if (activeTab === 'vehicles') {
        return [item.brand, item.model, item.license_plate, item.status, item.category?.name]
          .some((value) => String(value || '').toLowerCase().includes(query));
      }

      return [item.name, item.phone, item.identity_number, item.address]
        .some((value) => String(value || '').toLowerCase().includes(query));
    });
  }, [activeTab, categories, customers, searchQuery, vehicles]);

  const openCreateDialog = () => {
    setForm(emptyForms[activeTab]);
    setDialog({ open: true, entity: activeTab, mode: 'create' });
  };

  const openEditDialog = (entity, item) => {
    if (entity === 'vehicles') {
      setForm({
        id: item.id,
        category_id: item.category_id || '',
        brand: item.brand || '',
        model: item.model || '',
        license_plate: item.license_plate || '',
        daily_rate: item.daily_rate || '',
        status: item.status || 'Available',
        image_url: item.image_url || '',
      });
    } else if (entity === 'customers') {
      setForm({
        id: item.id,
        name: item.name || '',
        phone: item.phone || '',
        identity_number: item.identity_number || '',
        address: item.address || '',
      });
    } else {
      setForm({
        id: item.id,
        name: item.name || '',
        slug: item.slug || '',
        icon: item.icon || 'DirectionsCar',
      });
    }

    setDialog({ open: true, entity, mode: 'edit' });
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => {
      if (dialog.entity === 'categories' && field === 'name' && dialog.mode === 'create') {
        return { ...prev, name: value, slug: slugify(value) };
      }

      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const entity = dialog.entity;
    const isEdit = dialog.mode === 'edit';
    const url = isEdit ? `/api/${entity}/${form.id}` : `/api/${entity}`;
    const payload = { ...form };
    delete payload.id;

    try {
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-TOKEN': csrfToken(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || t('master_data.toast_save_failed'));
      }

      showToast(isEdit ? t('master_data.toast_update_success') : t('master_data.toast_create_success'));
      setDialog({ open: false, entity, mode: 'create' });
      await fetchMasterData();
    } catch (err) {
      console.error(err);
      showToast(err.message || t('master_data.toast_save_failed'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    const { entity, item } = deleteConfirm;
    setDeleteConfirm({ open: false, entity: null, item: null });

    try {
      const response = await fetch(`/api/${entity}/${item.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'X-CSRF-TOKEN': csrfToken(),
        },
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || t('master_data.toast_delete_failed'));
      }

      showToast(t('master_data.toast_delete_success'));
      await fetchMasterData();
    } catch (err) {
      console.error(err);
      showToast(err.message || t('master_data.toast_delete_failed'), 'error');
    }
  };

  const renderActions = (entity, item) => (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Tooltip title={t('common.edit')}>
        <IconButton size="small" onClick={() => openEditDialog(entity, item)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('common.delete')}>
        <span>
          <IconButton
            size="small"
            color="error"
            disabled={entity === 'categories' && Number(item.vehicles_count || 0) > 0}
            onClick={() => setDeleteConfirm({ open: true, entity, item })}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );

  const renderTable = () => {
    if (activeTab === 'categories') {
      return (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('master_data.name')}</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell align="right">{t('master_data.vehicle_count')}</TableCell>
              <TableCell align="right">{t('common.edit')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((category) => (
              <TableRow key={category.id} hover>
                <TableCell sx={{ fontWeight: 700 }}>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.icon}</TableCell>
                <TableCell align="right">{category.vehicles_count || 0}</TableCell>
                <TableCell align="right">{renderActions('categories', category)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    if (activeTab === 'vehicles') {
      return (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('fleet.license_plate')}</TableCell>
              <TableCell>{t('master_data.vehicle')}</TableCell>
              <TableCell>{t('fleet.category')}</TableCell>
              <TableCell align="right">{t('fleet.daily_rate')}</TableCell>
              <TableCell>{t('rentals.status')}</TableCell>
              <TableCell align="right">{t('common.edit')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((vehicle) => (
              <TableRow key={vehicle.id} hover>
                <TableCell sx={{ fontWeight: 700 }}>{vehicle.license_plate}</TableCell>
                <TableCell>{vehicle.brand} {vehicle.model}</TableCell>
                <TableCell>{vehicle.category?.name || '-'}</TableCell>
                <TableCell align="right">{currencyFormatter.format(vehicle.daily_rate || 0)}</TableCell>
                <TableCell>
                  <Chip label={vehicle.status} size="small" color={vehicle.status === 'Available' ? 'success' : vehicle.status === 'Rented' ? 'info' : 'warning'} />
                </TableCell>
                <TableCell align="right">{renderActions('vehicles', vehicle)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('customers.full_name')}</TableCell>
            <TableCell>{t('customers.phone_number')}</TableCell>
            <TableCell>{t('customers.sim_number')}</TableCell>
            <TableCell>{t('customers.full_address')}</TableCell>
            <TableCell align="right">{t('common.edit')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((customer) => (
            <TableRow key={customer.id} hover>
              <TableCell sx={{ fontWeight: 700 }}>{customer.name}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.identity_number}</TableCell>
              <TableCell>{customer.address || '-'}</TableCell>
              <TableCell align="right">{renderActions('customers', customer)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderForm = () => {
    if (dialog.entity === 'categories') {
      return (
        <Stack spacing={2.5}>
          <TextField label={t('master_data.name')} value={form.name} onChange={(e) => handleFieldChange('name', e.target.value)} required fullWidth />
          <TextField label="Slug" value={form.slug} onChange={(e) => handleFieldChange('slug', slugify(e.target.value))} required fullWidth />
          <TextField label="MUI Icon" value={form.icon} onChange={(e) => handleFieldChange('icon', e.target.value)} required fullWidth />
        </Stack>
      );
    }

    if (dialog.entity === 'vehicles') {
      return (
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label={t('fleet.brand')} value={form.brand} onChange={(e) => handleFieldChange('brand', e.target.value)} required fullWidth />
            <TextField label={t('fleet.model')} value={form.model} onChange={(e) => handleFieldChange('model', e.target.value)} required fullWidth />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label={t('fleet.license_plate')} value={form.license_plate} onChange={(e) => handleFieldChange('license_plate', e.target.value)} required fullWidth />
            <TextField label={t('fleet.rate_idr')} type="number" value={form.daily_rate} onChange={(e) => handleFieldChange('daily_rate', e.target.value)} required fullWidth />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField select label={t('fleet.category')} value={form.category_id} onChange={(e) => handleFieldChange('category_id', e.target.value)} required fullWidth>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </TextField>
            <TextField select label={t('rentals.status')} value={form.status} onChange={(e) => handleFieldChange('status', e.target.value)} required fullWidth>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Rented">Rented</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </TextField>
          </Stack>
          <TextField label={t('fleet.image_url')} value={form.image_url} onChange={(e) => handleFieldChange('image_url', e.target.value)} fullWidth />
        </Stack>
      );
    }

    return (
      <Stack spacing={2.5}>
        <TextField label={t('customers.full_name')} value={form.name} onChange={(e) => handleFieldChange('name', e.target.value)} required fullWidth />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label={t('customers.phone_number')} value={form.phone} onChange={(e) => handleFieldChange('phone', e.target.value)} required fullWidth />
          <TextField label={t('customers.sim_number')} value={form.identity_number} onChange={(e) => handleFieldChange('identity_number', e.target.value)} required fullWidth />
        </Stack>
        <TextField label={t('customers.residential_address')} value={form.address} onChange={(e) => handleFieldChange('address', e.target.value)} multiline minRows={3} fullWidth />
      </Stack>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
        <CircularProgress size={56} thickness={4} />
      </Box>
    );
  }

  const activeLabel = t(tabs.find((tab) => tab.key === activeTab)?.labelKey || 'menu.master_data');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-end', sm: 'space-between' }, alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography variant="h5" sx={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 800 }}>
            {t('menu.master_data')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('master_data.subtitle')}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateDialog} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          {t('master_data.add')} {activeLabel}
        </Button>
      </Box>

      <Card>
        <Box sx={{ px: 2.5, pt: 2 }}>
          <Tabs value={activeTab} onChange={(_, value) => { setActiveTab(value); setSearchQuery(''); }} variant="scrollable" scrollButtons="auto">
            {tabs.map((tab) => <Tab key={tab.key} value={tab.key} label={t(tab.labelKey)} />)}
          </Tabs>
        </Box>
        <Divider />
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder={t('master_data.search_placeholder')}
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: 360 } }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {currentRows.length} {t('master_data.records')}
          </Typography>
        </Box>
        <Divider />
        <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          {currentRows.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 700 }}>
                {t('master_data.no_records')}
              </Typography>
            </Box>
          ) : renderTable()}
        </TableContainer>
      </Card>

      <Dialog open={dialog.open} onClose={() => setDialog({ ...dialog, open: false })} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 700 }}>
          {dialog.mode === 'edit' ? t('master_data.edit_title') : t('master_data.create_title')} {t(tabs.find((tab) => tab.key === dialog.entity)?.labelKey || 'menu.master_data')}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 1 }}>{renderForm()}</DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button color="inherit" onClick={() => setDialog({ ...dialog, open: false })}>{t('common.cancel')}</Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? t('master_data.saving') : t('common.save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmDialog
        open={deleteConfirm.open}
        title={t('common.confirm')}
        message={t('master_data.confirm_delete')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ open: false, entity: null, item: null })}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        severity="error"
      />

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
