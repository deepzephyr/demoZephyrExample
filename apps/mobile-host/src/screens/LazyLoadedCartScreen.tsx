import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import {CartNavigationProps} from '../navigation/types';
import { StyleSheet, Text, View } from 'react-native';

const CartScreen = React.lazy(async () => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  return await import('MobileCart/CartScreen');
});

type Props = CartNavigationProps;

const LazyLoadedCartScreen = ({navigation}: Props) => {
  const handleCheckoutSuccess = () => {
    navigation.navigate('CheckoutSuccess');
  };
return (
     <ErrorBoundary name="CartScreen">
      <View style={styles.wrapper}>
        {/* Badge shown above everything */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Remote 2</Text>
        </View>

        <React.Suspense fallback={<Placeholder />}>
          <CartScreen onCheckoutSuccess={handleCheckoutSuccess} />
        </React.Suspense>
      </View>
    </ErrorBoundary>
  
  );
  
};
const styles = StyleSheet.create({
  wrapper: {flex: 1},
  badge: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    backgroundColor: '#FFFF00',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    zIndex: 999, // keeps it above the remote screen
  },
  badgeText: {color: '#ff5722', fontWeight: 'bold', fontSize: 24},
});

export default LazyLoadedCartScreen;
