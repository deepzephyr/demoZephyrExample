import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  useAuthStore,
  useCartStore,
  useTheme,
  useTranslation,
} from 'mobile-core';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import {AccountScreenWrapper} from '../screens/AccountScreenWrapper';
import LazyLoadedHomeScreen from '../screens/LazyLoadedHomeScreen';
import LazyLoadedOrderScreen from '../screens/LazyLoadedOrderScreen';
import CartCheckoutNavigator from './CartCheckoutNavigator';

export type TabsParamList = {
  Home: undefined;
  CartNavigator: undefined;
  Orders: undefined;
  Account: undefined;
};

const Tabs = createMaterialBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  const {user} = useAuthStore();
  const {items} = useCartStore();
  const theme = useTheme();
  const {t} = useTranslation('host');

  return (
    <View style={{flex: 1}}>
    {/* Overlay badge */}
    <View style={styles.hostBadge}>
      <Text style={styles.hostText}>Host</Text>
    </View>
    <Tabs.Navigator
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.primary}
      barStyle={{backgroundColor: theme.colors.onPrimary}}
      activeIndicatorStyle={[
        styles.activeIndicator,
        {
          borderBottomColor: theme.colors.primary,
          backgroundColor: theme.colors.onPrimary,
        },
      ]}>
      <Tabs.Screen
        name="Home"
        component={LazyLoadedHomeScreen}
        options={{
          title: t('navigation.home'),
          tabBarIcon: 'home-outline',
          tabBarButtonTestID: 'navigation.homeTabIcon',
        }}
      />
      <Tabs.Screen
        name="CartNavigator"
        component={CartCheckoutNavigator}
        options={{
          title: t('navigation.cart'),
          tabBarIcon: 'cart-outline',
          tabBarButtonTestID: 'navigation.cartTabIcon',
          tabBarBadge: items.length,
        }}
      />
      {user ? (
        <Tabs.Screen
          name="Orders"
          component={LazyLoadedOrderScreen}
          options={{
            title: t('navigation.orders'),
            tabBarIcon: 'clipboard-list-outline',
            tabBarButtonTestID: 'navigation.ordersTabIcon',
          }}
        />
      ) : null}
      <Tabs.Screen
        name="Account"
        component={AccountScreenWrapper}
        options={{
          title: t('navigation.account'),
          tabBarIcon: 'account-outline',
          tabBarButtonTestID: 'navigation.accountTabIcon',
        }}
      />
    </Tabs.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  hostBadge: {
    position: 'absolute',
    bottom: 15,
    left: 100,
    backgroundColor: '#FFFF00',
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 6,
    zIndex: 999,
    width:"40%",
    height:30,
    elevation: 5, // for Android
  },
  hostText: {
    color: "red",
    fontWeight: 'bold',
    fontSize: 14,
    textAlign:"center"
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -30,
    borderBottomWidth: 2,
    borderRadius: 0,
  },
});


export default TabsNavigator;
