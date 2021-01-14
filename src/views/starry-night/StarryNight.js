import "./StarryNight.css"
import { getImageSource, getIcon } from '../../common/util'

// React
import React, { useState } from 'react';
import { Link } from "react-scroll";

// React Bootstrap
import { Row, Col, Card, Form, Container } from 'react-bootstrap';
import { Sliders, StarFill } from 'react-bootstrap-icons';
// import Container from 'react-bootstrap/Container';

class Star {
    constructor(baseX, baseY, size, color) {
        this.baseX = baseX;
        this.baseY = baseY;
        this.x = baseX;
        this.y = baseY;
        this.size = size;
        this.color = color || "white";
        this.className = "star fade-out " + (Math.random() < 0.5 ? "twinkle1" : "twinkle2")
    }

    style() {
        return {
            position: "absolute",
            top: this.y,
            left: this.x,
            height: this.size.toString() + "px",
            width: this.size.toString() + "px",
            color: this.color
        }
    }

    get() {
        return <StarFill className={this.className} key={[this.x, this.y].toString()} style={this.style()} />
    }
}

function jitter(n, delta) {
    return n + delta * (Math.random() * 2 - 1);
}

class StarryNight extends React.Component {

    static getInterval(freq) {
        var interval = 20;
        if (freq == "less") {
            interval = 80;
        } else if (freq == "medium") {
            interval = 40;
        }
        return interval;
    }

    static getStars(height, width, freq) {
        var stars = [];
        const interval = StarryNight.getInterval(freq);
        for (var y = 0; y < height; y += interval) {
            for (var x = 0; x < width; x += interval) {
                stars.push(new Star(y, x, 0.5));
            }
        }
        return stars;
    }

    jitterStarPosition(freq, jitterPosition) {
        const interval = StarryNight.getInterval(freq);
        const deltaPosition = 0.70 * interval * jitterPosition + 0.25 * interval;
        this.stars = this.stars.map(star => {
            star.x = jitter(star.baseX, deltaPosition)
            star.y = jitter(star.baseY, deltaPosition)
            return star;
        })
    }

    scaleStarSize(starSize) {
        /*const deltaSize = jitterSize / 2;*/
        const baseSize = starSize * 2 + 0.25;
        this.stars = this.stars.map(star => {
            star.size = baseSize + jitter(1, baseSize);
            return star;
        })
    }

    getStars(width, height, freq, jitterPosition, starSize) {
        console.log(freq);
        this.stars = StarryNight.getStars(width, height, freq);
        this.jitterStarPosition(freq, jitterPosition);
        this.scaleStarSize(starSize);
    }

    constructor(props) {
        super(props);
        this.updateTimer = null;
        this.lastUpdate = Date.now();
        this.getStars(props.state.width, props.state.height,
            props.state.freq,
            props.state.jitterPosition, props.state.starSize);
    }

    updateStars(prevState, state) {
        if (prevState.jitterPosition != state.jitterPosition) {
            this.jitterStarPosition(state.freq, state.jitterPosition);
        }
        if (prevState.starSize != state.starSize) {
            this.scaleStarSize(state.starSize);
        }
        if (prevState.freq != state.freq) {
            this.getStars(state.width, state.height,
                state.freq,
                state.jitterPosition, state.starSize);
        }
    }

    componentDidUpdate(prevProps) {
        this.updateStars(prevProps.state, this.props.state);
        if (this.props.userID !== prevProps.userID) {
            this.fetchData(this.props.userID);
        }
    }

    render() {
        return (
            <Container id="starry-night" className={this.props.state.twinkle ? "twinkle" : ""} fluid>
                {this.stars.map(x => x.get())}
            </Container>
        )
    }
}

const controls = {
    twinkle: {
        name: "Twinkle",
        type: "checkbox",
        default: true
    },
    freq: {
        name: "Frequency",
        type: "select",
        options: ["less", "medium", "more"],
        default: "medium"
    },
    jitterPosition: {
        name: "Position Jitter",
        type: "range",
        default: 0.5
    },
    starSize: {
        name: "Star Size",
        type: "range",
        default: 0.5
    }
}

function StarryNightControl(props) {
    return (
        < Card id="starry-night-controls" >
            <Card.Body>
                {Object.entries(controls).map(([key, item]) => {
                    const id = "starry-night-control-" + key;
                    return (
                        <Row key={key}>
                            <Col><label htmlFor={id}>{item.name}</label></Col>
                            <Col>
                                {item.type == "range" &&
                                    <input
                                        id={id}
                                        min={0} max={1}
                                        value={props.state[key]}
                                        type="range"
                                        step={0.05}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            props.setState(key, parseFloat(event.target.value));
                                        }}
                                    />}
                                {item.type == "checkbox" &&
                                    <input id={id}
                                        type="checkbox"
                                        checked={props.state[key]}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            props.setState(key, event.target.checked)
                                        }}
                                        readOnly />}
                                {item.type == "select" &&
                                    <select id={id}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            props.setState(key, event.target.value)
                                        }}>
                                        {item.options.map(x => <option value={x}>{x}</option>)}
                                    </select>}
                            </Col>
                        </Row>
                    )
                })}
            </Card.Body>
        </Card >)
}

function StarryNightView(props) {

    const acc = (total, [key, value]) => {
        total[key] = value.default;
        return total;
    }
    const init = {
        height: window.innerHeight,
        width: window.innerWidth
    }
    const [state, setState] = useState(Object.entries(controls).reduce(acc, init));

    const setKeyValue = (key, value) => {
        var tmp = {}
        tmp[key] = value;
        setState(Object.assign({}, state, tmp));
    }

    window.onresize = function () {
        setKeyValue("height", window.innerHeight);
        setKeyValue("width", window.innerWidth);
    }

    return (
        <Container id="starry-night-view" className="view-root" fluid>
            <StarryNight state={state} setState={setState} />
            <StarryNightControl state={state} setState={setKeyValue} />
        </Container>
    )
}

export default StarryNightView;