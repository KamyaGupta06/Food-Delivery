import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="w-[150px] max-[1050px]:w-[140px] max-[900px]:[120px]">
      <Link to='/home'><img src={assets.logo} alt="Logo" className="w-[150px]" /></Link>
    </div>
  );
};

export default Logo;
