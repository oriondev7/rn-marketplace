import React from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { styles } from './cart.styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { COLORS } from '../../theme/theme'
import Search from '../../assets/icons/magnify.svg'
import Mic from '../../assets/icons/mic_outline.svg'
import Minus from '../../assets/icons/minus_outline.svg'
import Plus from '../../assets/icons/plus_outline.svg'
import Bin from '../../assets/icons/trash_outline.svg'
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../store/slices/CartReducer'
import { ScreenName } from '../../constants'

export const Cart: React.FC = ({ navigation }: any) => {
  const cart = useSelector((state: RootState) => state.cart.products)
  const total = cart
    ?.map((product: any) => product.price * product.quantity)
    ?.reduce((current, previous) => current + previous, 0)

  const dispatch = useDispatch()
  const onRemove = (product: any) => dispatch(removeFromCart(product))
  const onDecrement = (product: any) => dispatch(decrementQuantity(product))
  const onIncrement = (product: any) => dispatch(incrementQuantity(product))

  const showConfirmationScreen = () => navigation.push(ScreenName.confirmation)

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

        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Total: </Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>

        <Text style={styles.emi}>EMI details Available</Text>

        <Pressable
          disabled={!cart?.length}
          onPress={showConfirmationScreen}
          style={styles.proceedButton}
        >
          <Text style={{ color: COLORS.black }}>Proceed to Buy ({cart.length}) items</Text>
        </Pressable>

        <View style={styles.divider} />

        <View style={{ marginHorizontal: 10 }}>
          {cart?.map((product: any, index: number) => (
            <View key={index} style={styles.productContainer}>
              <Pressable 
                style={styles.productSubcontainer}
              >
                <View>
                  <Image
                    source={{ uri: product?.image }}
                    style={styles.image}
                  />
                </View>

                <View>
                  <Text 
                    style={styles.productTitle}
                    numberOfLines={3}
                  >
                    {product?.title}
                  </Text>

                  <Text style={styles.productPrice}>{product?.price}</Text>

                  <Image
                    source={{ uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png' }}
                    style={styles.icon}
                  />

                  <Text style={{ color: COLORS.green}}>In Stock</Text>
                </View>
              </Pressable>

              <View style={styles.buttonsContainer}>
                <View style={styles.buttonsSubcontainer}>
                  
                      {product?.quantity > 1
                        ? <Pressable
                          onPress={() => onDecrement(product)}
                          style={styles.decrementButton}
                          >
                            <Minus width={24} height={24} color={COLORS.black} />
                          </Pressable>
                        : <Pressable
                          onPress={() => onRemove(product)}
                          style={styles.decrementButton}
                          >
                            <Bin width={24} height={24} color={COLORS.black} />
                          </Pressable>
                      }
                  

                  <View style={styles.quantity}>
                    <Text style={{ color: COLORS.black }}>{product?.quantity}</Text>
                  </View>

                  <Pressable
                    onPress={() => onIncrement(product)}
                    style={styles.incrementButton}
                  >
                    <Plus width={24} height={24} color={COLORS.black} />
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => onRemove(product)}
                  style={styles.actionButton}
                >
                  <Text style={{ color: COLORS.black }}>Remove</Text>
                </Pressable>
              </View>

              <View style={styles.actionButtonsContainer}>
                <Pressable style={styles.actionButton}>
                  <Text style={{ color: COLORS.black }}>Save For Later</Text>
                </Pressable>

                <Pressable style={styles.actionButton}>
                  <Text style={{ color: COLORS.black }}>See More Like This</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
