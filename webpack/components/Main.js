import React, { Component } from 'react';
import * as firebase from 'firebase';
import config from './firebase-config';
import Posts from './Posts';
import Modal from 'react-responsive-modal';

class Main extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
  }

  state = {
    posts: []
  };

  componentWillMount() {
    let postsRef = firebase.database().ref('posts');

    postsRef.on('value', snapshot => {
      this.setState({
        posts: this.reverseObject(snapshot.val()),
        loading: false
      });
    });
  }

  reverseObject = (obj) => {
    let newArray = [];
    Object.keys(obj).sort().reverse().forEach(key => {
      newArray.push( {
        'key': key,
        'author': obj[key].author,
        'message': obj[key].message,
        'upvote': obj[key].upvote,
        'hasImage': !!obj[key].hasImage
      });
    });
    return newArray;
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <button className="button" onClick={this.onOpenModal}>Post</button>
        {this.state.posts &&
          <Posts
            posts={this.state.posts}
            firebase={firebase.database()}
          />
        }
        <Modal open={open} onClose={this.onCloseModal}>
          <h2>Wedding message</h2>
          <p>
            Send your warmest love to the newly weds! Your wedding messages will be shown shortly.
          </p>
          <form method="post" action="#" className="alt">
            <div className="row uniform">
              <div className="6u 12u$(xsmall)">
                <input type="text" name="demo-name" id="demo-name" value="" placeholder="Name" />
              </div>
              <div className="6u$ 12u$(xsmall)">
                <input type="email" name="demo-email" id="demo-email" value="" placeholder="Email" />
              </div>
              <div className="12u$">
                <textarea name="demo-message" id="demo-message" placeholder="Enter your message" rows="6" />
              </div>
              <div className="12u$">
                <ul className="actions">
                  <li><input type="submit" value="Send Message" className="special" /></li>
                  <li><input type="reset" value="Cancel" /></li>
                </ul>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
}

export default Main;
