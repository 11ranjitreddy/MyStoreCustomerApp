import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { OTPVerificationScreen } from '../screens/OTPVerificationScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { AddressSelectionScreen } from '../screens/AddressSelectionScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderConfirmedScreen } from '../screens/OrderConfirmedScreen';
import { OrderTrackingScreen } from '../screens/OrderTrackingScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { View } from 'react-native';
import { COLORS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Home, Search, ShoppingBag, User } from 'lucide-react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Placeholder = ({ route }: any) => (
  <View style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
    <Typography variant="h2">{route.name} Screen</Typography>
    <Typography variant="bodySecondary">Coming Soon</Typography>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      headerShown: false,
      tabBarStyle: {
        height: 65,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray200,
        backgroundColor: COLORS.white,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      }
    }}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeScreen} 
      options={{ 
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => <Home color={color} size={24} /> 
      }} 
    />
    <Tab.Screen 
      name="SearchTab" 
      component={SearchScreen} 
      options={{ 
        tabBarLabel: 'Search',
        tabBarIcon: ({ color }) => <Search color={color} size={24} /> 
      }} 
    />
    <Tab.Screen 
      name="OrdersTab" 
      component={OrdersScreen} 
      options={{ 
        tabBarLabel: 'Orders',
        tabBarIcon: ({ color }) => <ShoppingBag color={color} size={24} /> 
      }} 
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileScreen} 
      options={{ 
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => <User color={color} size={24} /> 
      }} 
    />
  </Tab.Navigator>
);

export const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Category" component={CategoryScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="AddressSelection" component={AddressSelectionScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="OrderConfirmed" component={OrderConfirmedScreen} />
    <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
  </Stack.Navigator>
);
