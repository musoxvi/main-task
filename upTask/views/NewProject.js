// Dependencies
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container, Button, Text, H1, Input, Form, Item} from 'native-base';
// Utils
import {showAlert} from '../utils/UI';
// Styles
import globalStyles from '../styles/global';
import {Colors} from '../styles/colors';
// Apollo
import {gql, useMutation} from '@apollo/client';

const NEW_PROJECT = gql`
  mutation createProject($input: ProjectInput) {
    createProject(input: $input) {
      name
      id
    }
  }
`;

// Update cache
const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
    }
  }
`;

const NewProject = () => {
  // State
  const [name, setName] = useState('');
  const [alertConfig, setAlertConfig] = useState(null);

  // React Navigation
  const {navigate} = useNavigation();

  // Apollo mutation
  const [createProject] = useMutation(NEW_PROJECT, {
    // eslint-disable-next-line no-shadow
    update(cache, {data: {createProject}}) {
      const {getProjects} = cache.readQuery({query: GET_PROJECTS});
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {getProjects: getProjects.concat([createProject])},
      });
    },
  });

  const handleSubmit = async () => {
    if (!name) {
      return setAlertConfig({
        type: 'danger',
        text: 'El nombre del proyecto es obligatorio',
        onClose: () => setAlertConfig(null),
      });
    }

    try {
      await createProject({
        variables: {
          input: {
            name,
          },
        },
      });

      setAlertConfig({
        type: 'success',
        text: 'Proyecto Creado con exito',
        onClose: () => navigate('Projects'),
      });
    } catch (error) {
      setAlertConfig({
        type: 'danger',
        text: error.message.replace('GraphQL error:', ''),
        onClose: () => setAlertConfig(null),
      });
    }
  };

  return (
    <Container style={[globalStyles.container, styles.container]}>
      <View style={globalStyles.centerContent}>
        <H1 style={[globalStyles.title, styles.title]}>Nuevo proyecto</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input placeholder="Nombre del proyecto" onChangeText={setName} />
          </Item>
        </Form>
        <Button
          style={([globalStyles.button], styles.botton)}
          square
          block
          onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Crear Proyecto</Text>
        </Button>

        {alertConfig && showAlert(alertConfig)}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey[100],
  },
  title: {
    color: Colors.grey[800],
  },
  botton: {
    backgroundColor: Colors.grey[700],
  },
});

export default NewProject;
