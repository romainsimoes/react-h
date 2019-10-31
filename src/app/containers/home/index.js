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
  mediaIndexPath
} from '../../utils/routes';
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

import Banner from './elements/Banner';
import ImageBanner from './elements/ImageBanner';
import PromiseWrapper from './elements/PromiseWrapper';

const key = 'global';

const HomeWrapper = styled.div`
  margin: 0;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0;
  flex-direction: column;
`;

export function Home({
  login,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setBannerIndex(bannerIndex + 1)
    }, 6000);
  }, []);

  return (
    <HomeWrapper>
      <PromiseWrapper>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4} className="HomePromise">
              <Link
                to={mediaIndexPath()}
                >
                test
              </Link>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} className="HomePromise">
              test
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} className="HomePromise">
              test
            </Col>
          </Row>
        </Grid>
      </PromiseWrapper>
    </HomeWrapper>
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
)(Home);
