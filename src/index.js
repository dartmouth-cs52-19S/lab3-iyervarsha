/* eslint-disable react/no-unused-state */
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Map } from 'immutable';
import Note from './components/Note';
import * as db from './services/datastore';
import './style.scss';
import InputNote from './components/inputNote';

// will render notes as a whole. will render the inputNote component and note component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Map(),
      idcount: 0,
    };

    // Binding functions give the function access to state and props
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.content = this.content.bind(this);
    this.moveXY = this.moveXY.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  changeTitle(id, content) {
    db.updateTitle(id, content);
  }

  // eslint-disable-next-line class-methods-use-this
  content(id, content) {
    db.updateContent(id, content);
  }

  // eslint-disable-next-line class-methods-use-this
  deleteNote(id) {
    db.deleteNote(id);
  }


  // eslint-disable-next-line class-methods-use-this
  addNote(t) {
    db.addNote(t);
  }

  // eslint-disable-next-line class-methods-use-this
  moveXY(id, x, y) {
    db.updateXY(id, x, y);
  }

  render() {
    return (
      <div>
        <InputNote submitTitle={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note id={id} note={note} title={note.title} x={30} y={30} deleteNote={this.deleteNote} content={this.content} moveXY={this.moveXY} changeTitle={this.changeTitle} />
          );
        })}
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
