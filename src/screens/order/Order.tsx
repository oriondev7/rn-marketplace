import { useContext, useState } from 'react'
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { styles } from './order.styles'
import { COLORS } from '../../theme/theme'
import axios from 'axios'
import Location from '../../assets/icons/location.svg'
import Right from '../../assets/icons/chevron_forward.svg'
import { UserContext } from '../../contexts/user-context/UserContext'
import { APIDomain, OPStep, PaymentMethod, ScreenName } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { clearCart } from '../../store/slices/CartReducer'
import { AddressModel } from '../../models'
import { OrderProps } from '../../navigators/types'
import { useFetchAddresses } from '../../hooks'
import {
  CellActionButton,
  NextStepButton,
  OrderOptionCell,
} from '../../components'

const steps = Object.values(OPStep)

export const Order: React.FC<OrderProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState<
    AddressModel | undefined
  >()
  const [deliveryOption, setDeliveryOption] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.none)
  const { userId } = useContext(UserContext)
  const { addresses, addressesError } = useFetchAddresses(userId)
  const orderError = 'An error occurred while making the order'

  const cart = useSelector((state: RootState) => state.cart.products)
  const total = cart
    ?.map((product) => product.price * product.quantity)
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

      const response = await axios.post(`${APIDomain.local}/orders`, orderData)

      if (response.status === 200) {
        navigation.navigate(ScreenName.confirmation)
        dispatch(clearCart())
      } else {
        Alert.alert(orderError)
      }
    } catch (error) {
      Alert.alert(orderError)
    }
  }

  const makePayment = () => {
    // show a paywall
  }

  const selectPaymentMethod = (option: PaymentMethod) => {
    const isSameOption = option === paymentMethod

    setPaymentMethod(isSameOption ? PaymentMethod.none : option)

    if (option === PaymentMethod.card && !isSameOption) {
      Alert.alert('UPI / Debit Card', 'Make an online payment?', [
        {
          text: 'Cancel',
          onPress: () => selectPaymentMethod(PaymentMethod.none),
        },
        {
          text: 'OK',
          onPress: () => makePayment(),
        },
      ])
    }
  }

  const selectAddress = (address: AddressModel) => {
    setSelectedAddress(
      address._id === selectedAddress?._id ? undefined : address
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subContainer}>
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <Pressable
                key={index}
                style={styles.stepsSubContainer}
                onPress={() => setCurrentStep(index)}
                disabled={currentStep <= index}
              >
                <View
                  style={[
                    styles.stepNumberContainer,
                    index <= currentStep && {
                      backgroundColor:
                        index === currentStep ? COLORS.orange : COLORS.green,
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
                        color:
                          index === currentStep ? COLORS.orange : COLORS.green,
                      },
                    ]}
                  >
                    {step}
                  </Text>

                  {index >= 0 && (
                    <View
                      style={[
                        styles.divider,
                        index <= currentStep && {
                          backgroundColor:
                            index === currentStep
                              ? COLORS.orange
                              : COLORS.green,
                        },
                      ]}
                    />
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* The First step */}
        {currentStep === 0 && (
          <View>
            <Text style={styles.stepTitle}>Select Delivery Address</Text>

            {addressesError ? (
              <Text style={{ color: COLORS.black }}>{addressesError}</Text>
            ) : (
              addresses?.map((address: AddressModel, index: number) => (
                <OrderOptionCell
                  key={index}
                  selected={address?._id === selectedAddress?._id}
                  mainButtonTitle="Deliver to this Address"
                  onCellPress={() => selectAddress(address)}
                  onMainButtonPress={() => setCurrentStep(1)}
                >
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

                  <Text style={styles.addressSubitem}>
                    Postal Code: {address?.postalCode}
                  </Text>

                  <Text style={styles.addressSubitem}>
                    Phone No: {address?.mobileNumber}
                  </Text>

                  <View style={styles.buttonsContainer}>
                    <CellActionButton title="Edit" />
                    <CellActionButton title="Remove" />
                    <CellActionButton title="Set as Default" />
                  </View>
                </OrderOptionCell>
              ))
            )}
          </View>
        )}

        {/* The Second step */}
        {currentStep === 1 && (
          <View>
            <Text style={styles.stepTitle}>Choose your delivery options</Text>

            <OrderOptionCell
              selected={deliveryOption}
              mainButtonTitle="Continue"
              onCellPress={() => setDeliveryOption(!deliveryOption)}
              onMainButtonPress={() => setCurrentStep(2)}
            >
              <Text style={{ color: COLORS.black }}>
                <Text style={styles.deliveryOptionTitle}>
                  Tomorrow by 10 p.m.{' '}
                </Text>
                - FREE delivery with your Prime membership
              </Text>
            </OrderOptionCell>
          </View>
        )}

        {/* The Third step */}
        {currentStep === 2 && (
          <View>
            <Text style={styles.stepTitle}>Select Your Payment Method</Text>

            <OrderOptionCell
              selected={paymentMethod === PaymentMethod.cash}
              mainButtonTitle="Continue"
              onCellPress={() => selectPaymentMethod(PaymentMethod.cash)}
              onMainButtonPress={() => setCurrentStep(3)}
            >
              <Text style={{ color: COLORS.black }}>Cash on Delivery</Text>
            </OrderOptionCell>

            <OrderOptionCell
              selected={paymentMethod === PaymentMethod.card}
              mainButtonTitle="Continue"
              onCellPress={() => selectPaymentMethod(PaymentMethod.card)}
              onMainButtonPress={() => setCurrentStep(3)}
            >
              <Text style={{ color: COLORS.black }}>
                UPI / Credit or Debit Card
              </Text>
            </OrderOptionCell>
          </View>
        )}

        {/* The Fourth step */}
        {currentStep === 3 && (
          <View>
            <Text style={styles.stepTitle}>Order Now</Text>

            <View style={styles.autoDeliveriesContainer}>
              <View>
                <Text style={styles.stepTitle}>Save 5% and never run out</Text>
                <Text style={styles.autoDeliveriesText}>
                  Turn on auto deliveries
                </Text>
              </View>

              <Right width={24} height={24} color={COLORS.black} />
            </View>

            <View style={styles.paymentMethodContainer}>
              <Text style={{ color: COLORS.black }}>
                Shipping to {selectedAddress?.name}
              </Text>

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
              <Text style={styles.paymentMethodTitle}>
                {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}{' '}
                (Pay on delivery)
              </Text>
            </View>

            <NextStepButton title="Place Your Order" onPress={onPlaceOrder} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
