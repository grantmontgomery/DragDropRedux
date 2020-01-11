import React, { Component } from "react";
import { Square } from "../Square";
import "./Grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      gridWrapperWidth: 0,
      renderSquares: false
    };
  }

  // componentDidMount() {
  //   const {
  //     startHour,
  //     startMinutes,
  //     startDay,
  //     endHour,
  //     endMinutes,
  //     endDay
  //   } = this.props;

  //   if (endDay !== startDay) {
  //     const dayDifference = endDay - startDay - 1;
  //     const hourDifference =
  //       24 -
  //       (startHour + startMinutes) +
  //       (endHour + endMinutes) +
  //       dayDifference * 24;
  //     const width = (hourDifference + 1) * 200;
  //     const amountOfColumns = width / 100;
  //     this.setState({
  //       hourDifference,
  //       numberOfSquares: amountOfColumns * 7
  //     });
  //   } else {
  //     const hourDifference = endHour + endMinutes - (startHour + startMinutes);
  //     const width = (hourDifference + 1) * 200;
  //     const amountOfColumns = width / 100;
  //     this.setState({
  //       hourDifference,
  //       numberOfSquares: amountOfColumns * 7
  //     });
  //   }
  // }
  repeatString = (string, number) => {
    let newString = "";
    while (number > 0) {
      newString += string;
      number--;
    }
    return newString;
  };

  gridSliderStyle = () => {
    const { hourDifference } = this.props;
    const width = (hourDifference + 1) * 200;
    const amountOfColumns = width / 100;
    const gridColumnSize = " 100px";
    const squareStr = " square";
    const headerStr = " header";
    const rowStr = ` "${this.repeatString(squareStr, amountOfColumns)}"`;
    const firstRow = `"${this.repeatString(headerStr, amountOfColumns)}"`;
    return {
      width: `${width}px`,
      gridTemplateColumns: ` ${this.repeatString(
        gridColumnSize,
        amountOfColumns
      )}`,
      gridTemplateAreas: `${firstRow}${this.repeatString(rowStr, 7)}`
    };
  };

  renderHoursSections() {
    let { startHour, startDay, endDay, endHour } = this.props;
    if (startDay !== endDay) {
      const hours = [];
      while (startHour < 24) {
        if (startHour > 12) {
          hours.push(`${startHour - 12}:00 p.m`);
          startHour++;
        } else if (startHour === 0) {
          hours.push(`12:00 a.m`);
          startHour++;
        } else if (startHour === 12) {
          hours.push(`12:00 p.m`);
        } else {
          hours.push(`${startHour}:00 a.m`);
          startHour++;
        }
      }
      let endHourCount = 0;
      while (endHourCount <= endHour) {
        if (endHourCount > 12) {
          hours.push(`${endHourCount - 12}:00 p.m`);
          endHourCount++;
        } else if (endHourCount === 0) {
          hours.push(`12:00 a.m`);
          endHourCount++;
        } else if (endHourCount === 12) {
          hours.push(`12:00 p.m`);
          endHourCount++;
        } else {
          hours.push(`${endHourCount}:00 a.m`);
          endHourCount++;
        }
      }

      return hours.map(hour => {
        return (
          <div className="hours-wrapper">
            <p>{hour}</p>
          </div>
        );
      });
    } else {
      const hours = [];
      while (startHour <= endHour) {
        if (startHour > 12) {
          hours.push(`${startHour - 12}:00 p.m`);
          startHour++;
        } else if (startHour === 0) {
          hours.push(`12:00 a.m`);
          startHour++;
        } else if (startHour === 12) {
          hours.push(`12:00 p.m`);
        } else {
          hours.push(`${startHour}:00 a.m`);
          startHour++;
        }
      }
      return hours.map(hour => {
        return (
          <div className="hours-wrapper" style={{ width: "200px" }}>
            <p>{hour}</p>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="grid-wrapper">
        <div className="grid-slider" style={this.gridSliderStyle()}>
          <div className="date-header">{this.renderHoursSections()}</div>
          {this.props.squares.map(square => (
            <Square className="square" key={square}></Square>
          ))}
        </div>
      </div>
    );
  }
}

export default Grid;
