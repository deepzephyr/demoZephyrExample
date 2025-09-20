import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {LoadingScreen} from 'mobile-core';

import ErrorBoundary from '../components/ErrorBoundary';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = React.lazy(() => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  return import('MobileInventory/HomeScreen');
});

const LazyLoadedHomeScreen = () => {
  const navigation = useNavigation();

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {productId});
  };

  return (
     <ErrorBoundary name="InventoryScreen">
      <View style={styles.wrapper}>
        {/* Badge shown above everything */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Remote 1</Text>
        </View>

        <React.Suspense fallback={<LoadingScreen />}>
          <HomeScreen onProductPress={handleProductPress} />
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

export default LazyLoadedHomeScreen;
