import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import Icons from './Icons';
import SignInButton from './SignInButton';

const NavMain = ({setShowLogin}) => {
  return (
    <div className="py-5 flex justify-between items-center sticky top-0 z-50 bg-white  ">
      <Logo />
      <NavLinks />
      <div className="flex items-center gap-[40px] max-[1050px]:gap-[30px] max-[900px]:gap-[20px]">
        <Icons />
        <SignInButton onClick={() => setShowLogin(true)}/>
      </div>
    </div>
  );
};

export default NavMain;
