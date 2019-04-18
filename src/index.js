import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import AddNote from './components/addNote';
import Note from './components/Note';
import './style.scss';

// will render notes as a whole. will render the addNote component and note component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Map(),
    };
  }

  render() {
    return (
      <div>
        <Note />
        <AddNote />
        <h1>hehehe</h1>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
