import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiFetch, apiMutate } from "@/lib/api-client";
import { QK } from "@/constants/query-keys";
import { API } from "@/constants/api-endpoints";
import {
  OrderArraySchema,
  OrderSchema,
  CreateOrderInputSchema,
  UpdateOrderStatusInputSchema,
  type CreateOrderInput,
  type OrderId,
  type OrderStatus,
} from "@/domain.contract";

export function useOrders() {
  return useQuery({
    queryKey: QK.orders.list(),
    queryFn: () => apiFetch(API.ORDERS, OrderArraySchema),
  });
}

export function useOrder(id: OrderId) {
  return useQuery({
    queryKey: QK.orders.detail(id),
    queryFn: () => apiFetch(API.ORDER(id), OrderSchema),
  });
}

export function usePlaceOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateOrderInput) =>
      apiMutate(
        "post",
        API.ORDERS,
        CreateOrderInputSchema.parse(input),
        OrderSchema,
      ),
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: QK.orders.all() }),
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: OrderId; status: OrderStatus }) =>
      apiMutate(
        "patch",
        API.ORDER_STATUS(id),
        UpdateOrderStatusInputSchema.parse({ status }),
        OrderSchema,
      ),
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: QK.orders.all() }),
  });
}
