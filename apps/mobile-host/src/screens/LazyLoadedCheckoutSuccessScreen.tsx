import React from 'react';

import {LoadingScreen, useAuthStore} from 'mobile-core';

import ErrorBoundary from '../components/ErrorBoundary';
import {CheckoutSuccessNavigationProps} from '../navigation/types';
import { StyleSheet, Text, View } from 'react-native';

const CheckoutSuccessScreen = React.lazy(() => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  return import('MobileCheckout/CheckoutSuccessScreen');
});

type Props = CheckoutSuccessNavigationProps;

const LazyLoadedCheckoutSuccessScreen = ({navigation}: Props) => {
  const {user} = useAuthStore();
  const handleDismiss = () => {
    navigation.popToTop();

    if (user) {
      navigation.jumpTo('Orders');
    } else {
      navigation.jumpTo('Home');
    }
  };
return (
     <ErrorBoundary name="CheckoutSuccessScreen">
      <View style={styles.wrapper}>
        {/* Badge shown above everything */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Remote 3</Text>
        </View>

       <React.Suspense fallback={<LoadingScreen />}>
          <CheckoutSuccessScreen onDismiss={handleDismiss} />
        </React.Suspense>
      </View>
    </ErrorBoundary>
  
  );
  
};
const styles = StyleSheet.create({
  wrapper: {flex: 1},
  badge: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: '#FFFF00',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    zIndex: 999, // keeps it above the remote screen
  },
  badgeText: {color: '#ff5722', fontWeight: 'bold', fontSize: 24},
});

export default LazyLoadedCheckoutSuccessScreen;
