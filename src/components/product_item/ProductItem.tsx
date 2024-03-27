import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { styles } from './product_item.styles'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/slices/CartReducer'
import { COLORS } from '../../theme/theme'
import { ProductItemProps } from './product_item.types'

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false)
  const dispatch = useDispatch()

  const onAddToCart = () => {
    dispatch(addToCart(product))

    if (!isInCart) {
      setIsInCart(true)

      setTimeout(() => {
        setIsInCart(false)
      }, 60000)
    }
  }

  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: product?.image }} style={styles.image} />

      <Text style={styles.title} numberOfLines={1}>
        {product?.title}
      </Text>

      <View style={styles.itemInfo}>
        <Text style={styles.price}>${product?.price}</Text>
        <Text style={styles.rate}>{product?.rating?.rate} ratings</Text>
      </View>

      <Pressable style={styles.addToCartButton} onPress={onAddToCart}>
        <Text style={{ color: COLORS.black }}>
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </Text>
      </Pressable>
    </Pressable>
  )
}
