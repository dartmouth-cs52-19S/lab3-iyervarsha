import React, { Component } from 'react';


// will render notes as a whole. will render the addNote component and note component
class InputNote extends Component {
  constructor(props) {
    super(props);

    this.state = { notetitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ notetitle: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addNote(this.state.notetitle);
    this.setState({
      notetitle: '',
    });
  }

  render() {
    return (
      <div>
        <input id = "searchBar" placeholder="Note Title..." onChange={this.onInputChange} value={this.state.notetitle} />
        <button className="title-submit" onClick={this.handleSubmit}> SUBMIT </button>
      </div>
    );
  }
}

export default InputNote;
