import React from 'react';
import { Container, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import ProductCatalog from '@/components/ProductCatalog';
import { useAdicionarAoCarrinho } from '@/utils/hooks';

export default function Home() {
  const userId = 1; // Pode ser dinâmico
  const { adicionarItem } = useAdicionarAoCarrinho(userId);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = async (
    produto: { id: number; nome: string; preco: number },
    quantidade: number
  ) => {
    try {
      await adicionarItem(produto.id, quantidade);
      enqueueSnackbar('Produto adicionado ao carrinho!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao adicionar o produto', { variant: 'error' });
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Produtos
      </Typography>
      <ProductCatalog/>
    </Container>
  );
}
