import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button
} from '@mui/material';

interface Props {
  produto: {
    id: number;
    nome: string;
    preco: number;
  };
}

export default function ProductRecommendation({ produto }: Props) {
  return (
    <Card sx={{ width: 160, m: 1, flexShrink: 0 }} variant="outlined">
      <CardMedia
        component="img"
        height="120"
        image="/images/product-placeholder.png"
        alt={produto.nome}
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant="body2" noWrap>
          {produto.nome}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          R$ {produto.preco.toFixed(2)}
        </Typography>
      </CardContent>
      <Button size="small" fullWidth>+</Button>
    </Card>
  );
}
