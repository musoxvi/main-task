// Dependencies
import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Content,
  Button,
  Text,
  H2,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
// Utils
import {Loader} from '../utils/UI';
// Styles
import globalStyles from '../styles/global';
import {Colors} from '../styles/colors';
// Apollo
import {gql, useQuery} from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
    }
  }
`;

const Projects = () => {
  // React Navigation
  const {navigate} = useNavigation();

  // Apollo query
  const {loading, data} = useQuery(GET_PROJECTS);

  if (loading) {
    return <Loader />;
  }

  const objectToArrayOfObject = obj => {
    Object.entries(obj).map(data => {
      return {
        [data[0]]: data[1],
      };
    });
  };

  const viejo = [
    {idx: 0, row: 'ds_companynname'},
    {idx: 0, head: 'Business Name'},
    {idx: 1, row: 'ds_companynname'},
    {idx: 1, head: 'DBA'},
    {idx: 2, row: 'nr_ein'},
    {idx: 2, head: 'Employer Identification Number'},
    {idx: 3, row: 'nr_duns_number'},
    {idx: 3, head: 'DUNS Number'},
    {idx: 4, row: 'nr_sams_number'},
    {idx: 4, head: 'SAMS Number'},
    {idx: 5, row: 'ds_dba_name'},
    {idx: 5, head: 'Stablished Year'},
    {idx: 6, row: 'nr_stablished_year'},
    {idx: 6, head: 'Business Description'},
    {idx: 7, row: 'ds_dba_name'},
    {idx: 7, head: 'Preferred Bank/Lender Name'},
  ];

  return (
    <Container style={[globalStyles.container, styles.container]}>
      <Button
        square
        block
        style={[globalStyles.button, styles.button]}
        onPress={() => navigate('NewProject')}>
        <Text style={globalStyles.buttonText}>Nuevo proyecto</Text>
      </Button>
      <H2 style={[globalStyles.subTitle, styles.subtitle]}>
        Selecciona un Proyecto
      </H2>

      <Content style={styles.content}>
        <List style={styles.list}>
          {data?.getProjects?.map(project => (
            <ListItem
              key={project.id}
              onPress={() => navigate('Project', project)}>
              <Left>
                <Text style={styles.ListItem}>{project.name}</Text>
              </Left>
              <Right>
                <Text>icon</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  content: {
    marginBottom: 16,
  },
  subtitle: {
    color: Colors.secundary[500],
  },
  button: {
    marginTop: 30,
    backgroundColor: Colors.green.main,
  },
  list: {
    backgroundColor: Colors.white,
  },
  ListItem: {
    color: Colors.secundary[500],
  },
});

export default Projects;
