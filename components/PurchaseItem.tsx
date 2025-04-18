import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { CarrinhoItem } from '../utils/hooks';

interface Props { item: CarrinhoItem; }
export default function PurchaseItem({ item }: Props) {
  return (
    <ListItem>
      <ListItemText
        primary={`${item.produto} x${item.quantidade}`}
        secondary={`R$ ${item.preco.toFixed(2)}`} />
    </ListItem>
  );
}