
# Loja Tudo Bônus - Frontend do Carrinho de Compras

Este é o frontend da aplicação de carrinho de compras da Loja Tudo Bônus. Desenvolvido com React, Next.js e Material UI, o projeto permite que um usuário:

- Visualize um catálogo de produtos com imagens.
- Adicione itens ao carrinho com quantidade.
- Visualize o carrinho com subtotal e total.
- Finalize a compra com confirmação em modal.
- Veja o histórico de compras com agrupamento por data.

## Funcionalidades

### 1. Catálogo de Produtos
- Produtos são carregados via hook `useProdutos()`
- Cada card possui imagem, nome, preço e botão "Comprar"
- Ao clicar em comprar, abre-se um modal para informar a quantidade

### 2. Carrinho
- Listagem de produtos com imagem, nome, quantidade e subtotal
- Total é calculado com base no subtotal dos itens
- Botão para finalizar compra abre modal de confirmação

### 3. Finalização de Compra
- Envia uma requisição POST para `/carrinho/:userId/finalizar`
- Limpa o carrinho e redireciona para a dashboard

### 4. Histórico de Compras
- Utiliza hook `useHistory(userId)`
- Agrupa por data (Hoje, Este mês, Todas)
- Lista produtos comprados com opções de ver detalhes ou comprar novamente

## Como testar com múltiplos usuários (sem autenticação)

Atualmente, a aplicação não tem sistema de login. Para testar o comportamento com diferentes usuários:

1. **Altere o `userId` manualmente no frontend:**

No topo dos arquivos `pages/cart.tsx`, `pages/index.tsx`, `components/ProductCatalog.tsx` e similares, altere:
```tsx
const userId = 1 // Altere para 2, 3, 4, etc.
```

2. **Abra múltiplas abas com valores diferentes:**
- Clone o projeto e rode em duas portas (ex: 3000 e 3001), alterando o `userId` em cada um
- Isso simula sessões de usuários diferentes

3. **Valide que os dados do carrinho não se misturam entre `user_id`s**
- Cada requisição do frontend vai para rotas com `userId` embutido

### Exemplo de chamada para adicionar item:
```ts
POST /carrinho/1/item
{
  "produto_id": 3,
  "quantidade": 2
}
```

## Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/loja-tudobonus-frontend.git
cd loja-tudobonus-frontend
```

2. Instale as dependências:
```bash
yarn install
# ou npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
yarn dev
# ou npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Estrutura de Pastas
```
/pages
  /index.tsx         -> Catálogo
  /cart.tsx          -> Carrinho
/components
  CartItem.tsx       -> Card de item no carrinho
  ProductCatalog.tsx -> Lista os produtos
/utils
  /hooks.ts          -> Hooks personalizados de produtos, carrinho, compras
  /api.ts            -> Instância Axios
```

## API Backend
Certifique-se de que a API esteja rodando em:
```http
http://localhost:8000
```
Com as rotas:
- `GET /produtos`
- `GET /carrinho/:userId`
- `POST /carrinho/:userId/item`
- `DELETE /carrinho/:userId/item/:id`
- `POST /carrinho/:userId/finalizar`
- `GET /compras/:userId`

---

> Este projeto é uma implementação demonstrativa e pode ser adaptado para uso com autenticação JWT, contexto global de usuário, entre outros aprimoramentos.
