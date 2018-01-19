import React, { Component } from 'react';
import {render} from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import Modal from 'react-responsive-modal';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios';

const MODAL_TIMEOUT = 3000;
const RSVP_CODE = 'luqmannafis';

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
    nafis: false,
    luqman: false,
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
      nafis: this.state.nafis,
      luqman: this.state.luqman
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

  updateNafis = () => {
    this.setState({ nafis: !this.state.nafis });
  };

  updateLuqman = () => {
    this.setState({ luqman: !this.state.luqman });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, nafis, luqman, attending, showForm, formSubmitted } = this.state;

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
                  <input type="checkbox" id="nafis" name="nafis" checked={nafis} onChange={this.updateNafis} />
                  <label htmlFor="nafis">Nafis' Side - Saturday, 14 July 2018, 8-10pm</label>
                </div>
                <div className="3u 12u$(small)" />
                <div className="6u$ 12u$(small)" style={{ textAlign: 'left' }}>
                  <input type="checkbox" id="luqman" name="luqman" checked={luqman} onChange={this.updateLuqman} />
                  <label htmlFor="luqman">Luqman's Side - Saturday, 28 July 2018, 6-11pm</label>
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
                  {nafis &&
                    <li>Nafis' nafis</li>
                  }
                  {luqman &&
                    <li>Luqman's nafis</li>
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
