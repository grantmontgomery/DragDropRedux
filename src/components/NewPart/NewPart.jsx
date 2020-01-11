import React, { Component } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CheckMark } from "../Icons/checkmark";
import "./NewPart.css";

class NewPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPieceValue: this.props.newPieceValue,
      color: "(233, 53, 53)",
      selected: null,
      CheckMark: null
    };
  }

  // handleUpdate = event => {
  //   const { target } = event;
  //   this.setState({ newPieceValue: target.value });
  // };

  componentDidMount() {
    const colorSelectors = document.getElementsByClassName("color-picker");
    ReactDOM.render(<CheckMark />, colorSelectors[0]);
  }
  changeColor = event => {
    event.preventDefault();
    const colorSelectors = document.getElementsByClassName("color-picker");
    const { target } = event;
    this.setState({
      color: target.getAttribute("value"),
      selected: target
    });

    for (let i = 0; i < colorSelectors.length; i++) {
      if (target === colorSelectors[i]) {
        ReactDOM.render(<CheckMark></CheckMark>, colorSelectors[i]);
      } else {
        ReactDOM.unmountComponentAtNode(colorSelectors[i]);
      }
    }
  };
  
  render() {
    const {
      handleSubmit,
      newPieceValue,
      handleUpdate,
      handleClick
    } = this.props;
    return (
      <div className="newpart-wrapper">
        <span>Add something!</span>
        <button className="exit-button" onClick={handleClick}>
          X
        </button>
        <br />
        <form action="" onSubmit={e => handleSubmit(e, this.state)}>
          <label htmlFor="">What?</label>
          <input
            type="text"
            name="activity"
            value={newPieceValue}
            onChange={handleUpdate}
          />
          <br />
          {/* <label htmlFor="" name="time">
            When?
          </label>
          <DatePicker></DatePicker> */}
          <br />
          <label htmlFor="">Color</label>
          <br />
          <div className="color-picker-wrapper">
            <div
              className="color-picker red"
              onClick={this.changeColor}
              name="red"
              value="(233, 53, 53)"
            ></div>
            <div
              className="color-picker orange"
              onClick={this.changeColor}
              name="orange"
              value="(255, 187, 0)"
            ></div>
            <div
              className="color-picker green"
              onClick={this.changeColor}
              name="green"
              value="(1, 192, 87)"
            ></div>
            <div
              className="color-picker blue"
              onClick={this.changeColor}
              name="blue"
              value="(0, 162, 255)"
            ></div>
            <div
              className="color-picker purple"
              onClick={this.changeColor}
              name="purple"
              value="(169, 43, 241)"
            ></div>
            <div
              className="color-picker black"
              onClick={this.changeColor}
              name="black"
              value="(30, 30, 30)"
            ></div>
          </div>
          <button
            className="create-button"
            onClick={e => handleSubmit(e, this.state)}
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default NewPart;
