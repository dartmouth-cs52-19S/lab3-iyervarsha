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
    this.onDrag = this.onDrag.bind(this);
    this.renderSomeSection = this.renderSomeSection.bind(this);
  }

  onChange(event) {
    console.log(event.target.value);
    // this.setState({ text: event.target.value });
    this.props.update(this.props.id, { text: event.target.value });
  }

  // onDeleteClick(event) {
  //   this.props.deleteNote(this.props.id);
  // }

  onDrag(event, position) {
    event.preventDefault();
    if (position.y > -50 && position.x > 0) {
      this.setState({
        x: position.x,
        y: position.y,
      });
    }
  }

  onStop(position) {
    this.setState({
      x: position.x,
      y: position.y,
    });
  }


  renderSomeSection() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isEditing) {
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
        // grid={[25, 25]}
        // defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.state.x, y: this.state.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note">
          <div className="note-header">
            <div className="right-header">
              <span className="note-title">{this.props.title}</span>
              <div className="icons">
                <div className="notebar flex-item"><a href=" " onClick={this.changeToggle}><i className="fa fa-pencil-square-o fa-1x" /></a></div>
                <div><a className="flex-item" href=" " onClick={this.onDeleteClick}><i className="fa fa-trash fa-1x" /></a></div>
                <div className="note-mover flex-item"><a href=" "><i className="fa fa-arrows fa-1x" /></a></div>
              </div>
              {/* <button type="submit" className="delete-note"> Delete</button> */}
            </div>
          </div>
          <div>
            <TextareaAutosize
              className="note-body"
              minRows={3}
              maxRows={6}
              maxLength="350"
            // defaultValue={this.props.note.text}
            />
          </div>
          {/* <div className="body">{this.renderSomeSection()}</div> */}
        </div>
      </Draggable>

    );
  }
}

export default Note;
