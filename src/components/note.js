import React, { Component } from 'react';


// will render notes as a whole. will render the addNote component and note component
class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>This is the note component</h1>
      </div>
    );
  }
}

export default Note;
