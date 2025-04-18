import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Link } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrinho } from '@/utils/hooks';
import NextLink from 'next/link';




export default function Header() {
  const userId = 1;
  const { carrinho } = useCarrinho(userId);
  const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <AppBar position="static" sx={{ bgcolor: '#2962ff' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={NextLink} href="/" sx={{ textDecoration: 'none', color: '#fff' }}>
          Tudo
        </Typography>

        <Box display="flex" alignItems="center" gap={3}>
          <Link
            component={NextLink}
            href="/"
            underline="none"
            sx={{ color: 'orange', fontWeight: 'bold', fontSize: 14 }}
          >
            DASHBOARD
          </Link>

          <Link component={NextLink} href="/cart" underline="none">
            <IconButton color="inherit">
              <Badge badgeContent={quantidadeTotal} color="error">
                <ShoppingCartIcon sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
          </Link>

          <Link
            component={NextLink}
            href="/history"
            underline="none"
            sx={{ color: '#fff', fontSize: 14 }}
          >
            HISTÓRICO
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

