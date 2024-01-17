import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';

const BottomActionSheet = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Action Sheet" onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={{ backgroundColor: 'white', padding: 22 }}>
          <Text style={{ fontSize: 20, marginBottom: 12 }}>Action Sheet Content</Text>
          <Text>Option 1</Text>
          <Text>Option 2</Text>
          <Text>Option 3</Text>
          {/* Add more options or content as needed */}
        </View>
      </Modal>
    </View>
  );
};

export default BottomActionSheet;
