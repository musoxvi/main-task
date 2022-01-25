import {StyleSheet} from 'react-native';
import {Colors} from './colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '2.5%',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.secundary.main,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: Colors.white,
  },
  link: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 60,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default globalStyles;
