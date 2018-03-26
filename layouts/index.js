import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import Copyright from '../components/Copyright';
import Intro from '../components/Intro';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import Post from '../components/Post';
import { NavPanel } from '../components/NavPanel';
import { MenuButton } from '../components/MenuButton';
import { Background } from '../components/Background';
import config from '../theme-config';

import '../css/font-awesome.min.css';
import '../css/main.css';
import '../css/noscript.css';
import '../css/custom.css';

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    console.log('layout', this.props);

    this.state = {
      isPanelVisible: false,
      currentPath: this.props.location.pathname,
      config: config,
    };
  }

  openPanel() {
    this.setState({
      isPanelVisible: true
    });
  }

  closePanel() {
    this.setState({
      isPanelVisible: false
    });
  }

  getIntroDescription(path) {
    return config.introText[path];
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.data.location;
    this.setState((prevState, props) => {
      return {
        currentPath: pathname
      };
    });
  }

  render() {
    let isVisible = classNames({
      'is-navPanel-visible': this.state.isPanelVisible
    });

    const data = this.props;

    return (
      <div id="pseudoBody" className={isVisible}>
        <div id="wrapper" className="fade-in">
          <Intro
            currentPath={this.state.currentPath}
            config={this.state.config}
            closePanel={() => this.closePanel()}
            openPanel={() => this.openPanel()}
          />
          <Header
            currentPath={this.state.currentPath}
            config={this.state.config}
            closePanel={() => this.closePanel()}
            openPanel={() => this.openPanel()}
          />
          <Navbar
            currentPath={this.state.currentPath}
            config={this.state.config}
            closePanel={() => this.closePanel()}
            openPanel={() => this.openPanel()}
          />
          {this.props.children}
          <Footer
            currentPath={this.state.currentPath}
            config={this.state.config}
            closePanel={() => this.closePanel()}
            openPanel={() => this.openPanel()}
          />
          <Copyright
            currentPath={this.state.currentPath}
            config={this.state.config}
            closePanel={() => this.closePanel()}
            openPanel={() => this.openPanel()}
          />
          <Background
            currentPath={this.state.currentPath}
            config={this.state.config}
            closePanel={() => this.closePanel()}
            openPanel={() => this.openPanel()}
          />
          <MenuButton
            currentPath={this.state.currentPath}
            config={this.state.config}
            closePanel={() => this.closePanel()}
            openPanel={() => this.openPanel()}
          />
          <NavPanel
            currentPath={this.state.currentPath}
            config={this.state.config}
            closePanel={() => this.closePanel()}
            openPanel={() => this.openPanel()}
          />
        </div>
      </div>
    );
  }
}
