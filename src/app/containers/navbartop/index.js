import React, { useEffect, memo, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { decrementCounter, incrementCounter } from './actions';
import { Image } from 'cloudinary-react';
import {
  colors
} from '../../utils/styles.js';
import {
  whichNavigator
} from '../../utils/helpers';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import styled from 'styled-components';
import {
  makeSelectCounterValue,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import NavBarLeft from './elements/NavBarLeft';
import Logo from './elements/Logo';
import SearchBar from './elements/SearchBar';
import InputSearch from './elements/InputSearch';
import NavBarRight from './elements/NavBarRight';
import Profile from './elements/Profile';
import ProfileImg from './elements/ProfileImg';
import Name from './elements/Name';
import Wishlist from './elements/Wishlist';
import Cart from './elements/Cart';
import Svg from './elements/Svg';
import Wen from './elements/Wen';

const key = 'global';

const NavBarTopWrapper = styled.div`
  top: 0;
  background-color: ${props => props.colors.white};
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  height: 55px;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid;
  border-color: ${props => props.colors.greyLight};
  border-width: 1px;
  /* padding-bottom: 50px; */
  border-bottom: solid 1px lightgrey;

  padding: 0 4rem;
`;

NavBarTopWrapper.defaultProps = {
  colors
}

export function NavBarTop({
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    /* Doofinder Script Loading */
    var doofinder_script = `//cdn.doofinder.com/media/js/doofinder-classic.7.latest.min.js?${new Date().getTime()}`;
    (function(d, t) {
      var f = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
      f.async = 1;
      f.src = ('https:' == location.protocol ? 'https:' : 'http:') + doofinder_script;
      f.setAttribute('charset', 'utf-8');
      s.parentNode.insertBefore(f, s)
    }(document, 'script'));
  }, []);

  const [search, setSearch] = useState('');
  const [displayProfile, setDisplayProfile] = useState(false);

  return (
    <NavBarTopWrapper
      className={!!displayProfile ? `AppBarTop AppBarTop__fixed` : `AppBarTop`}
      >
      <Helmet>
        <script>
        </script>
      </Helmet>
      <NavBarLeft
        href="/"
        >
        React App
      </NavBarLeft>
      <SearchBar>
        <InputSearch
          type="text"
          onChange={event => setSearch(event.target.value)}
          id="TextFieldSearchAlgolia"
          name="TextFieldSearchAlgolia"
          placeholder="Rechercher un produit, une marque..."
          autocomplete="off"
          />
          <Wen
            id="SearchBarCloseButton"
            viewBox="0 0 24 24"
            role="img"
            focusable="false"
            >
            <path d="M 9 3 C 5.6759952 3 3 5.6759952 3 9 C 3 12.324005 5.6759952 15 9 15 C 10.481205 15 11.830584 14.465318 12.875 13.582031 L 18.292969 19 L 19 18.292969 L 13.582031 12.875 C 14.465318 11.830584 15 10.481205 15 9 C 15 5.6759952 12.324005 3 9 3 z M 9 4 C 11.770005 4 14 6.2299952 14 9 C 14 11.770005 11.770005 14 9 14 C 6.2299952 14 4 11.770005 4 9 C 4 6.2299952 6.2299952 4 9 4 z "></path>
          </Wen>
      </SearchBar>
      <NavBarRight>
        <Profile>
          <Name>
            Romain
          </Name>
        </Profile>
        <Wishlist
          href="/wishlist"
          >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
            <path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </Svg>
        </Wishlist>
        <Cart
          href="/boutique/commande/"
          >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/><path d="M0 0h24v24H0z" fill="none"/>
          </Svg>
        </Cart>
      </NavBarRight>
    </NavBarTopWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NavBarTop);
