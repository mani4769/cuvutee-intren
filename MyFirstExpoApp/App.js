import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './screens/Dashboard';
import Leads from './screens/Leads';
import FollowUps from './screens/FollowUps';
import Products from './screens/Products';
import Notifications from './screens/Notifications';
import Settings from './screens/Settings';
import Sidebar from './screens/sidebar';
import AddLeadPage from './screens/AddLeadPage';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={props => <Sidebar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="FollowUps" component={FollowUps} />
        <Drawer.Screen name="Products" component={Products} />
        <Drawer.Screen name="Notifications" component={Notifications} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="AddLeadPage" component={AddLeadPage} />
        <Drawer.Screen name="Leads" component={Leads} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}