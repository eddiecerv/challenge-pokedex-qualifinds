import React from 'react';
import type { Node } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Button, Image
  } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';

const onPressLearnMore = () => {
    console.log('Do something: ');
};

const Menu = (): Node => {
    return (
        <View style={{
            flexDirection: "row",
            height: 100,
            padding: 20,
            backgroundColor: "red"
        }}>
        <Image
        style={{ width: 180, height: 60, marginLeft:"auto", marginRight:"auto", }}
        source={{
          uri: 'https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png',
        }}
      />
        </View>
    );
};

export default Menu;