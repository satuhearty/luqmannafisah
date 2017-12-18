import React, { Component } from 'react';
import {render} from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import Modal from 'react-responsive-modal';

const MODAL_TIMEOUT = 3000;
const RSVP_CODE = 'luqman';

class App extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
  }

  state = {
    code: '',
    name: '',
    email: '',
    phone: '',
    attending: 1,
    nikah: false,
    reception: false,
    brunch: false,
    open: false,
    showForm: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    firebase.database().ref('rsvp').push({
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      attending: this.state.attending,
      nikah: this.state.nikah,
      reception: this.state.reception,
      brunch: this.state.brunch
    });
    this.onOpenModal();
    setTimeout(() => {
      this.onCloseModal();
    }, MODAL_TIMEOUT);
  };

  handleCodeSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.code === RSVP_CODE) {
      this.setState({ showForm: true });
    }
  };

  updateCode = (e) => {
    this.setState({ code: e.target.value });
  };

  updateName = (e) => {
    this.setState({ name: e.target.value });
  };

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  updatePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  updateAttending = (e) => {
    this.setState({ attending: e.target.value });
  };

  updateNikah = () => {
    this.setState({ nikah: !this.state.nikah });
  };

  updateReception = () => {
    this.setState({ reception: !this.state.reception });
  };

  updateBrunch = () => {
    this.setState({ brunch: !this.state.brunch });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <article className="post featured">
        {!this.state.showForm &&
          <div>
            <header className="major">
              <h2>RSVP</h2>
              <p>Please enter your RSVP code to send your RSVP.</p>
            </header>
            <form className="alt" method="post" action="#">
              <div className="row uniform">
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{textAlign: 'left'}}>
                  <input type="text" name="demo-code" id="demo-code" placeholder="RSVP Code" onChange={this.updateCode} />
                </div>
                <div className="3u 12u$(small)" />
                <div className="12u$" style={{textAlign: 'center'}}>
                  <input type="submit" value="Submit" className="special" onClick={this.handleCodeSubmit} />
                </div>
              </div>
            </form>
          </div>
        }
        {this.state.showForm &&
          <div>
            <header className="major">
              <h2>RSVP</h2>
              <p>Let us know if you are coming!</p>
            </header>
            <form className="alt" method="post" action="#">
              <div className="row uniform">
                <div className="12u$">
                  <input type="text" name="demo-name" id="demo-name" placeholder="Name" onChange={this.updateName} />
                </div>
                <div className="4u 12u$(small)">
                  <input type="email" name="demo-email" id="demo-email" placeholder="Email" onChange={this.updateEmail} />
                </div>
                <div className="4u 12u$(small)">
                  <input type="text" name="demo-phone" id="demo-phone" placeholder="Phone" onChange={this.updatePhone} />
                </div>
                <div className="4u$ 12u$(small)" style={{textAlign: 'left'}}>
                  <input type="text" name="demo-attending" id="demo-attending" placeholder="# of people attending" onChange={this.updateAttending} />
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{textAlign: 'center'}}>
                  I will be attending:
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{textAlign: 'left'}}>
                  <input type="checkbox" id="nikah" name="nikah" checked={this.state.nikah} onChange={this.updateNikah} />
                  <label htmlFor="nikah">Nikah - Saturday, June 14 2018 6.00pm</label>
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{textAlign: 'left'}}>
                  <input type="checkbox" id="reception" name="reception" checked={this.state.reception} onChange={this.updateReception} />
                  <label htmlFor="reception">Reception - Saturday, June 14 2018 7.30pm</label>
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{textAlign: 'left'}}>
                  <input type="checkbox" id="brunch" name="brunch" checked={this.state.brunch} onChange={this.updateBrunch} />
                  <label htmlFor="brunch">Brunch - Sunday, June 15th 2018 11.00am</label>
                </div>
                <div className="12u$" style={{textAlign: 'center'}}>
                  <input type="submit" value="RSVP" className="special" onClick={this.handleSubmit} />
                </div>
              </div>
            </form>
            <Modal open={this.state.open} onClose={this.onCloseModal} little>
              <div style={{textAlign: 'center', padding: '25px 15px'}}>
                <h2>RSVP sent successfully!</h2>
                <p style={{textAlign: 'center', margin: 0}}>You have just RSVP for </p>
                <ul style={{listStyle: 'none', margin: 0, fontStyle: 'italic', fontWeight: 'bold'}}>
                  {this.state.nikah &&
                  <li>Nikah</li>
                  }
                  {this.state.reception &&
                  <li>Reception</li>
                  }
                  {this.state.brunch &&
                  <li>Brunch</li>
                  }
                </ul>
                <p style={{textAlign: 'center', margin: 0}}>for {this.state.attending} people.</p>
              </div>
            </Modal>
          </div>
        }
      </article>
    )
  }
}

render(<App />, document.getElementById('rsvp'));
