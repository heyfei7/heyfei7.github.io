import "./StarryNight.css"
import { getImageSource, getIcon } from '../../common/util'

// React
import React, { useState } from 'react';
import { Link } from "react-scroll";

// React Bootstrap
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { Sliders, StarFill } from 'react-bootstrap-icons';
// import Container from 'react-bootstrap/Container';

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
        return <StarFill
            className={this.className}
            key={[this.x, this.y].toString()}
            style={this.style()} />
    }
}

class StarryNight extends React.Component {

    static jitter(n, delta) {
        return n + delta * (Math.random() * 2 - 1);
    }

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

    static jitterStarPosition(stars, freq, jitterPosition) {
        const interval = StarryNight.getInterval(freq);
        const deltaPosition = 0.70 * interval * jitterPosition + 0.25 * interval;
        stars.map(star => {
            star.x = StarryNight.jitter(star.baseX, deltaPosition)
            star.y = StarryNight.jitter(star.baseY, deltaPosition)
            return star;
        })
    }

    static scaleStarSize(stars, starSize) {
        const baseSize = starSize * 2 + 0.25;
        stars.map(star => {
            star.size = baseSize + StarryNight.jitter(1, baseSize);
            return star;
        })
    }

    constructor(props) {
        super(props);
        this.updateStars();
    }

    updateStars() {
        const { width, height, freq, jitterPosition, starSize } = this.props.config;
        this.stars = StarryNight.getStars(width, height, freq);
        StarryNight.jitterStarPosition(this.stars, freq, jitterPosition);
        StarryNight.scaleStarSize(this.stars, starSize);
    }

    render() {
        this.updateStars();
        return (
            <Container id="starry-night" className={this.props.config.twinkle ? "twinkle" : ""} fluid>
                {this.stars.map(x => x.get())}
            </Container>
        )
    }
}

function StarryNightControl(props) {
    const [form, _setForm] = useState(props.state);
    const setForm = (key, value) => {
        _setForm((prevState) => Object.assign({}, prevState, ({ [key]: value })));
    }

    console.log("form", form);

    const RangeControl = (props) => {
        return (
            <input
                min={0} max={1}
                value={form[props.name]}
                type="range"
                step={0.05}
                onChange={(event) => {
                    event.preventDefault();
                    setForm(props.name, parseFloat(event.target.value));
                }}
            />
        )
    }

    const CheckboxControl = (props) => {
        return (
            <input
                type="checkbox"
                checked={form[props.name]}
                onChange={(event) => {
                    event.preventDefault();
                    setForm(props.name, event.target.checked);
                }}
                readOnly />
        )
    }

    const SelectControl = (props) => {
        const item = controls[props.name]
        return (
            <select
                value={form[props.name]}
                onChange={(event) => {
                    event.preventDefault();
                    setForm(props.name, event.target.value);
                }}>
                {item.options.map((x, i) => <option key={i} value={x}>{x}</option>)}
            </select>
        )
    }

    const ControlRow = (props) => {
        const item = controls[props.name];
        const id = "starry-night-control-" + props.name;
        return (
            <Row>
                <Col><label htmlFor={id}>{item.name}</label></Col>
                <Col>
                    {item.type == "range" && <RangeControl id={id} name={props.name} />}
                    {item.type == "checkbox" && <CheckboxControl id={id} name={props.name} />}
                    {item.type == "select" && <SelectControl id={id} name={props.name} />}
                </Col>
            </Row>
        )
    }

    return (
        <Card id="starry-night-controls" >
            <Card.Body>
                {Object.keys(controls).map((key) => <ControlRow key={key} name={key} />)}
                <Row>
                    <Col>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => { props.setState(form) }}>
                            Submit!
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card >
    )
}

function StarryNightView(props) {
    const getDefaultControl = () => {
        return Object.entries(controls).reduce(
            (total, [key, value]) => {
                total[key] = value.default;
                return total;
            }, {
            height: window.innerHeight,
            width: window.innerWidth
        });
    }

    const [state, setState] = useState(getDefaultControl());

    /*
    window.onresize = function () {
        setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }*/

    console.log("state", state);

    return (
        <Container id="starry-night-view" className="view-root" fluid>
            <StarryNight config={state} />
            <StarryNightControl state={state} setState={setState} />
        </Container>
    )
}

export default StarryNightView;