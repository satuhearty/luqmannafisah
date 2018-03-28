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
    relation: '',
    attending: 1,
    nafis: false,
    luqman: false,
    open: false,
    showForm: true,
    formSubmitted: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.name === '') {
      this.createNotification('Please enter your name.', 'error');
      return;
    }

    if (this.state.phone === '' && this.state.email === '') {
      this.createNotification('Please enter your phone number or email address.', 'error');
      return;
    }

    if (this.state.nafis === false && this.state.luqman === false) {
      this.createNotification('Please select at least 1 event.', 'error');
      return;
    }

    const guest = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      relation: this.state.relation,
      attending: this.state.attending,
      nafis: this.state.nafis,
      luqman: this.state.luqman
    };
    firebase.database().ref('rsvp').push(guest);
    axios.post('https://formspree.io/nikamirulmukmeen@gmail.com', guest);
    this.onOpenModal();
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

  updateRelation = (e) => {
    this.setState({ relation: e.target.value });
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
                  <input type="text" name="code" id="code" placeholder="RSVP Code" onChange={this.updateCode} />
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
                  <input type="text" name="name" id="name" placeholder="Name" onChange={this.updateName} />
                </div>
                <div className="6u 12u$(small)">
                  <input type="email" name="email" id="email" placeholder="Email" onChange={this.updateEmail} />
                </div>
                <div className="6u$ 12u$(small)">
                  <input type="text" name="phone" id="phone" placeholder="Phone" onChange={this.updatePhone} />
                </div>
                <div className="6u 12u$(small)">
                  <div className="select-wrapper">
                    <select name="relation" id="relation" onChange={this.updateRelation}>
                      <option value="">Relation</option>
                      <optgroup label="Khairun Nafisah">
                        <option value="baboys">Baboys</option>
                        <option value="ssp">SSP</option>
                        <option value="upm-friends">UPM - Friends</option>
                        <option value="upm-staffs">UPM - Colleagues</option>
                        <option value="naza">NAZA - Colleagues</option>
                        <option value="others">Others</option>
                      </optgroup>
                      <optgroup label="Luqman Nul Hakim">
                        <option value="sk-jalan-6">SK Jalan 6</option>
                        <option value="smk-jalan-4">SML Jalan 4</option>
                        <option value="asis">ASiS</option>
                        <option value="taylors">Taylors</option>
                        <option value="stevens">Stevens</option>
                        <option value="others">Others</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="6u$ 12u$(small)" style={{ textAlign: 'left' }}>
                  <div className="select-wrapper">
                    <select name="attending" id="attending" onChange={this.updateAttending}>
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
                <div className="6u$ 12u$(small)">
                  <input type="checkbox" id="nafis" name="nafis" checked={nafis} onChange={this.updateNafis} />
                  <label htmlFor="nafis">Nafis' Side - Saturday, 14 July 2018, 8-10pm</label>
                </div>
                <div className="2u 12u$(small)" />
                <div className="8u$ 12u$(small)">
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
                    <li>Nafis' reception</li>
                  }
                  {luqman &&
                    <li>Luqman's reception</li>
                  }
                </ul>
                <p style={{ textAlign: 'center', margin: 0 }}>for {attending} people.</p>
                <p style={{ textAlign: 'center', margin: 0 }}>Be sure to upload your photos at our wedding to our photo album <a href="/photos" target="_blank">here</a>.</p>
              </div>
            </Modal>
          </div>
        }
      </article>
    )
  }
}

render(<App />, document.getElementById('main'));
