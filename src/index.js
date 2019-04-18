import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Immutable from 'immutable';
import InputNote from './components/inputNote';
import Note from './components/Note';
import './style.scss';

// will render notes as a whole. will render the addNote component and note component
class App extends Component {
  // constructor
  constructor(props) {
    super(props);
    // attributes 
    this.state = {
      notes: Immutable.Map(),
      idcount: 0,
    };
    // methods
    // this.addNote = this.addNote.bind(this);
    // this.deleteNote = this.deleteNote.bind(this);
    // this.update = this.update.bind(this);
  }

  render() {
    return (
      <div>
        <InputNote />
        <Note />
        <h1>hehehe</h1>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
