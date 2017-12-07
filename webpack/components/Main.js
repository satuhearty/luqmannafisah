import React, { Component } from 'react';
import * as firebase from 'firebase';
import config from './firebase-config';
import Posts from './Posts';
import Modal from 'react-responsive-modal';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { cloudinary } from 'cloudinary-react';


class Main extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
  }

  state = {
    posts: [],
    open: false,
    author: '',
    message: '',
    files: []
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
        'image': obj[key].image
      });
    });
    return newArray;
  };

  updateMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  updateAuthor = (e) => {
    this.setState({ author: e.target.value });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    firebase.database().ref('posts').push({
      author: this.state.author,
      message: this.state.message,
      upvote: 0
    });

    this.setState({
      author: '',
      message: ''
    });

    this.onCloseModal();
  };

  handleDrop = (files) => {
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `satuhearty, wedding, website`);
      formData.append("upload_preset", "hwscws6c");
      formData.append("api_key", "317678834666434");
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios.post("https://api.cloudinary.com/v1_1/satuhearty/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url;
        console.log(data);
      })
    });
  };

  getInitialState = () => {
    return {
      files: []
    };
  };

  onDrop = (files) => {
    console.log(files);
    this.setState({
      files: files
    });
  };

  render() {
    const styles = {
      width: 'auto',
      height: 'auto'
    };

    return (
      <div>
        <button className="button" onClick={this.onOpenModal}>Post</button>
        {this.state.posts &&
          <Posts
            posts={this.state.posts}
            firebase={firebase.database()}
          />
        }
        <Modal open={this.state.open} onClose={this.onCloseModal}>
          <h2>Wedding message</h2>
          <p>
            Send your warmest love to the newly weds! Your wedding messages will be shown shortly.
          </p>
          <form method="post" action="#" className="alt">
            <div className="row uniform">
              <div className="12u$">
                <input type="text" name="demo-name" id="demo-name" placeholder="Name" onChange={this.updateAuthor} />
              </div>
              <div className="12u$">
                <textarea name="demo-message" id="demo-message" placeholder="Enter your message" rows="6" onChange={this.updateMessage} />
              </div>
              <div className="12u$">
                <div className="dropzone">
                  <Dropzone
                    ref="dropzone"
                    onDrop={this.onDrop}
                    style={styles}
                  >
                    {this.state.files.length <= 0 &&
                    <div className="dz-default dz-message">
                      <span>Drop files here to upload</span>
                    </div>
                    }
                    {this.state.files.length > 0 &&
                    <div>
                      {this.state.files.map((file) => (
                        <div key={file.name} className="dz-preview dz-processing dz-success dz-complete dz-image-preview">
                          <div className="dz-image">
                            <img data-dz-thumbnail="" alt="boston.jpg" src={file.preview} />
                          </div>
                          {/*<div className="dz-details">*/}
                          {/*<div className="dz-size">*/}
                          {/*<span data-dz-size=""><strong>1.3</strong> MB</span>*/}
                          {/*</div>*/}
                          {/*<div className="dz-filename">*/}
                          {/*<span data-dz-name="">boston.jpg</span>*/}
                          {/*</div>*/}
                          {/*</div>*/}
                          <div className="dz-progress">
                            <span className="dz-upload" data-dz-uploadprogress="" />
                          </div>
                        </div>
                      ))}
                    </div>
                    }
                  </Dropzone>
                </div>
              </div>
              <div className="12u$">
                <ul className="actions">
                  <li><input type="submit" value="Submit" className="special" onClick={this.handleSubmit} /></li>
                  <li><input type="reset" value="Cancel" onClick={this.onCloseModal} /></li>
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
