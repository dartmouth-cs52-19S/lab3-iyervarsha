import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    };
  }

  render() {
    return (
      <Draggable>
        <div className="note">
          <div className="note-header">
            <div className="right-header">
              <span className="note-title">Note Title</span>
              <button className="delete-note"> Delete</button>
              <button className="edit-note"> Edit</button>
            </div>
          </div>
          <p className="note-body">Note Body</p>
        </div>
      </Draggable>

    );
  }
}

export default Note;
