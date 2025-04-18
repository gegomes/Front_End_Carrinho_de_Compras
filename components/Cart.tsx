import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { CarrinhoItem } from '../utils/hooks';

interface Props {
  items: CarrinhoItem[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onFinalize: () => void;
}

export default function Cart({ items, onRemove, onClear, onFinalize }: Props) {
  const total = items.reduce((acc, item) => acc + item.subtotal, 0);

  if (items.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }} elevation={1}>
        <Box mb={2}>
          <DeleteIcon sx={{ fontSize: 60, color: 'divider' }} />
        </Box>
        <Typography variant="h6" gutterBottom>
          Seu carrinho está vazio
        </Typography>
        <Typography color="text.secondary">
          Adicione produtos para começar sua compra!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }} elevation={1}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Itens no Carrinho</Typography>
        <Box>
          <IconButton onClick={onClear} color="secondary" sx={{ mr: 1 }}>
            <DeleteIcon />
          </IconButton>
          <Typography
            component="span"
            variant="button"
            color="secondary"
            sx={{ cursor: 'pointer' }}
            onClick={onFinalize}
          >
            Finalizar Compra
          </Typography>
        </Box>
      </Box>

      <Table>
        <TableHead sx={{ backgroundColor: 'divider' }}>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell align="center">Qtd.</TableCell>
            <TableCell align="right">Preço</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="center">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            const subtotal = item.preco * item.quantidade;

            return (
              <TableRow key={item.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {item.image_url && (
                      <Box
                        component="img"
                        src={item.image_url}
                        alt={item.produto}
                        sx={{
                          width: 50,
                          height: 50,
                          objectFit: 'cover',
                          borderRadius: 1,
                          mr: 2,
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/50';
                        }}
                      />
                    )}
                    <Typography variant="subtitle1">{item.produto}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{item.quantidade}</TableCell>
                <TableCell align="right">R$ {item.preco.toFixed(2)}</TableCell>
                <TableCell align="right">R$ {subtotal.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onRemove(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                Total:
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold">
               aqui  R$ {total.toFixed(2)}
              </Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}
