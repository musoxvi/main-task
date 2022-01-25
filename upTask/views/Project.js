//import dependencies
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Input,
  Form,
  Item,
  List,
  H3,
  H2,
} from 'native-base';
// Components
import Task from '../components/task';
// Utils
import {Loader, showAlert} from '../utils/UI';
// Styles
import globalStyles from '../styles/global';
import {Colors} from '../styles/colors';
// Apollo
import {gql, useMutation, useQuery} from '@apollo/client';

const CREATE_TASK = gql`
  mutation createTask($input: TaskInput) {
    createTask(input: $input) {
      name
      id
      projectId
      state
    }
  }
`;
const GET_TASK = gql`
  query getTasks($input: projectIDInput) {
    getTasks(input: $input) {
      id
      name
      state
    }
  }
`;

// create a component
const Project = ({route}) => {
  const {id: projectId, name: nameTask} = route.params;
  // State
  const [name, setName] = useState('');
  const [alertConfig, setAlertConfig] = useState(null);

  // Apollo get tasks
  const {loading, error, data} = useQuery(GET_TASK, {
    variables: {
      input: {
        projectId,
      },
    },
  });

  console.log('data de tareas', data);
  console.log('data de tareas', error);

  // Apollo create tasks
  const [createTask] = useMutation(CREATE_TASK);

  const handleSubmit = async () => {
    if (!name) {
      return setAlertConfig({
        type: 'danger',
        text: 'El nombre de tarea es obligatorio',
        onClose: () => setAlertConfig(null),
      });
    }
    try {
      await createTask({
        variables: {
          input: {
            name,
            projectId,
          },
        },
      });

      setAlertConfig({
        type: 'success',
        text: 'Tarea creada con exito',
        onClose: () => {
          setAlertConfig(null);
          setName('');
        },
      });
    } catch (e) {
      setAlertConfig({
        type: 'danger',
        text: e?.message?.replace('GraphQL error:', ''),
        onClose: () => setAlertConfig(null),
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container style={([globalStyles.container], styles.container)}>
      <Form style={styles.form}>
        <Item inlineLabel last style={globalStyles.input}>
          <Input
            value={name}
            placeholder="Nombre Tarea"
            onChangeText={setName}
          />
        </Item>
        <Button
          style={([globalStyles.button], styles.button)}
          square
          block
          onPress={handleSubmit}>
          <Text>Crear Tarea</Text>
        </Button>
      </Form>
      <H2 style={globalStyles.subTitle}>{nameTask}</H2>

      <Content>
        <List style={styles.list}>
          {data?.getTasks.length ? (
            data.getTasks.map(task => <Task key={task.id} task={task} />)
          ) : (
            <H3 style={styles.noTask}>No hay tareas</H3>
          )}
        </List>
      </Content>

      {alertConfig && showAlert(alertConfig)}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple[300],
    paddingHorizontal: 20,
  },
  form: {
    paddingVertical: 20,
  },
  list: {
    backgroundColor: Colors.white,
  },
  button: {
    backgroundColor: Colors.grey[600],
  },
  noTask: {
    textAlign: 'center',
    paddingVertical: 20,
    color: Colors.secundary.main,
  },
});

export default Project;
