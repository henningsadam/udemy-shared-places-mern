import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import Backdrop from '../UIElements/Backdrop';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.css';

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <>
      {drawerIsOpen && (
        <Backdrop
          onClick={() => {
            setDrawerIsOpen(false);
          }}
        />
      )}

      <SideDrawer show={drawerIsOpen} onClick={() => {setDrawerIsOpen(false)}}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className='main-navigation__menu-btn'
          onClick={() => {
            setDrawerIsOpen(true);
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>Your Places</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
