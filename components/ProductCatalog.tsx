import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography
} from '@mui/material';
import { useProdutos, useAdicionarAoCarrinho } from '@/utils/hooks';
import ModalComprarProduto from '@/components/ModalComprarProduto';
import { useSnackbar } from 'notistack';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  quantidade_estoque?: number;
  image_url?: string;
  galeria?: string[];
}

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ProductCatalog() {
  const userId = 1;
  const { produtos } = useProdutos();
  const { adicionarItem } = useAdicionarAoCarrinho(userId);
  const { enqueueSnackbar } = useSnackbar();

  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  const handleComprar = (produto: Produto) => {
    setSelectedProduto(produto);
    setQuantidade(1);
  };

  const handleConfirmarCompra = async () => {
    if (!selectedProduto || quantidade < 1) {
      enqueueSnackbar('Quantidade inválida', { variant: 'warning' });
      return;
    }

    try {
      await adicionarItem(selectedProduto.id, quantidade);
      enqueueSnackbar('Produto adicionado ao carrinho!', { variant: 'success' });
      setSelectedProduto(null);
    } catch (error: unknown) {
      let mensagem = 'Erro ao adicionar produto ao carrinho';

      const axiosError = error as AxiosErrorResponse;
      if (axiosError.response?.data?.message) {
        mensagem = axiosError.response.data.message;
      }

      enqueueSnackbar(mensagem, { variant: 'error' });
      console.error(error);
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
              width: 240,
              borderRadius: 3,
              boxShadow: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: 4
              },
              backgroundColor: '#fff'
            }}
          >
            {produto.image_url && (
              <Box
                component="img"
                src={produto.image_url}
                alt={produto.nome}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'contain',
                  bgcolor: '#f6f6f6',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  p: 1
                }}
              />
            )}

            <CardContent sx={{ px: 2.5, py: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ minHeight: 48 }}
                gutterBottom
              >
                {produto.nome}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="success.main"
              >
                R$ {produto.preco.toFixed(2)}
              </Typography>
              <Typography
                variant="caption"
                color="success.main"
                display="block"
                mb={1}
              >
                Frete grátis
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleComprar(produto)}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  fontWeight: 'bold',
                  py: 1
                }}
              >
                Comprar
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <ModalComprarProduto
        open={!!selectedProduto}
        produto={selectedProduto}
        quantidade={quantidade}
        onClose={() => setSelectedProduto(null)}
        onChangeQuantidade={(val) => setQuantidade(Math.max(1, val))}
        onConfirm={handleConfirmarCompra}
      />
    </>
  );
}