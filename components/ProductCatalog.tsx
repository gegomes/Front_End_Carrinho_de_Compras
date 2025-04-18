import React, { useState } from 'react';
import {
  Box, Card, CardContent, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@mui/material';
import { useProdutos, useAdicionarAoCarrinho } from '@/utils/hooks';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  quantidade_estoque?: number;
  image_url?: string;
}

export default function ProductCatalog() {
  const userId = 1;
  const { produtos } = useProdutos();
  const { adicionarItem } = useAdicionarAoCarrinho(userId);

  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  const handleComprar = (produto: Produto) => {
    setSelectedProduto(produto);
    setQuantidade(1);
  };

  const handleConfirmarCompra = async () => {
    if (selectedProduto) {
      await adicionarItem(selectedProduto.id, quantidade);
      setSelectedProduto(null);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        px={2}
        py={4}
        bgcolor="#f5f5f5"
      >
        {produtos.map((produto) => (
          <Card
            key={produto.id}
            sx={{
              width: 220,
              borderRadius: 2,
              boxShadow: 2,
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 },
              backgroundColor: '#fff',
            }}
          >
            {produto.image_url && (
              <Box
                component="img"
                src={produto.image_url}
                alt={produto.nome}
                sx={{
                  width: '100%',
                  height: 180,
                  objectFit: 'contain',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  backgroundColor: '#f6f6f6',
                }}
              />
            )}
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="body1"
                fontWeight="bold"
                gutterBottom
                sx={{ minHeight: 48 }}
              >
                {produto.nome}
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                fontWeight="bold"
                gutterBottom
              >
                R$ {produto.preco.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleComprar(produto)}
                sx={{ mt: 1, textTransform: 'none', borderRadius: 50 }}
              >
                Comprar
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={!!selectedProduto} onClose={() => setSelectedProduto(null)}>
        <DialogTitle>Comprar Produto</DialogTitle>
        <DialogContent dividers>
          {selectedProduto?.image_url && (
            <Box
              component="img"
              src={selectedProduto.image_url}
              alt={selectedProduto.nome}
              sx={{ width: '100%', height: 200, objectFit: 'contain', mb: 2 }}
            />
          )}
          <Typography variant="h6">{selectedProduto?.nome}</Typography>
          <Typography>Descrição: {selectedProduto?.descricao || 'Sem descrição'}</Typography>
          <Typography>Estoque: {selectedProduto?.quantidade_estoque ?? 'N/A'}</Typography>

          <TextField
            label="Quantidade"
            type="number"
            fullWidth
            margin="normal"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            inputProps={{ min: 1, max: selectedProduto?.quantidade_estoque ?? 99 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedProduto(null)} color="inherit">Cancelar</Button>
          <Button onClick={handleConfirmarCompra} variant="contained" color="primary">
            Adicionar ao Carrinho
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
