import React, { Component } from 'react';
import Card from './Card';
import Masonry from 'react-masonry-component';

class Posts extends Component {
  render() {
    let posts = this.props.posts;

    if (!posts) {
      return false;
    }

    return (
      <Masonry
        className={'grid effect-7'}
        elementType={'ul'}
        options={{ transitionDuration: 0 }}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        { posts.map((post) => {
          return (
            <li key={post.key}>
              <Card
                post={post}
                firebase={this.props.firebase}
              />
            </li>
          );
        })}
      </Masonry>
    );
  }
}

export default Posts;
