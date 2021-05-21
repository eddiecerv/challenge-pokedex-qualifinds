import React from 'react';
import { Image } from 'react-native';

const Logo = () => {
    return (
      <Image
        style={{ width: 90, height: 30 }}
        source={{
          uri: "https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png"
        }}
      />
    );
}

export default Logo;