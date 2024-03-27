import React, { useContext, useState } from 'react'
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { styles } from './home.styles'
import Search from '../../assets/icons/magnify.svg'
import Mic from '../../assets/icons/mic_outline.svg'
import Location from '../../assets/icons/location_outline.svg'
import LocationFilled from '../../assets/icons/location.svg'
import Locate from '../../assets/icons/locate.svg'
import Earth from '../../assets/icons/earth.svg'
import ChevronDown from '../../assets/icons/chevron_down_outline.svg'
import { COLORS } from '../../theme/theme'
import {
  homeDeals,
  homeOffers,
  homeProductList,
  homeSliderImages,
} from '../../constants/FakeData'
import { SliderBox } from 'react-native-image-slider-box'
import { ProductItem } from '../../components'
import DropDownPicker from 'react-native-dropdown-picker'
import { ScreenName } from '../../constants'
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals'
import { UserContext } from '../../contexts/user-context/UserContext'
import { AddressModel, ProductModel } from '../../models'
import { HomeProps } from '../../navigators/types'
import { useFocusEffect } from '@react-navigation/native'
import { useFetchAddresses, useFetchProducts } from '../../hooks'

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { products, productsError, refetchProducts } = useFetchProducts()
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('electronics')
  const [selectedAddress, setSelectedAddress] = useState<
    AddressModel | undefined
  >(undefined)
  const [isModalPresented, setIsModalPresented] = useState(false)
  const { userId } = useContext(UserContext)
  const { addresses, addressesError, refetchAddresses } =
    useFetchAddresses(userId)
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: 'Jewelry', value: 'jewelery' },
    { label: 'Electronics', value: 'electronics' },
    { label: "Women's clothing", value: "women's clothing" },
  ])

  const toggleModal = () => {
    setIsModalPresented(!isModalPresented)
  }

  const showAddAddress = () => {
    toggleModal()
    navigation.push(ScreenName.yourAddresses)
  }

  const showProductDetails = (product: ProductModel) => {
    navigation.push(ScreenName.productInfo, { product: product })
  }

  // Fetch products on focus
  useFocusEffect(refetchProducts)

  // Fetch addresses on focus
  useFocusEffect(refetchAddresses)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <Pressable>
              <Search width={22} height={22} color={COLORS.black} />
            </Pressable>

            <TextInput placeholder="Search" />
          </View>

          <Mic width={24} height={24} color={COLORS.black} />
        </View>

        <View style={styles.deliveryContainer}>
          <Location width={24} height={24} color={COLORS.black} />

          <Pressable onPress={toggleModal}>
            <Text style={styles.delivery}>
              Deliver to
              {selectedAddress || addressesError
                ? ' ' +
                  selectedAddress?.name +
                  ' - ' +
                  selectedAddress?.country +
                  ', ' +
                  selectedAddress?.city
                : ' Select an Address'}
            </Text>
          </Pressable>

          <ChevronDown width={16} height={16} color={COLORS.black} />
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={homeProductList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable style={styles.category}>
              <Image source={{ uri: item?.image }} style={styles.image} />

              <Text style={styles.categoryTitle}>{item?.title}</Text>
            </Pressable>
          )}
        />

        <SliderBox
          images={homeSliderImages}
          autoplay
          circleLoop
          dotColor={COLORS.deepBlue}
          inactiveDotColor={COLORS.inactiveDot}
          ImageComponentStyle={{ width: '100%' }}
        />

        <Text style={styles.trendingTitle}>Trending Deals of the Week</Text>

        <View style={styles.weekDealContainer}>
          {homeDeals.map((item, index) => (
            <Pressable key={index} onPress={() => showProductDetails(item)}>
              <Image
                source={{ uri: item?.image }}
                style={styles.weekDealImage}
              />
            </Pressable>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.todayDealsTitle}>{"Today's Deals"}</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={homeOffers}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => showProductDetails(item)}>
              <Image
                source={{ uri: item?.image }}
                style={styles.todayDealsImage}
              />

              <View style={styles.offerTitleContainer}>
                <Text style={styles.offerTitle}>Up to {item?.offer ?? ''}</Text>
              </View>
            </Pressable>
          )}
        />

        <View style={styles.divider} />

        <View
          style={[styles.pickerContainer, { marginBottom: open ? 50 : 15 }]}
        >
          <DropDownPicker
            style={[styles.picker, { marginBottom: open ? 120 : 15 }]}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"
            zIndex={4}
            zIndexInverse={2}
          />
        </View>

        <View style={styles.footerProducts}>
          {productsError ? (
            <Text style={{ color: COLORS.black }}>{productsError}</Text>
          ) : (
            products
              ?.filter((product) => product.category === category)
              .map((product, index) => (
                <ProductItem product={product} key={index} />
              ))
          )}
        </View>
      </ScrollView>

      <BottomModal
        onTouchOutside={toggleModal}
        onShow={refetchAddresses}
        onSwipeOut={toggleModal}
        visible={isModalPresented}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
      >
        <ModalContent style={styles.modalContent}>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.modalTitle}>Choose your Location</Text>

            <Text style={styles.modalSubtitle}>
              Select a delivery location to see product availability options
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 15 }}
          >
            {addresses?.map((address: AddressModel, index: number) => (
              <Pressable
                style={[
                  styles.addAddressContainer,
                  {
                    backgroundColor:
                      selectedAddress === address
                        ? COLORS.selectedAddress
                        : COLORS.systemWhite,
                  },
                ]}
                onPress={() => setSelectedAddress(address)}
                key={index}
              >
                <View style={styles.locationTitleContainer}>
                  <Text style={styles.locationTitle}>{address?.name}</Text>
                  <LocationFilled width={22} height={22} fill={COLORS.red} />
                </View>

                <Text style={styles.locationSubitem} numberOfLines={1}>
                  {address?.houseNumber}, {address?.landmark}
                </Text>

                <Text style={styles.locationSubitem} numberOfLines={1}>
                  {address?.street}
                </Text>

                <Text style={styles.locationSubitem} numberOfLines={1}>
                  {address?.country}, {address?.city}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={styles.addAddressContainer}
              onPress={showAddAddress}
            >
              <Text style={styles.addAddressTitle}>
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={styles.modalSubContainer}>
            <View style={styles.modalExtraActionContainer}>
              <LocationFilled width={22} height={22} fill={COLORS.blue} />

              <Text style={styles.modalExtraActionTitle}>
                Enter an USA ZIP Code
              </Text>
            </View>

            <View style={styles.modalExtraActionContainer}>
              <Locate width={22} height={22} color={COLORS.blue} />

              <Text style={styles.modalExtraActionTitle}>
                Use My Current Location
              </Text>
            </View>

            <View style={styles.modalExtraActionContainer}>
              <Earth width={20} height={20} fill={COLORS.blue} />

              <Text style={styles.modalExtraActionTitle}>
                Deliver outside the USA
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </SafeAreaView>
  )
}
