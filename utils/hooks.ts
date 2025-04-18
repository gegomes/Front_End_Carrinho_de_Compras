// utils/hooks.ts
import useSWR from 'swr';
import { api } from './api';

export interface CarrinhoItem {
  id: number;
  user_id: number;
  produto: string;
  quantidade: number;
  preco: number;
  image_url?: string;
  subtotal: number;
}

export interface Purchase {
  id: number;
  user_id: number;
  total: number;
  finalizado_em: string;
  itens: CarrinhoItem[];
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  quantidade_estoque?: number;
  image_url?: string;
}

const fetcher = <T>(url: string) =>
  api.get<T>(url).then(res => res.data);

/** Hook para pegar o carrinho de um user */
export function useCarrinho(userId: number) {
  const key = userId ? `/carrinho/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR<CarrinhoItem[]>(key, fetcher);

  const removerItem = async (itemId: number) => {
    await api.delete(`/carrinho/${userId}/item/${itemId}`);
    await mutate();
  };

  return {
    carrinho: data || [],
    isLoading,
    error,
    mutate,
    removerItem, // ✅ agora está incluído no retorno
  };
}

/** Hook para pegar o histórico de compras de um user */
export function useHistory(userId: number) {
  const key = userId ? `/compras/${userId}` : null;
  const { data, error, isLoading } = useSWR<Purchase[]>(key, fetcher);
  return { history: data || [], isLoading, error };
}

/** Hook para pegar a lista de produtos */
export function useProdutos() {
  const { data, error, isLoading } = useSWR<Produto[]>('/produtos', fetcher);
  return {
    produtos: data || [],
    isLoading,
    error,
  };
}

/** Hook para adicionar item ao carrinho */
export function useAdicionarAoCarrinho(userId: number) {
  const { mutate } = useCarrinho(userId);

  const adicionarItem = async (produtoId: number, quantidade = 1) => {
    await api.post(`/carrinho/${userId}/item`, {
      produto_id: produtoId,
      quantidade,
    });

    await mutate(); // Atualiza os dados do carrinho
  };

  return { adicionarItem };
}

/** Hook para finalizar a compra */
export function useFinalizarCompra(userId: number) {
  const { mutate } = useCarrinho(userId);

  const finalizarCompra = async () => {
    await api.post(`/carrinho/${userId}/finalizar`);
    await mutate(); // Atualiza o carrinho após finalizar
  };

  return { finalizarCompra };
}
