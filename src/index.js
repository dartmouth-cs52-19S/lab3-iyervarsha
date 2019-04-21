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
    this.update = this.update.bind(this);
  }

  update(id, x, y) {
    console.log('at update');
    console.log(x);
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, x, y); }),
    }));
  }

  deleteNote(id) {
    // console.log('deleteNode func');
    // console.log(this.state.idcount);
    this.setState(prevState => ({
      // prevState.id
      notes: prevState.notes.delete(id),
    }));
  }


  addNote(t) {
    // prevState gives us access to the whole map
    this.setState(prevState => ({
      notes: prevState.notes.set(prevState.idcount, {
        xpos: 20,
        ypos: 20,
        title: t,
      }),
      idcount: prevState.idcount + 1,
    }));
  }


  render() {
    return (
      <div>
        <InputNote submitTitle={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note id={id} note={note} title={note.title} x={30} y={30} deleteNote={this.deleteNote} update={this.update} />
          );
        })}
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
