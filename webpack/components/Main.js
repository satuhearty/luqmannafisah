import React, { Component } from 'react';
import * as firebase from 'firebase';
import config from './firebase-config';
import Posts from './Posts';
import Modal from 'react-responsive-modal';
import ScrollToTop from 'react-scroll-up';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class Main extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
  }

  state = {
    open: false,
    author: '',
    phone: '',
    email: '',
    message: '',
    files: [],
    count: 0
  };

  componentDidMount() {
    window.firebase = firebase.database();
    firebase.database().ref('count').on('value', snapshot => {
      this.setState({ count: snapshot.val() });
    });
  }

  updateMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  updateAuthor = (e) => {
    this.setState({ author: e.target.value });
  };

  updatePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.author === '' || this.state.message === '') {
      return;
    }

    const files = this.state.files;

    if (files.length === 0) {
      this.addPost('');
    } else {
      this.state.files.map(file => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", `satuhearty, wedding, website`);
        formData.append("upload_preset", "hwscws6c");
        formData.append("api_key", "317678834666434");
        formData.append("timestamp", (Date.now() / 1000) | 0);
        return axios.post("https://api.cloudinary.com/v1_1/satuhearty/image/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(response => {
          const fileUrl = response.data.secure_url;
          this.addPost(fileUrl);
        });
      });
    }
  };

  addPost = (imageUrl) => {
    const newCount = this.state.count + 1;

    firebase.database().ref('posts').push({
      author: this.state.author,
      phone: this.state.phone,
      email: this.state.email,
      message: this.state.message,
      upvote: 0,
      image: imageUrl
    });

    firebase.database().ref('count').set(newCount);

    this.setState({
      author: '',
      phone: '',
      email: '',
      message: '',
      files: [],
      count: newCount
    });

    this.onCloseModal();
  };

  onDrop = (files) => {
    this.setState({ files: files });
  };

  removeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ files: [] });
  };

  render() {
    return (
      <div>
        <button className="button post" onClick={this.onOpenModal}>Post</button>
        <ScrollToTop
          showUnder={50}
          style={{
            zIndex: '9999',
            position: 'fixed',
            bottom: 50,
            right: 30,
            cursor: 'pointer',
            transitionDuration: '0.2s',
            transitionTimingFunction: 'linear',
            transitionDelay: '0s'
          }}
        >
          <span><i className="fa fa-chevron-up" aria-hidden="true" style={{ fontSize: '1.5em', color: '#717981', border: '4px solid #717981', borderRadius: '50%', padding: '10px' }} /></span>
        </ScrollToTop>
        {this.state.count > 0 &&
          <Posts
            count={this.state.count}
            firebase={firebase.database()}
          />
        }
        <Modal open={this.state.open} onClose={this.onCloseModal}>
          <div style={{ textAlign: 'center', padding: '25px 15px' }}>
            <h2>Wedding message</h2>
            <p>
              Send your warmest love to the newly weds! Your wedding messages will be shown shortly.
            </p>
            <form method="post" action="#" className="alt">
              <div className="row uniform">
                <div className="12u$">
                  <input type="text" name="name" id="name" placeholder="Name *" onChange={this.updateAuthor} />
                </div>
                <div className="6u">
                  <input type="text" name="phone" id="phone" placeholder="Phone" onChange={this.updatePhone} />
                </div>
                <div className="6u$">
                  <input type="email" name="email" id="email" placeholder="Email" onChange={this.updateEmail} />
                </div>
                <div className="12u$">
                  <textarea name="demo-message" id="demo-message" placeholder="Enter your message *" rows="6" onChange={this.updateMessage} />
                </div>
                <div className="12u$">
                  <div className="dropzone">
                    <Dropzone
                      ref="dropzone"
                      onDrop={this.onDrop}
                      style={{ width: 'auto', height: 'auto' }}
                    >
                      {this.state.files.length <= 0 &&
                        <div className="dz-default dz-message">
                          <span>Upload an image here.</span>
                        </div>
                      }
                      {this.state.files.length > 0 &&
                        <div>
                          {this.state.files.map(file => (
                            <div key={file.name} className="dz-preview dz-processing dz-success dz-complete dz-image-preview">
                              <div className="dz-image">
                                <img data-dz-thumbnail="" alt="boston.jpg" src={file.preview} />
                              </div>
                              <div className="dz-progress">
                                <span className="dz-upload" data-dz-uploadprogress="" />
                              </div>
                              <a href="javascript:undefined;" className="icon alt fa-2x fa-times-circle-o" onClick={this.removeFile}>
                                <span className="label">Remove</span>
                              </a>
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
          </div>
        </Modal>
      </div>
    )
  }
}

export default Main;
