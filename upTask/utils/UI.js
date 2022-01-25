import React from 'react';
import {Toast} from 'native-base';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const showAlert = ({type, text, onClose, duration = 2000, ...rest}) => {
  Toast.show({
    type,
    text,
    onClose,
    duration,
    ...rest,
  });
};

export const Loader = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      width={'90%'}
      height={48}
      alignSelf="center"
      marginTop={20}
    />
    <SkeletonPlaceholder.Item
      width={'90%'}
      height={48}
      alignSelf="center"
      marginTop={20}
    />
    <SkeletonPlaceholder.Item
      width={'30%'}
      height={30}
      alignSelf="center"
      marginTop={50}
    />
    <SkeletonPlaceholder.Item
      width={'90%'}
      height={'65%'}
      alignSelf="center"
      marginTop={20}
    />
  </SkeletonPlaceholder>
);
