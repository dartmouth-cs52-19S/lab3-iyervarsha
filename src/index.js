/* eslint-disable react/no-unused-state */
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Map } from 'immutable';
import Note from './components/Note';
import * as db from './services/datastore';
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
    console.log('changing title');
    db.updateTitle(id, content);
  }

  // eslint-disable-next-line class-methods-use-this
  content(id, content) {
    console.log('change content');
    db.updateContent(id, content);
  }

  deleteNote(id) {
    console.log('deleteNode func');
    console.log(this.id);
    db.deleteNote(id);
    // console.log(this.state.idcount);
    // this.setState(prevState => ({
    //   // prevState.id
    //   notes: prevState.notes.delete(id),
    // }));
  }


  addNote(t) {
    // prevState gives us access to the whole map
    console.log(this.t);
    db.addNote(t);
    // this.setState(prevState => ({
    //   notes: prevState.notes.set(prevState.idcount, {
    //     xpos: 20,
    //     ypos: 20,
    //     title: t,
    //     text: '',
    //   }),
    //   idcount: prevState.idcount + 1,
    // }));
  }

  moveXY(id, x, y) {
    console.log(this.x);
    console.log('at moveXY');
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
