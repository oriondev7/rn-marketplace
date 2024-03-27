import React, { useState } from 'react'
import { FlatList, ImageBackground, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { styles } from './product_info.styles'
import Search from '../../assets/icons/magnify.svg'
import Mic from '../../assets/icons/mic_outline.svg'
import Share from '../../assets/icons/share.svg'
import Heart from '../../assets/icons/heart-outline.svg'
import Location from '../../assets/icons/location.svg'
import { COLORS } from '../../theme/theme'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/slices/CartReducer'

export const ProductInfo = ({ navigation, route }: any) => {
  const product = route.params
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <Pressable>
              <Search width={22} height={22} color={COLORS.black} />
            </Pressable>

            <TextInput
              placeholder='Search'
            />
          </View>

          <Mic width={24} height={24} color={COLORS.black} />
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={product.carouselImages}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }: any) =>
            <ImageBackground
              style={styles.image}
              source={{ uri: item }}
            >
              <View style={styles.offerContainer}>
                <View style={styles.offerTitleContainer}>
                  <Text style={styles.offerTitle}>{product?.offer}</Text>
                </View>

                <View style={[styles.offerTitleContainer, { backgroundColor: COLORS.lightGray}]}>
                  <Share width={24} height={24} color={COLORS.black} />
                </View>
              </View>

              <View style={[styles.offerTitleContainer, styles.heart]}>
                <Heart width={24} height={24} color={COLORS.black} />
              </View>
            </ImageBackground>
          }
        />

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>
            {product?.title}
          </Text>

          <Text style={styles.price}>
            ${product?.price}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.subinfoContainer}>
          <Text style={styles.subinfoTitle}>
            Color:
          </Text>

          <Text style={styles.subinfoValue}>
            {' ' + product?.color}
          </Text>
        </View>

        <View style={styles.subinfoContainer}>
          <Text style={styles.subinfoTitle}>
            Size:
          </Text>

          <Text style={styles.subinfoValue}>
            {' ' + product?.size}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={{ padding: 10 }}>
          <Text style={styles.total}>
            Total: ${product?.price}
          </Text>

          <Text style={{ color: COLORS.cyan }}>
            FREE delivery Tomorrow by 3 PM. Orer within 10hrs 30 mins
          </Text>

          <View style={styles.locationContainer}>
            <Location width={24} height={24} color={COLORS.black} />

            <Text style={styles.location}>Deliver to Miami, FL</Text>
          </View>
        </View>

        <Text style={styles.inStock}>In Stock</Text>

        <Pressable
          onPress={onAddToCart}
          style={styles.buyButtonContainer}
        >
          <Text style={styles.buyButtonTitle}>
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </Text>
        </Pressable>

        <Pressable style={[styles.buyButtonContainer, { backgroundColor: COLORS.orange}]}>
          <Text style={styles.buyButtonTitle}>Buy Now</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
