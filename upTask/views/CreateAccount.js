// Dependencies
import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from 'native-base';

// Styles
import globalStyles from '../styles/global';
import {Colors} from '../styles/colors';

// Apollo
import {gql, useMutation} from '@apollo/client';

const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input)
  }
`;

const CreateAccount = () => {
  // State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  // React Navigation
  const {navigate} = useNavigation();

  // Apollo mutation
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setAlert({
        text: 'Todos los campos son obligatorios',
        type: 'danger',
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        text: 'La contraseña debe tener al menos 6 caracteres',
        type: 'danger',
      });
      return;
    }

    try {
      const {data} = await createUser({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });
      Keyboard.dismiss();

      setAlert({
        text: data.createUser,
        type: 'success',
        onClose: () => navigate('Login'),
      });
    } catch (error) {
      setAlert({
        text:
          error?.message?.replace('GraphQL erre: ', '') ||
          'Ha ocurrido un error inesperado',
        type: 'danger',
      });
    }
  };

  const showAlert = () => {
    Toast.show({
      type: alert.type,
      text: alert.text,
      duration: 2000,
      onClose: alert.onClose ? alert.onClose : () => setAlert(null),
    });
  };

  return (
    <Container style={[globalStyles.container, styles.container]}>
      <View style={globalStyles.centerContent}>
        <H1 style={globalStyles.title}>UpTask</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input placeholder="Nombre" onChangeText={setName} />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input placeholder="Email" onChangeText={setEmail} />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input placeholder="Contraseña" onChangeText={setPassword} />
          </Item>
        </Form>
        <Button style={globalStyles.button} square block onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Crear Cuenta</Text>
        </Button>
        {alert && showAlert()}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary[600],
  },
});

export default CreateAccount;
