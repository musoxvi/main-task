import React from 'react';
import 'react-native-gesture-handler';
import {Root} from 'native-base';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Screens
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import Projects from './views/Projects';
import NewProject from './views/NewProject';
import Project from './views/Project';

// Styles
import {Colors} from './styles/colors';

const Stack = createStackNavigator();

const App = () => (
  <Root>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Iniciar Sesión',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            title: 'Crear cuenta',
            headerStyle: {
              backgroundColor: Colors.secundary.main,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Projects"
          component={Projects}
          options={{
            title: 'Proyectos',
            headerStyle: {
              backgroundColor: Colors.secundary.main,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="NewProject"
          component={NewProject}
          options={{
            title: 'Nuevo Proyecto',
            headerStyle: {
              backgroundColor: Colors.green[600],
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Project"
          component={Project}
          options={({route}) => ({
            title: route.params.name,
            headerStyle: {
              backgroundColor: Colors.purple[900],
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Root>
);

export default App;
