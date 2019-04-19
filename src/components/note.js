/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }
  
  onChange(event) {
    console.log(event.target.value);
    this.setState({ text: event.target.value });
    this.props.update(this.props.id, { text: event.target.value });
  }

  onDrag(event, position) {
    if (position.y > -50 && position.x > 0) {
      this.props.update(this.props.id, { x: position.x, y: position.y });
    }
  }

  renderSomeSection() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isEditing) {
      return (
        <div className="editing-note-body">
          <div><a href="" onClick={this.callUpdate}><i className="fa fa-check fa-1x" /></a></div>
          <TextareaAutosize
            class="note-body"
            minRows={3}
            maxRows={6}
            maxLength="350"
            // eslint-disable-next-line react/destructuring-assignment
            defaultValue={ this.props.note.text }
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
      <Draggable>
        <div className="note">
          <div className="note-header">
            <div className="right-header">
              <span className="note-title">Note Title</span>
              <div className="icons">
                <div className="notebar flex-item"><a href=" " onClick={this.changeToggle}><i className="fa fa-pencil-square-o fa-1x" /></a></div>
                <div><a className="flex-item" href=" " onClick={this.onDeleteClick}><i className="fa fa-trash fa-1x" /></a></div>
                <div className="note-mover flex-item"><a href=" "><i className="fa fa-arrows fa-1x" /></a></div>
              </div>
              {/* <button type="submit" className="delete-note"> Delete</button> */}
              <button type="submit" className="edit-note"> Edit</button>
            </div>
          </div>
          <div>
            <TextareaAutosize
              class="note-body"
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
