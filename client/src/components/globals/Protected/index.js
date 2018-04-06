import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../../../Redux'
import jwtDecode from 'jwt-decode';
import action from '../../../../Redux/actions/initialize_status_actions';
import initialize from '../../../../Redux/actions/initialize_actions';

class Protected extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    try {
      const { NODE_ENV } = process.env;
      const { signupStatus, history, location, component, initializeState, initializeStateAction, initialize } = this.props;
      const path = location.pathname.slice(1, 11);
      if (!localStorage.token) {
        history.push('/login')
      }
      const { exp } = jwtDecode(localStorage.token);
      const roundedExp = Math.floor(Date.now() / 1000)
      if (exp < roundedExp) {
        history.push('/login')
      }
      if (initializeState === false) {
        await initialize(history, location.pathname)
        initializeStateAction()
      } else if (signupStatus === false && path !== 'onboarding') {
        console.log('path', path)
        console.log('initializestate', initializeState)
        history.push('/onboarding/bio')
      }
      // if (exp > Math.floor(Date.now() / 1000) && signupStatus === false && path !== 'onboarding') {
      //   history.push('/onboarding/bio')
      // } else if (exp > Math.floor(Date.now() / 1000) && signupStatus === true) {
      //   if (initializeState === false && location.pathname !== '/home' && location.pathname !== '/initialize') {
      //     let { follows } = store.getState();
      //     console.log('follows', follows)
      //     if (follows.starred === null && follows.allOthers === null) {
      //       initializeStateAction
      //       console.log('actions', actions)
      //       history.push('/initialize')
      //     }
      //   }
      // } else if (exp < Math.floor(Date.now() / 1000)) {
      //   history.push('/login')
      // }
    } catch (err) {
      console.log('error in protected', err)
    }
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    initializeStateAction: action.updateInitializeState,
    initialize: initialize.initialize
  }, dispatch)
}

const mapStateToProps = state => {
  return {
    signupStatus: state.signupStatus,
    initializeState: state.initializeState,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Protected);
