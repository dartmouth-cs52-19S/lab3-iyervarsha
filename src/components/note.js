/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
import { TextArea } from 'semantic-ui-react';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      x: this.props.x,
      y: this.props.y,
    };
    this.renderSomeSection = this.renderSomeSection.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.edit = this.edit.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteNote(this.props.id);
  }

  onDrag(event, ui) {
    event.preventDefault();
    if (ui.x > -50 && ui.y > 0) {
      this.props.moveXY(this.props.id, ui.x, ui.y);
    }
  }

  onTitleChange(event) {
    event.preventDefault();
    this.props.changeTitle(this.props.id, event.target.value);
  }

  onContentChange(event) {
    event.preventDefault();
    this.props.content(this.props.id, event.target.value);
  }

  edit(event) {
    event.preventDefault();
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }

  renderTitle() {
    if (this.state.isEditing) {
      return (
        <div>
          <TextArea
            className="note-title"
            onChange={this.onTitleChange}
            minRows={1}
            maxRows={1}
            defaultValue={this.props.note.title}
          />
        </div>
      );
    } else {
      return <div>{this.props.note.title}</div>;
    }
  }

  renderSomeSection() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isEditing) {
      return (
        <div className="editing-note-body">
          <TextareaAutosize
            class="note-body"
            onChange={this.onContentChange}
            minRows={3}
            maxRows={6}
            maxLength="350"
            // eslint-disable-next-line react/destructuring-assignment
            defaultValue={this.props.note.text}
          />
        </div>
      );
    } else {
      // eslint-disable-next-line react/no-danger
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;
    }
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 50, y: 50 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStop}
      >
        <div className="note">
          <div className="note-header">
            <div className="right-header">
              {this.renderTitle()}
              <div className="icons">
                <div onClick={this.edit} className="flex-item"><i className="fa fa-pencil-square-o fa-1x" /></div>
                <i onClick={this.onDeleteClick} className="fa fa-trash fa-1x" />
                <div className="note-mover flex-item"><i className="fa fa-arrows fa-1x" /></div>
              </div>
            </div>
          </div>
          {this.renderSomeSection()}
        </div>
      </Draggable>

    );
  }
}

export default Note;
