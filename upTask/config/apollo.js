import {ApolloClient} from '@apollo/client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
  uri:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:4000/'
      : 'http://localhost:4000/',
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
