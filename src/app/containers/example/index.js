import React, { useEffect, memo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
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

const key = 'global';

export function NavBarTop({
  onDecrementCounter,
  onIncrementCounter,
  counterValue
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div className={styles.container}>
      <div className={styles.mw850}>
        <h1 className={styles.title}>Redux Saga + ReactPWA</h1>
        <div className={styles.row}>
          <div className={styles.col6md}>
            <div className={styles.row}>
              <div className={styles.col6}>
                <div>
                  <button
                    type="button"
                    onClick={e => onIncrementCounter()}
                    className={styles.btn}
                  >
                    Increment sync counter
                  </button>
                </div>
              </div>
              <div className={styles.col6}>
                <div>
                  <button type="button" onClick={e => onDecrementCounter()} className={styles.btn}>
                    Decrement sync counter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.col6md}>
            <div className={styles.value}>
              {counterValue}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mt}>
        <a
          href="https://github.com/Atyantik/example-pawjs-redux-saga.git"
          className={classNames(styles.btn, styles.black)}
        >
          View source code
        </a>
      </div>
      <div className={styles.mw900}>
        <div className={styles.row}>
          <div className={styles.col8}>
            <div className={styles.p2}>
              <div>
                This is an example project of implementing Redux-Saga with&nbsp;
                <a
                  href="https://www.reactpwa.com"
                  target="_blank"
                  rel="noopener nofollow noreferrer"
                  className={styles.link}
                >
                  ReactPWA boilerplate
                </a>
                &nbsp;along with&nbsp;
                <a
                  href="https://github.com/atyantik/pawjs"
                  target="_blank"
                  rel="noopener nofollow noreferrer"
                  className={styles.link}
                >
                  PawJS
                </a>
              </div>
              <div className={styles.p1}>
                If you wish to contribute more to the project please visit us at&nbsp;
                <a
                  href="https://www.opencollective.com/react-pwa"
                  target="_blank"
                  rel="noopener nofollow noreferrer"
                  className={styles.link}
                >
                  https://www.opencollective.com/react-pwa
                </a>
              </div>
              <div className={styles.p1}>
                <a
                  href="https://opencollective.com/react-pwa/donate"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <img alt="open-collective" src="https://opencollective.com/react-pwa/contribute/button@2x.png?color=blue" width="250" />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.col4}>
            <div className={styles.p2}>
              <script src="https://codefund.io/scripts/fefc6de5-a0ce-46e8-a15d-f43733b5b454/embed.js" />
              <div id="codefund_ad" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
)(NavBarTop);
