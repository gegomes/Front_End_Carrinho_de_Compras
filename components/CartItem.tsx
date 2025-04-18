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
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          p: 2,
          mb: 2,
          position: 'relative',
        }}
      >
        {/* Imagem do produto */}
        {item.image_url ? (
          <CardMedia
            component="img"
            image={item.image_url}
            alt={item.produto}
            sx={{
              width: { xs: '100%', sm: 120 },
              height: { xs: 180, sm: 120 },
              objectFit: 'contain',
              backgroundColor: '#f4f4f4',
              borderRadius: 1
            }}
          />
        ) : (
          <Box
            sx={{
              width: { xs: '100%', sm: 120 },
              height: { xs: 180, sm: 120 },
              backgroundColor: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              color: '#888',
              borderRadius: 1
            }}
          >
            Sem imagem
          </Box>
        )}

        {/* Conteúdo */}
        <Box sx={{ flex: 1 }}>
          <CardContent sx={{ px: 0, pb: '0 !important' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.produto}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="body2" mt={1}>
              Qtd: <strong>{item.quantidade}</strong>
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="error.main">
              Subtotal: R$ {item.subtotal.toFixed(2)}
            </Typography>
          </CardContent>
        </Box>

        {/* Preço e botão */}
        <Box
          sx={{
            alignSelf: { xs: 'flex-end', sm: 'center' },
            textAlign: 'right',
            mt: { xs: 1, sm: 0 }
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            R$ {item.preco.toFixed(2)}
          </Typography>
          <IconButton color="error" onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        </Box>
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
