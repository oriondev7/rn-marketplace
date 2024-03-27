import { OrderProductModel } from '.'

export interface OrderModel {
  _id: string
  products: OrderProductModel[]
}
