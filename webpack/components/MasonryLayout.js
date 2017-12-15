import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Bricks from 'bricks.js'
import InfiniteScroll from './InfiniteScroll'

class MasonryLayout extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    packed: PropTypes.string,
    sizes: PropTypes.array,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element).isRequired
  };

  static defaultProps = {
    style: {},
    className: '',
    packed: 'data-packed',
    sizes: [
      { columns: 1, gutter: 20 },
      { mq: '550px', columns: 2, gutter: 20 },
      { mq: '900px', columns: 3, gutter: 20 }
    ]
  };

  componentDidMount() {
    const instance = Bricks({
      container: `#${this.props.id}`,
      packed: this.props.packed,
      sizes: this.props.sizes
    });

    instance.resize(true);

    if (this.props.children.length > 0) {
      instance.pack();
    }

    this.bricksInstance = instance;
    window.addEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate() {
    this.bricksInstance.pack();
    // if (prevProps.children.length === 0 && this.props.children.length === 0) {
    //   return;
    // }
    //
    // if (prevProps.children.length === 0 && this.props.children.length > 0) {
    //   return this.bricksInstance.pack();
    // }
    //
    // if (prevProps.children.length !== this.props.children.length) {
    //   return this.bricksInstance.pack();
    // }
  }

  componentWillUnmount() {
    this.bricksInstance.resize(false);
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.bricksInstance.pack();
  };

  render() {
    const { id, className, style, children } = this.props;
    return (
      <div
        id={id}
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  }
}

export default InfiniteScroll(MasonryLayout);
