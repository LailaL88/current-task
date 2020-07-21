import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import "./App.scss";
import Slides from "./slides.js"
import Buttons from "./buttons.js"

let count = 1;
let query = window.matchMedia("(max-width: 686px)");
let size = 680;

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
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.swipe = this.swipe.bind(this);
    this.moveTouch = this.moveTouch.bind(this);
  }

  componentDidMount(){
    let firstSlide = this.slider.current.children[0].cloneNode(true);
    let lastSlide = this.slider.current.children[this.slider.current.children.length - 1].cloneNode(true);
    this.slider.current.insertBefore(lastSlide, this.slider.current.children[0]);
    this.slider.current.append(firstSlide);
    
  }

  swipe() {
    this.slider.current.addEventListener("touchstart", this.startTouch, false);
    this.slider.current.addEventListener("touchmove", this.moveTouch, false);
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
        this.next();
      } else {
        this.previous();
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
      if (count === 0) {
        this.slider.current.style.transition = "none";
        count = this.slider.current.children.length - 2;
        this.slider.current.style.transform =
          "translateX(" + -size * count + "px)";
      }
    });
  }

  next() {
    if (query.matches) {
      size = 240;
    }
    if (count >= this.slider.current.children.length -1) return;
    count++;
    this.slider.current.style.transform = "translateX(" + -size * count + "px)";
    this.slider.current.style.transition = "transform 1s ease-in-out";
    this.slider.current.addEventListener("transitionend", () => {
      if (count === this.slider.current.children.length -1) {
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
            <Slides />
          </div>
        </div>
        <nav>
      <Buttons goToSlide = {this.goToSlide}/>
        </nav>
      </div>
    );
  }
}

export default App;
