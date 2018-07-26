import React, { Component } from 'react';
import {render} from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import Card from './components/Card';

const SLIDESHOW_INTERVAL = 5000;

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
      this.runQueue();
    });
  };

  runQueue = () => {
    let index = 0;
    this.setState({ currentPost: this.state.currentQueue[index] });
    index++;
    setInterval(() => {
      if (index >= this.state.currentQueue.length) {
        index = 0;
      }
      this.setState({ currentPost: this.state.currentQueue[index] });
      index++;
    }, SLIDESHOW_INTERVAL);
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
