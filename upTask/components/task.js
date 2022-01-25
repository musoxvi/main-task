//import dependencies
import React from 'react';
import {Text, Left, Right, Icon, ListItem} from 'native-base';

const Task = ({task}) => {
  return (
    <ListItem>
      <Left>
        <Text>{task.name}</Text>
      </Left>
      <Right>
        <Icon name="ios-checkmark-circle" />
      </Right>
    </ListItem>
  );
};

export default Task;
