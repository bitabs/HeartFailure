import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#909CAF',
    elevation: 0,
    padding: 40
  },

  toggle: {
    elevation: 10
  },

  avatar: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 300,
  }

});

export default function Menu({ onItemSelected, isOpen }) {
  return (
    <ScrollView scrollsToTop={false} style={[styles.menu, isOpen && styles.toggle]}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../Images/profile.jpg')}
          resizeMode="contain"
        />
        <Text style={styles.name}>Your name</Text>
      </View>

      <Text
        onPress={() => onItemSelected('About')}
        style={styles.item}
      >
        About
      </Text>

      <Text
        onPress={() => onItemSelected('Contacts')}
        style={styles.item}
      >
        Contacts
      </Text>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired
};
