import React, {PropTypes} from 'react';
import {connect} from 'dva';

import Footer from '../components/Layout/footer.js';

import styles from '../components/Layout/main.less';

function App({
  children, location, app
}) {

  return (
    <div className={styles.normal}>
      <Footer location={location} childrens={children} hidden={false}/>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps({app}) {
  return {
    app: app,
  };
}

export default connect(mapStateToProps)(App);


