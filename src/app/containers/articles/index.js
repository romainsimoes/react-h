import React, { useEffect, memo, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose } from 'redux';
import {
  login,
} from './actions';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  makeSelectUser,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const key = 'global';

const ArticlesWrapper = styled.div`
  color: red;
`;

export function Articles({
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <ArticlesWrapper>
      Articles
    </ArticlesWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  // user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // login: () => dispatch(login()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Articles);
