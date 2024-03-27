import { RatingModel } from './RatingModel'

export interface ProductModel {
  id: number
  image: string
  title: string
  price: number
  description: string
  category: string
  rating: RatingModel

  quantity: number
  oldPrice: number
  color: string
  size: string

  carouselImages?: string[]
  offer?: string
}
