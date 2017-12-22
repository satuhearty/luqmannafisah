import React, { Component } from 'react';
import {render} from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import Modal from 'react-responsive-modal';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios';

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
    showForm: false,
    formSubmitted: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const guest = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      attending: this.state.attending,
      nikah: this.state.nikah,
      reception: this.state.reception,
      brunch: this.state.brunch
    };
    firebase.database().ref('rsvp').push(guest);
    axios.post('https://formspree.io/nikamirulmukmeen@gmail.com', guest);
    this.onOpenModal();
    setTimeout(() => {
      this.onCloseModal();
    }, MODAL_TIMEOUT);
    this.setState({ formSubmitted: true });
  };

  handleCodeSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.code === RSVP_CODE) {
      this.createNotification('Success!', 'success');
      this.setState({ showForm: true });
    } else {
      this.createNotification('Incorrect RSVP Code.', 'error');
    }
  };

  createNotification = (message, type) => {
    notify.show(message, type, MODAL_TIMEOUT);
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
    const { open, nikah, reception, brunch, attending, showForm, formSubmitted } = this.state;

    return (
      <article className="post featured">
        <Notifications />
        {!showForm &&
          <div>
            <header className="major">
              <h2>RSVP</h2>
              <p>Please enter your RSVP code.</p>
            </header>
            <form className="alt" method="post" action="#">
              <div className="row uniform">
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{ textAlign: 'left' }}>
                  <input type="text" name="demo-code" id="demo-code" placeholder="RSVP Code" onChange={this.updateCode} />
                </div>
                <div className="3u 12u$(small)" />
                <div className="12u$" style={{ textAlign: 'center' }}>
                  <input type="submit" value="Submit" className="special" onClick={this.handleCodeSubmit} />
                </div>
              </div>
            </form>
          </div>
        }
        {showForm &&
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
                <div className="4u$ 12u$(small)" style={{ textAlign: 'left' }}>
                  <div className="select-wrapper">
                    <select name="demo-attending" id="demo-attending" onChange={this.updateAttending}>
                      <option value="1"># of people attending</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{ textAlign: 'center' }}>
                  I will be attending:
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{ textAlign: 'left' }}>
                  <input type="checkbox" id="nikah" name="nikah" checked={nikah} onChange={this.updateNikah} />
                  <label htmlFor="nikah">Nikah - Saturday, June 14 2018 6.00pm</label>
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{ textAlign: 'left' }}>
                  <input type="checkbox" id="reception" name="reception" checked={reception} onChange={this.updateReception} />
                  <label htmlFor="reception">Reception - Saturday, June 14 2018 7.30pm</label>
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{ textAlign: 'left' }}>
                  <input type="checkbox" id="brunch" name="brunch" checked={brunch} onChange={this.updateBrunch} />
                  <label htmlFor="brunch">Brunch - Sunday, June 15th 2018 11.00am</label>
                </div>
                <div className="12u$" style={{ textAlign: 'center' }}>
                  <input type="submit" value="RSVP" className="special" onClick={this.handleSubmit} disabled={formSubmitted} />
                </div>
              </div>
            </form>
            <Modal open={open} onClose={this.onCloseModal} little>
              <div style={{ textAlign: 'center', padding: '25px 15px' }}>
                <h2>RSVP sent successfully!</h2>
                <p style={{ textAlign: 'center', margin: 0 }}>You have just RSVP for </p>
                <ul style={{ listStyle: 'none', margin: 0, fontStyle: 'italic', fontWeight: 'bold' }}>
                  {nikah &&
                    <li>Nikah</li>
                  }
                  {reception &&
                    <li>Reception</li>
                  }
                  {brunch &&
                    <li>Brunch</li>
                  }
                </ul>
                <p style={{ textAlign: 'center', margin: 0 }}>for {attending} people.</p>
              </div>
            </Modal>
          </div>
        }
      </article>
    )
  }
}

render(<App />, document.getElementById('main'));
