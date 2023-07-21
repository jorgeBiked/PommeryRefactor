import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const dimensions = {
  indent: 16,
  width,
  height,
};

export default dimensions;
