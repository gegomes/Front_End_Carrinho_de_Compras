import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
} from '@mui/material';

interface Props {
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ total, onCheckout }: Props) {
    console.log(total)
  return (
    <Card variant="outlined" sx={{ position: 'sticky', top: 16 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Resumo da compra
        </Typography>
        <Divider sx={{ my: 1 }} />
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
          <Typography variant="subtitle1" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            R$ {total.toFixed(2)}
          </Typography>
        </Box>
        <Button variant="contained" fullWidth onClick={onCheckout}>
          Continuar a compra
        </Button>
      </CardContent>
    </Card>
  );
}
