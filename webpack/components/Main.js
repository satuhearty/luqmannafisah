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
    message: ''
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

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      console.log('Finished');
      // ... perform after upload is successful operation
    });
  };

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.handleDrop}
          multiple
          accept="image/*"
        >
          <p>Drop your files or click here to upload</p>
        </Dropzone>
        {/*<input name="file" type="file"*/}
               {/*className="file-upload" data-cloudinary-field="image_id"*/}
               {/*data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/>*/}
        {/*<div className="upload">*/}
          {/*<button onClick={this.uploadWidget} className="upload-button">*/}
            {/*Add Image*/}
          {/*</button>*/}
        {/*</div>*/}
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
