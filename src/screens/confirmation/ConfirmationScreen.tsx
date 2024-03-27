import React, { useContext, useEffect, useState } from 'react'
import { Alert, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { styles } from './confirmation.styles'
import { COLORS } from '../../theme/theme'
import axios from 'axios'
import Location from '../../assets/icons/location.svg'
import Right from '../../assets/icons/chevron_forward.svg'
import { UserContext } from '../../UserContext'
import { PaymentMethod, ScreenName } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { clearCart } from '../../store/slices/CartReducer'

export const ConfirmationScreen: React.FC = ({ navigation }: any) => {
  const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Delivery', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState<any>()
  const [deliveryOption, setDeliveryOption] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.none)
  const { userId } = useContext(UserContext)

  const cart = useSelector((state: RootState) => state.cart.products)
  const total = cart
    ?.map(product => product.price * product.quantity)
    .reduce((current, previous) => current + previous, 0)

  const dispatch = useDispatch()
  const onPlaceOrder = async () => {
    setCurrentStep(4)

    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: paymentMethod,
      }

      const response = await axios.post('http://localhost:8000/orders', orderData)

      if (response.status === 200) {
        navigation.navigate(ScreenName.order)

        dispatch(clearCart())
        console.log('The ordered created successfully', response.data)
      } else {
        console.log('An error occured while making the order', response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const makePayment = () => {
    // add a paywall
  }

  const selectPaymentMethod = (option: PaymentMethod) => {
    const isSameOption = option === paymentMethod

    setPaymentMethod(isSameOption ? PaymentMethod.none : option)

    if (option === PaymentMethod.card && !isSameOption) {
      Alert.alert('UPI / Debit Card', 'Make an online payment?', [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => makePayment(),
        },
      ])
    }
  }

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/addresses/${userId}`)
      const { addresses } = response.data

      setAddresses(addresses)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View style={styles.stepsSubcontainer}>
                <View
                  style={[
                    styles.stepNumberContainer,
                    index <= currentStep && {
                      backgroundColor: index === currentStep ? COLORS.orange : COLORS.green,
                    },
                  ]}
                >
                  {index < currentStep ? (
                    <Text style={styles.stepNumber}>&#10003;</Text>
                  ) : (
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  )}
                </View>

                <View style={{ gap: 4 }}>
                  <Text
                    style={[
                      styles.stepNumberTitle,
                      index <= currentStep && {
                        color: index === currentStep ? COLORS.orange : COLORS.green,
                      },
                    ]}
                  >
                    {step.title}
                  </Text>

                  {index >= 0 && (
                    <View
                      style={[
                        styles.divider,
                        index <= currentStep && {
                          backgroundColor: index === currentStep ? COLORS.orange : COLORS.green,
                        },
                      ]}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* The First step */}
        {currentStep === 0 && (
          <View>
            <Text style={styles.stepTitle}>Select Delivery Address</Text>

            {addresses?.map((address: any, index: number) => (
              <Pressable onPress={() => setSelectedAddress(address)}>
                <View style={styles.addressesConrainer}>
                  <View
                    style={[
                      styles.circleContainer,
                      {
                        borderColor:
                          address?._id === selectedAddress?._id ? COLORS.primary : COLORS.gray,
                      },
                    ]}
                  >
                    {address?._id === selectedAddress?._id && <View style={styles.circle} />}
                  </View>

                  <View style={{ paddingLeft: 6 }}>
                    <View style={styles.addressTitleContainer}>
                      <Text style={styles.addressTitle}>{address?.name}</Text>
                      <Location width={24} height={24} fill={COLORS.red} />
                    </View>

                    <Text style={styles.addressSubitem}>
                      {address?.country}, {address?.city}
                    </Text>

                    <Text style={styles.addressSubitem}>{address?.street}</Text>

                    <Text style={styles.addressSubitem}>
                      {address?.houseNumber}, {address?.landmark}
                    </Text>

                    <Text style={styles.addressSubitem}>Postal Code: {address?.postalCode}</Text>

                    <Text style={styles.addressSubitem}>Phone No: {address?.mobileNumber}</Text>

                    <View style={styles.buttonsContainer}>
                      <Pressable style={styles.editButton}>
                        <Text style={{ color: COLORS.black }}>Edit</Text>
                      </Pressable>

                      <Pressable style={styles.editButton}>
                        <Text style={{ color: COLORS.black }}>Remove</Text>
                      </Pressable>

                      <Pressable style={styles.editButton}>
                        <Text style={{ color: COLORS.black }}>Set as Default</Text>
                      </Pressable>
                    </View>

                    <View>
                      {address?._id === selectedAddress?._id && (
                        <Pressable onPress={() => setCurrentStep(1)} style={styles.nextStepButton}>
                          <Text style={{ color: COLORS.systemWhite }}>Deliver to this Address</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {/* The Second step */}
        {currentStep === 1 && (
          <View>
            <Text style={styles.stepTitle}>Choose your delivery options</Text>

            <View style={styles.deliveryOptionContainer}>
              <Pressable
                onPress={() => setDeliveryOption(!deliveryOption)}
                style={[
                  styles.circleContainer,
                  {
                    borderColor: deliveryOption ? COLORS.primary : COLORS.gray,
                  },
                ]}
              >
                {deliveryOption && <View style={styles.circle} />}
              </Pressable>

              <Text style={{ color: COLORS.black }}>
                <Text style={styles.deliveryOptionTitle}>Tomorrow by 10 p.m. </Text>- FREE delivery
                with your Prime membership
              </Text>
            </View>

            <Pressable
              onPress={() => setCurrentStep(2)}
              disabled={!deliveryOption}
              style={styles.nextStepButton}
            >
              <Text style={{ color: COLORS.systemWhite }}>Continue</Text>
            </Pressable>
          </View>
        )}

        {/* The Third step */}
        {currentStep === 2 && (
          <View>
            <Text style={styles.stepTitle}>Select Your Payment Method</Text>

            <View style={styles.deliveryOptionContainer}>
              <Pressable
                onPress={() => selectPaymentMethod(PaymentMethod.cash)}
                style={[
                  styles.circleContainer,
                  {
                    borderColor:
                      paymentMethod === PaymentMethod.cash ? COLORS.primary : COLORS.gray,
                  },
                ]}
              >
                {paymentMethod === PaymentMethod.cash && <View style={styles.circle} />}
              </Pressable>

              <Text style={{ color: COLORS.black }}>Cash on Delivery</Text>
            </View>

            <View style={styles.deliveryOptionContainer}>
              <Pressable
                onPress={() => selectPaymentMethod(PaymentMethod.card)}
                style={[
                  styles.circleContainer,
                  {
                    borderColor:
                      paymentMethod === PaymentMethod.card ? COLORS.primary : COLORS.gray,
                  },
                ]}
              >
                {paymentMethod === PaymentMethod.card && <View style={styles.circle} />}
              </Pressable>

              <Text style={{ color: COLORS.black }}>UPI / Credit or Debit Card</Text>
            </View>

            <Pressable
              onPress={() => setCurrentStep(3)}
              disabled={!paymentMethod}
              style={styles.nextStepButton}
            >
              <Text style={{ color: COLORS.systemWhite }}>Continue</Text>
            </Pressable>
          </View>
        )}

        {/* The Fourth step */}
        {currentStep === 3 && paymentMethod === PaymentMethod.cash && (
          <View>
            <Text style={styles.stepTitle}>Order Now</Text>

            <View style={styles.autoDeliveriesContainer}>
              <View>
                <Text style={styles.stepTitle}>Save 5% and never run out</Text>
                <Text style={styles.autoDeliveriesText}>Turn on auto deliveries</Text>
              </View>

              <Right width={24} height={24} color={COLORS.black} />
            </View>

            <View style={styles.paymentMethodContainer}>
              <Text style={{ color: COLORS.black }}>Shipping to {selectedAddress?.name}</Text>

              <View style={styles.shippingItemsContainer}>
                <Text style={styles.shippingItemsText}>Items</Text>
                <Text style={styles.totalText}>${total}</Text>
              </View>

              <View style={styles.shippingItemsContainer}>
                <Text style={styles.shippingItemsText}>Delivery</Text>
                <Text style={styles.totalText}>$0</Text>
              </View>

              <View style={styles.shippingItemsContainer}>
                <Text style={styles.orderTotalTitle}>Order Total</Text>
                <Text style={styles.orderTotalValue}>${total}</Text>
              </View>
            </View>

            <View style={styles.paymentMethodContainer}>
              <Text style={styles.totalText}>Pay With</Text>
              <Text style={styles.paymentMethodTitle}>Cash (Pay on delivery)</Text>
            </View>

            <Pressable onPress={onPlaceOrder} disabled={total === 0} style={styles.nextStepButton}>
              <Text style={{ color: COLORS.systemWhite }}>Place Your Order</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
