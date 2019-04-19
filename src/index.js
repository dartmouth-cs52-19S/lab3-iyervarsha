/* eslint-disable react/no-unused-state */
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Map } from 'immutable';
import Note from './components/Note';
import './style.scss';
import InputNote from './components/inputNote';

// will render notes as a whole. will render the addNote component and note component
class App extends Component {
  // constructor
  constructor(props) {
    super(props);
    // attributes
    this.state = {
      notes: Map(),
      idcount: 0,
    };
    // methods

    // Binding functions give the function access to state and props
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    // this.update = this.update.bind(this);
  }


  deleteNote() {
    this.setState(prevState => ({
      notes: prevState.notes.delete(prevState.idcount),
    }));
  }

  addNote(t) {
    this.setState(prevState => ({
      notes: prevState.notes.set(prevState.idcount, {
        title: t,
      }),
      idcount: prevState + 1,
    }));
  }


  render() {
    return (
      <div>
        <InputNote submitTitle={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note id={id} title={note.title} x={30} y={30} />
          );
        })}
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
