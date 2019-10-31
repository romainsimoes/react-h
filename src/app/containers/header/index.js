import React, { useEffect, memo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { decrementCounter, incrementCounter } from './actions';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  makeSelectCounterValue,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import NavBarTop from '../navbartop/index';
import NavBarBottom from '../navbarbottom/index';

const key = 'global';

const HeaderWrapper = styled.div`
  /* height: 95px; */
`;

export function Header({
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <HeaderWrapper>
      <NavBarTop />
    </HeaderWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  counterValue: makeSelectCounterValue(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onDecrementCounter: () => dispatch(decrementCounter()),
    onIncrementCounter: () => dispatch(incrementCounter()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
