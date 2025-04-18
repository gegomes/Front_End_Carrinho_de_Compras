import React, { useState } from 'react';
import {
  Card, CardContent, Typography, IconButton, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, CardMedia
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  item: {
    id: number;
    produto: string;
    quantidade: number;
    preco: number;
    image_url?: string;
    subtotal: number;
  };
  onRemove: (id: number) => void;
}

export default function CartItem({ item, onRemove }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpen = () => setConfirmOpen(true);
  const handleClose = () => setConfirmOpen(false);
  const handleConfirm = () => {
    onRemove(item.id);
    handleClose();
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          p: 2,
          mb: 2,
        }}
      >
        {item.image_url ? (
          <CardMedia
            component="img"
            image={item.image_url}
            alt={item.produto}
            sx={{ width: 120, height: 120, objectFit: 'contain', backgroundColor: '#f4f4f4' }}
          />
        ) : (
          <Box
            sx={{
              width: 120,
              height: 120,
              backgroundColor: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              color: '#888',
            }}
          >
            Sem imagem
          </Box>
        )}

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">{item.produto}</Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="body2">Qtd: <strong>{item.quantidade}</strong></Typography>
          <Typography variant="body2" fontWeight="bold">
            Subtotal: R$ {item.subtotal.toFixed(2)}
          </Typography>
        </CardContent>

        <Typography
          variant="h6"
          sx={{ position: 'absolute', top: 16, right: 50 }}
        >
          R$ {item.preco.toFixed(2)}
        </Typography>

        <IconButton
          color="error"
          onClick={handleOpen}
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
        >
          <DeleteIcon />
        </IconButton>
      </Card>

      {/* Modal de confirmação */}
      <Dialog open={confirmOpen} onClose={handleClose}>
        <DialogTitle>Remover produto</DialogTitle>
        <DialogContent>
          <Typography>
            Deseja remover <strong>{item.produto}</strong> do carrinho?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
