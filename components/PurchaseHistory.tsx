import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Purchase } from '../utils/hooks';

interface Props {
  purchases: Purchase[];
}

export default function PurchaseHistory({ purchases }: Props) {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todas');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Purchase | null>(null);

  const handleOpen = (p: Purchase) => {
    setSelected(p);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const searched = useMemo(
    () =>
      purchases.filter(p =>
        p.itens.some(i => i.produto.toLowerCase().includes(search.toLowerCase()))
      ),
    [search, purchases]
  );

  const dateFiltered = useMemo(() => {
    const now = new Date();
    return searched.filter(p => {
      const d = new Date(p.finalizado_em);
      if (filter === 'Hoje') {
        return d.toLocaleDateString() === now.toLocaleDateString();
      }
      if (filter === 'Este mês') {
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }
      return true;
    });
  }, [filter, searched]);

  const grouped = useMemo(() => {
    return dateFiltered.reduce((acc, p) => {
      const key = new Date(p.finalizado_em).toLocaleDateString('pt-BR');
      if (!acc[key]) acc[key] = [];
      acc[key].push(p);
      return acc;
    }, {} as Record<string, Purchase[]>);
  }, [dateFiltered]);

  if (!purchases.length) {
    return (
      <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Você ainda não finalizou nenhuma compra.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Buscar produtos..."
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />
        <Select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="Todas">Todas</MenuItem>
          <MenuItem value="Hoje">Hoje</MenuItem>
          <MenuItem value="Este mês">Este mês</MenuItem>
        </Select>
      </Box>

      {Object.entries(grouped).map(([date, items]) => (
        <Box key={date} sx={{ mb: 4 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {date} — {items.length} compra(s)
          </Typography>

          {items.map(p => {
            const first = p.itens[0];
            return (
              <Paper
                key={p.id}
                elevation={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Avatar
                  variant="square"
                  src={first.image_url || '/placeholder.png'}
                  alt={first.produto}
                  sx={{ width: 80, height: 80, mr: 2, borderRadius: 2 }}
                />

                <Box sx={{ flex: 1, pr: 2 }}>
                  <Chip label="Entregue" color="success" size="small" sx={{ mb: 0.5 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Chegou no dia{' '}
                    {new Date(p.finalizado_em).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long'
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                  >
                    {first.produto} — R$ {first.preco.toFixed(2)}
                  </Typography>
                  {p.itens.length > 1 && (
                    <Button
                      size="small"
                      variant="text"
                      color="primary"
                      onClick={() => handleOpen(p)}
                      sx={{
                        mt: 0.5,
                        p: 0,
                        fontSize: '0.7rem',
                        textTransform: 'none'
                      }}
                    >
                      Ver todos os itens ({p.itens.length})
                    </Button>
                  )}
                </Box>

                <Box sx={{ textAlign: 'right', minWidth: 160 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ m: 1 }}
                    onClick={() => handleOpen(p)}
                  >
                    Ver compra
                  </Button>
                  <Button variant="outlined" size="small">
                    Comprar novamente
                  </Button>
                </Box>
              </Paper>
            );
          })}
        </Box>
      ))}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Itens da Compra #{selected?.id}</DialogTitle>
        <DialogContent dividers>
          <List>
            {selected?.itens.map(item => (
              <ListItem key={item.id} disableGutters divider>
                {item.image_url && (
                  <Box
                    component="img"
                    src={item.image_url}
                    alt={item.produto}
                    sx={{ width: 60, height: 60, mr: 2, objectFit: 'cover', borderRadius: 1 }}
                  />
                )}
                <ListItemText
                  primary={item.produto}
                  secondary={`Qtd: ${item.quantidade} — R$ ${item.preco.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
