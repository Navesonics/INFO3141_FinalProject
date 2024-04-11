// Logo.js
import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

const LogoImage = ({ width, height }) => (
  <Image
    source={require('../assets/Containhere.png')}
    style={{ width, height }} 
    resizeMode="contain" 
  />
);

LogoImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default LogoImage;
