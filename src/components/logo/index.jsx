import React from 'react';
import LogoURL from '../../assets/img/logo.png';
import  './index.scss';

const Logo = () => {
  return (
    <div>
      <img className='header-logo' src={LogoURL} alt="Infervision's logo" />
    </div>
  );
};

export default Logo;
