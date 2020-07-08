import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import "./App.scss";

let count = 1;
let query = window.matchMedia("(max-width: 686px)");
let size = 380;

let initialX = null;
let initialY = null;
let currentX = 0;
let currentY = 0;
let diffX = initialX - currentX;
let diffY = initialY - currentY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
    this.lastImg = React.createRef();
    this.firstImg = React.createRef();
    this.images = [
      this.lastImg,
      "pic1",
      "pic2",
      "pic3",
      "pic4",
      "pic5",
      "pic6",
      "pic7",
      this.firstImg,
    ];
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.swipe = this.swipe.bind(this);
    this.moveTouch = this.moveTouch.bind(this);
  }

  swipe() {
    this.slider.current.addEventListener("touchstart", this.StartTouch, false);
    this.slider.current.addEventListener("touchmove", this.MoveTouch, false);
  }

  startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  }
  moveTouch(e) {
    if (initialX === null) {
      return;
    }

    if (initialY === null) {
      return;
    }

    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;

    diffX = initialX - currentX;
    diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX >= 0) {
        this.Next();
      } else {
        this.Previous();
      }
    }
    initialX = null;
    initialY = null;

    e.preventDefault();
  }

  previous() {
    if (query.matches) {
      size = 240;
    }
    if (count <= 0) return;
    count--;
    this.slider.current.style.transform = "translateX(" + -size * count + "px)";
    this.slider.current.style.transition = "transform 1s ease-in-out";
    this.slider.current.addEventListener("transitionend", () => {
      if (this.images[count] === this.lastImg) {
        this.slider.current.style.transition = "none";
        count = 7;
        this.slider.current.style.transform =
          "translateX(" + -size * count + "px)";
      }
    });
  }

  next() {
    if (query.matches) {
      size = 240;
    }
    if (count >= 8) return;
    count++;
    this.slider.current.style.transform = "translateX(" + -size * count + "px)";
    this.slider.current.style.transition = "transform 1s ease-in-out";
    this.slider.current.addEventListener("transitionend", () => {
      if (this.images[count] === this.firstImg) {
        this.slider.current.style.transition = "none";
        count = 1;
        this.slider.current.style.transform =
          "translateX(" + -size * count + "px)";
      }
    });
  }

  goToSlide = (num) => () => {
    count = num;
    if (query.matches) {
      size = 240;
    }
    this.slider.current.style.transform = "translateX(" + -size * num + "px)";
  };

  render() {
    return (
      <div className="wrapper">
        <nav>
          <i className="prevBtn">
            <FaArrowCircleLeft onClick={this.previous} />
          </i>
          <i className="nextBtn">
            <FaArrowCircleRight onClick={this.next} />
          </i>
        </nav>
        <div className="slider-container">
          <div
            className="slider"
            ref={this.slider}
            onTouchStart={this.swipe}
          >
            <li ref={this.lastImg}>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic7.jpg?raw=true"
                alt=""
              ></img>
            </li>
            <li>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic1.jpg?raw=true"
                alt=""
              ></img>
            </li>
            <li>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic2%20.jpg?raw=true"
                alt=""
              ></img>
            </li>
            <li>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic3.jpg?raw=true"
                alt=""
              ></img>
            </li>
            <li>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic4.jpg?raw=true"
                alt=""
              ></img>
            </li>
            <li>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic5.jpg?raw=true"
                alt=""
              ></img>
            </li>
            <li>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic6.jpg?raw=true"
                alt=""
              ></img>
            </li>
            <li>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic7.jpg?raw=true"
                alt=""
              ></img>
            </li>
            <li ref={this.firstImg}>
              <img
                src="https://github.com/LailaL88/test-task/blob/master/pic1.jpg?raw=true"
                alt=""
              ></img>
            </li>
          </div>
        </div>
        <nav>
          <button onClick={this.goToSlide(1)}></button>
          <button onClick={this.goToSlide(2)}></button>
          <button onClick={this.goToSlide(3)}></button>
          <button onClick={this.goToSlide(4)}></button>
          <button onClick={this.goToSlide(5)}></button>
          <button onClick={this.goToSlide(6)}></button>
          <button onClick={this.goToSlide(7)}></button>
        </nav>
      </div>
    );
  }
}

export default App;
