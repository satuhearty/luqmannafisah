import React, { Component } from 'react';
import {render} from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import Card from './components/Card';

class App extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
  }

  state = {
    currentQueue: [],
    newPostQueue: [],
    currentPost: null
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    firebase.database().ref('posts').on('value', snapshot => {
      const currentQueue = [];
      const posts = snapshot.val();
      Object.keys(posts).forEach((key) => {
        currentQueue.push({
          'author': posts[key].author,
          'image': posts[key].image,
          'message': posts[key].message,
          'upvote': posts[key].upvote
        });
      });
      this.setState({ currentQueue: currentQueue });
      this.setState({ currentPost: currentQueue.pop() });
    });
  };

  render() {
    return (
      <div>
        {this.state.currentPost !== null &&
          <Card
            post={this.state.currentPost}
            firebase={firebase.database()}
          />
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('slideshow'));
