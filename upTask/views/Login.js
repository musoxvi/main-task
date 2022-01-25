// Dependencies
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container, Button, Text, H1, Input, Form, Item} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

// Utils
import {showAlert} from '../utils/UI';

// Styles
import globalStyles from '../styles/global';
import {Colors} from '../styles/colors';

// Apollo
import {gql, useMutation} from '@apollo/client';

const AUTHENTICATE_USER = gql`
  mutation authenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertConfig, setAlertConfig] = useState(null);

  // React Navigation
  const {navigate} = useNavigation();

  // Apollo mutation
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);

  useEffect(() => {
    async function cleanStorage() {
      await AsyncStorage.clear();
      console.log('limpio todo');
    }

    cleanStorage();
  }, [email, password]);

  const handleSubmit = async () => {
    if (!email || !password) {
      return setAlertConfig({
        type: 'danger',
        text: 'Todos los campos son obligatorios',
        onClose: () => setAlertConfig(null),
      });
    }

    try {
      const {data} = await authenticateUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const {token} = data.authenticateUser;
      await AsyncStorage.setItem('token', token);
      navigate('Projects');
    } catch (error) {
      return setAlertConfig({
        type: 'danger',
        text: 'Usuario o contraseña incorrectos',
        onClose: () => setAlertConfig(null),
      });
    }
  };

  return (
    <Container style={[globalStyles.container, styles.container]}>
      <View style={globalStyles.centerContent}>
        <H1 style={globalStyles.title}>UpTask</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Email"
              onChangeText={m => setEmail(m.toLowerCase())}
              value={email}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={setPassword}
            />
          </Item>
        </Form>
        <Button style={globalStyles.button} square block onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
        </Button>
        <Text
          onPress={() => navigate('CreateAccount')}
          style={globalStyles.link}>
          Crear Cuenta
        </Text>
        {alertConfig && showAlert(alertConfig)}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary[600],
  },
});

export default Login;
