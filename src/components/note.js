/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashO } from '@fortawesome/free-solid-svg-icons';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      x: this.props.x,
      y: this.props.y,
    };
    // this.onDrag = this.onDrag.bind(this);
    // this.onStopDrag = this.onStopDrag.bind(this);
    this.renderSomeSection = this.renderSomeSection.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.changeToggle = this.changeToggle.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  onChange(event) {
    console.log(event.target.value);
    // this.setState({ text: event.target.value });
    this.props.update(this.props.id, { text: event.target.value });
  }

  onDeleteClick(event) {
    console.log('at OnDeleteClick');
    event.preventDefault();
    this.props.deleteNote(this.props.id);
  }

  onDrag(event, ui) {
    console.log('at onDrag');
    event.preventDefault();
    console.log(ui);
    this.props.update(this.props.id, ui.x, ui.y);
    // this.props.update(this.props.id, { x: ui.x, y: ui.y });
    // if (ui.y > -50 && ui.x > 0) {
    //   // this.props.update(this.props.id, { x: position.x, y: position.y });
    //   this.setState({
    //     x: ui.x,
    //     y: ui.y,
    //   });
    // }
  }

  // onStopDrag(event, position) {
  //   event.preventDefault();
  //   this.setState({
  //     x: position.x,
  //     y: position.y,
  //   });
  // }

  changeToggle(event) {
    event.preventDefault();
    console.log('we are trying to edit');
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  }


  renderSomeSection() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isEditing) {
      console.log('i am editing now');
      return (
        <div className="editing-note-body">
          <TextareaAutosize
            class="note-body"
            minRows={3}
            maxRows={6}
            maxLength="350"
            // eslint-disable-next-line react/destructuring-assignment
            defaultValue={this.props.note.text}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="default-note-body">
            <h1>hehehe</h1>
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 50, y: 50 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        // onStart={this.onStartDrag}
        onDrag={this.onDrag}
        // onStop={this.onDrag}
      >
        <div className="note">
          <div className="note-header">
            <div className="right-header">
              <span className="note-title">{this.props.title}</span>
              <div className="icons">
                {/* <div className="notebar flex-item"><a href=" " onClick={this.changeToggle}><i className="fa fa-pencil-square-o fa-1x" /></a></div> */}

                <div className="flex-item"><i className="fa fa-pencil-square-o fa-1x" /></div>
                <i onClick={this.onDeleteClick} className="fa fa-trash fa-1x" />
                {/* <div className="flex-item"><i onClick={this.onDeleteClick} className="fa fa-trash fa-1x" /></div> */}
                {/* <div><a className="flex-item" href=" " onClick={this.onDeleteClick}><i className="fa fa-trash fa-1x" /></a></div> */}

                <div className="note-mover flex-item"><i className="fa fa-arrows fa-1x" /></div>
              </div>
              {/* <button type="submit" className="delete-note"> Delete</button> */}
            </div>
          </div>
          {/* <div className="body">{this.renderSomeSection()}</div> */}
          <div>
            <TextareaAutosize
              className="note-body"
              minRows={3}
              maxRows={6}
              maxLength="350"
            />
          </div>
          {/* <div className="body">{this.renderSomeSection()}</div> */}
        </div>
      </Draggable>

    );
  }
}

export default Note;
