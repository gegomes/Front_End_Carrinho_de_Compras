import React from 'react';
import { Container, Typography } from '@mui/material';

import ProductCatalog from '@/components/ProductCatalog';


export default function Home() {
 

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Produtos
      </Typography>
      <ProductCatalog/>
    </Container>
  );
}
