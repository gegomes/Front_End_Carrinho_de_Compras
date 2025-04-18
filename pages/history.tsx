import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useHistory } from '../utils/hooks';
import PurchaseHistory from '../components/PurchaseHistory';

export default function HistoryPage() {
  const [userId] = useState(1);
  const { history, isLoading, error } = useHistory(userId);

  if (isLoading) return <Typography>Carregando histórico…</Typography>;
  if (error)     return <Typography color="error">Erro ao carregar histórico.</Typography>;
  if (!history.length) return <Typography>Nenhuma compra finalizada.</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">Histórico de Compras</Typography>
      <PurchaseHistory purchases={history} />
    </Container>
  );
}