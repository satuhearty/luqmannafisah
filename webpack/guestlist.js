import React, { Component } from 'react';
import {render} from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import ReactTable from 'react-table';

class App extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
  }

  state = {
    data: []
  };

  componentDidMount() {
    this.getGuestList();
  }

  getGuestList = () => {
    firebase.database().ref('rsvp').on('value', snapshot => {
      const guestList = [];
      const guests = snapshot.val();
      Object.keys(guests).forEach((key) => {
        guestList.push({
          'name': guests[key].name,
          'email': guests[key].email,
          'phone': guests[key].phone,
          'nikah': guests[key].nikah,
          'reception': guests[key].reception,
          'brunch': guests[key].brunch,
          'attending': guests[key].attending
        });
      });
      this.setState({ data: guestList });
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'name'
                }
              ]
            },
            {
              Header: 'Info',
              columns: [
                {
                  Header: 'Email',
                  accessor: 'email'
                },
                {
                  Header: 'Phone',
                  accessor: 'phone'
                }
              ]
            },
            {
              Header: 'RSVP',
              columns: [
                {
                  Header: 'Nikah',
                  accessor: 'nikah',
                  minWidth: 50,
                  Cell: props => props.value ? <i className="fa fa-check" aria-hidden="true" style={{color: 'green'}} /> : <i className="fa fa-times" aria-hidden="true" style={{color: 'red'}} />
                },
                {
                  Header: 'Reception',
                  accessor: 'reception',
                  minWidth: 50,
                  Cell: props => props.value ? <i className="fa fa-check" aria-hidden="true" style={{color: 'green'}} /> : <i className="fa fa-times" aria-hidden="true" style={{color: 'red'}} />
                },
                {
                  Header: 'Brunch',
                  accessor: 'brunch',
                  minWidth: 50,
                  Cell: props => props.value ? <i className="fa fa-check" aria-hidden="true" style={{color: 'green'}} /> : <i className="fa fa-times" aria-hidden="true" style={{color: 'red'}} />
                }
              ]
            },
            {
              Header: 'Attending',
              columns: [
                {
                  Header: 'Attending',
                  accessor: 'attending',
                  minWidth: 50
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className='-striped -highlight'
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('guestlist'));
