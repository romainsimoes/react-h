import React, { useEffect, memo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { Switch, Route } from 'react-router-dom';
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
import { renderRoutes } from "react-router-config";

import Header from '../header/index';
import Home from '../home/index';

const key = 'global';

import GlobalStyle from '../../utils/global-styles';
// import 'antd/dist/antd.css';

const AppWrapper = styled.div`
  margin: 0;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0;
  flex-direction: column;
  margin-top: 95px;
`;

export function AppShell({
  children,
  login,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    login();
  }, []);


  return (
    <AppWrapper>
      <Helmet>
        <title>Title</title>
        <meta
          name="description"
          lang="fr"
          content="Description"
        />
      </Helmet>
      <GlobalStyle />
      <Header>
      </Header>
      {children}
    </AppWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AppShell);
