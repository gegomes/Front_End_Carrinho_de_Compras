// components/ModalComprarProduto.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Stack
} from '@mui/material';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  quantidade_estoque?: number;
  image_url?: string;
  galeria?: string[]; // Array com imagens adicionais
}

interface Props {
  open: boolean;
  produto: Produto | null;
  quantidade: number;
  onClose: () => void;
  onChangeQuantidade: (value: number) => void;
  onConfirm: () => void;
}

export default function ModalComprarProduto({
  open,
  produto,
  quantidade,
  onClose,
  onChangeQuantidade,
  onConfirm
}: Props) {
  const [imagemSelecionada, setImagemSelecionada] = useState<string>('');

  useEffect(() => {
    if (produto) {
      setImagemSelecionada(produto.galeria?.[0] || produto.image_url || '');
    }
  }, [produto]);

  if (!produto) return null;
  const imagens = produto.galeria && produto.galeria.length
    ? produto.galeria
    : [produto.image_url || ''];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle fontWeight="bold">Comprar Produto</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
          {/* Galeria lateral */}
          <Stack spacing={1} sx={{ width: 80 }}>
            {imagens.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={`Imagem ${idx + 1}`}
                onClick={() => setImagemSelecionada(img)}
                sx={{
                  width: '100%',
                  height: 60,
                  objectFit: 'contain',
                  border: imagemSelecionada === img ? '2px solid #1976d2' : '1px solid #ccc',
                  borderRadius: 1,
                  cursor: 'pointer',
                  p: 0.5,
                  bgcolor: '#f9f9f9'
                }}
              />
            ))}
          </Stack>

          {/* Imagem principal e dados */}
          <Box flex={1}>
            <Box
              component="img"
              src={imagemSelecionada || produto.image_url || imagens[0]}
              alt={produto.nome}
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'contain',
                bgcolor: '#f5f5f5',
                mb: 2
              }}
            />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {produto.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {produto.descricao || 'Sem descrição'}
            </Typography>
            <Chip
              label={`Estoque: ${produto.quantidade_estoque ?? 'N/A'}`}
              color="default"
              size="small"
              sx={{ mb: 2 }}
            />
            <Box maxWidth={180}>
              <TextField
                label="Quantidade"
                type="number"
                fullWidth
                value={quantidade}
                onChange={(e) => onChangeQuantidade(Number(e.target.value))}
                inputProps={{
                  min: 1,
                  max: produto.quantidade_estoque ?? 99
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Adicionar ao Carrinho
        </Button>
      </DialogActions>
    </Dialog>
  );
} 