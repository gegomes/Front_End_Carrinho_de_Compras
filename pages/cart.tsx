import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrinho, useFinalizarCompra } from '../utils/hooks';
import CartItem from '../components/CartItem';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function CartPage() {
  const userId = 1;
  const router = useRouter();

  const { carrinho, removerItem } = useCarrinho(userId);
  const { finalizarCompra } = useFinalizarCompra(userId);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const total = useMemo(
    () => carrinho.reduce((sum, item) => sum + item.subtotal, 0),
    [carrinho]
  );

  const handleCheckout = () => setConfirmOpen(true);

  const confirmarFinalizacao = async () => {
    try {
      await finalizarCompra();
      setConfirmOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Compra finalizada com sucesso!',
        confirmButtonText: 'Voltar ao Dashboard'
      }).then(() => router.push('/'));
    } catch (err) {
      console.error(err);
      Swal.fire('Erro', 'Ocorreu um erro ao finalizar a compra.', 'error');
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meu Carrinho
      </Typography>

      {/* Carrinho + Resumo */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}
      >
        {/* Lista de Itens do Carrinho */}
        <Box sx={{ flex: 1 }}>
          <Card variant="outlined">
            <CardHeader
              title="Produtos Loja Tudo Bonus"
              action={<FormControlLabel control={<Checkbox defaultChecked />} label="" />}
              sx={{ bgcolor: 'background.paper', px: 2, py: 1 }}
            />
            <Divider />
            <CardContent sx={{ p: 2 }}>
              {carrinho.length ? (
                carrinho.map(item => (
                  <CartItem key={item.id} item={item} onRemove={removerItem} />
                ))
              ) : (
                <Typography color="text.secondary">Seu carrinho está vazio.</Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Resumo da Compra */}
        <Box
          sx={{
            width: { xs: '100%', md: 320 }
          }}
        >
          <Card variant="outlined">
            <CardHeader title="Resumo da compra" sx={{ bgcolor: 'background.paper', px: 2, py: 1 }} />
            <Divider />
            <CardContent sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Produtos</Typography>
                <Typography>R$ {total.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Frete</Typography>
                <Typography color="success.main">Grátis</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">R$ {total.toFixed(2)}</Typography>
              </Box>

              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                sx={{
                  borderRadius: '50px',
                  textTransform: 'none',
                  py: 1,
                  fontWeight: 'bold'
                }}
                onClick={handleCheckout}
              >
                Comprar
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Recomendações (Placeholder) */}
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Recomendações para você
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            textAlign: 'center',
            bgcolor: 'background.paper',
            fontStyle: 'italic'
          }}
        >
          Em desenvolvimento… 🚧
        </Paper>
      </Box>

      {/* Modal de Confirmação */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Finalizar Compra</DialogTitle>
        <DialogContent>
          <Typography>Você confirma a finalização da compra?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={confirmarFinalizacao} color="success">
            Finalizar Compra
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
