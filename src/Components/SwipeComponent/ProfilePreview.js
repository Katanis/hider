import React from 'react';
import { Modal, Button, Image } from 'react-native';

const ProfilePreview = props => {
  let showModal = false;
  if (props.modalVisible && props.i === props.index) {
    showModal = true;
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        alert('closed');
      }}
    >
      <Image
        source={{ uri: props.user.profile_picture }}
        style={{ width: '100%', height: 200 }}
      />
      {/* TODO RENDER USER PHOTOS HERE */}
      <Button
        onPress={() => props.setModalVisible(false)}
        title="Close preview"
      />
    </Modal>
  );
};
