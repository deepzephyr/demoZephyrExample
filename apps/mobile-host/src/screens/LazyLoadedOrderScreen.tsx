import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import { StyleSheet, Text, View } from 'react-native';

const OrdersScreen = React.lazy(async () => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  return await import('MobileOrders/OrdersScreen');
});

const LazyLoadedOrderScreen = () => {
  return (
     <ErrorBoundary name="OrderScreen">
      <View style={styles.wrapper}>
        {/* Badge shown above everything */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Remote 4</Text>
        </View>

        <React.Suspense fallback={<Placeholder />}>
          <OrdersScreen  />
        </React.Suspense>
      </View>
    </ErrorBoundary>
  
  );
  
};
const styles = StyleSheet.create({
  wrapper: {flex: 1},
  badge: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    backgroundColor: '#FFFF00',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    zIndex: 999, // keeps it above the remote screen
  },
  badgeText: {color: '#ff5722', fontWeight: 'bold', fontSize: 24},
});

export default LazyLoadedOrderScreen;
