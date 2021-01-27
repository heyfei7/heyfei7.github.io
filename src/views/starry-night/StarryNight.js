import "./StarryNight.css"

// React
import React from 'react';
import { Row, Col, Card, Button, Container, ButtonGroup } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';

class Star {
    constructor(baseX, baseY, size, color) {
        this.baseX = baseX;
        this.baseY = baseY;
        this.x = baseX;
        this.y = baseY;
        this.size = size;
        this.color = color || "white";
        this.className = "star fade-out " + (Math.random() < 0.5 ? "twinkle1" : "twinkle2");
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

    static getStars(height, width, freq, jitterPosition, starSize) {
        var stars = [];
        const interval = StarryNight.getInterval(freq);
        const deltaPosition = 0.70 * interval * jitterPosition + 0.25 * interval;
        const baseSize = starSize * 2 + 0.25;
        for (var y = 0; y < height; y += interval) {
            for (var x = 0; x < width; x += interval) {
                var star = new Star(y, x, 0.5);
                star.x = StarryNight.jitter(star.baseX, deltaPosition);
                star.y = StarryNight.jitter(star.baseY, deltaPosition);
                star.size = baseSize + StarryNight.jitter(1, baseSize);
                stars.push(star);
            }
        }
        return stars;
    }

    constructor(props) {
        super(props);
        this.state = { ...props.config }
        this.updateStars();
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState((prevState) => (Object.assign(prevState, {
                height: window.innerHeight,
                width: window.innerWidth
            })));
        });
    }

    updateStars() {
        const { width, height, freq, jitterPosition, starSize } = this.state;
        this.stars = StarryNight.getStars(width, height, freq, jitterPosition, starSize);
    }

    render() {
        this.updateStars();
        return (
            <Container id="starry-night" className={this.state.twinkle ? "twinkle" : ""} fluid>
                {this.stars.map(x => x.get())}
            </Container>
        )
    }
}

class StarryNightControl extends React.Component {

    static controls = {
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

    static getDefault() {
        return Object.entries(StarryNightControl.controls).reduce(
            (total, [key, value]) => {
                total[key] = value.default;
                return total;
            },
            {
                height: window.innerHeight,
                width: window.innerWidth
            });
    }

    constructor(props) {
        super(props);
        this.state = props.default;
    }

    resetState() {
        this.setState(() => { return this.props.default });
    }

    render() {

        const updateState = (key, value) => {
            this.setState((prevState) => {
                return Object.assign({}, prevState, ({ [key]: value }));
            });
        }

        const ControlRow = (props) => {
            const name = props.name,
                control = StarryNightControl.controls[name],
                id = "starry-night-control-" + name;

            return (
                <Row>
                    <Col><label htmlFor={id}>{control.name}</label></Col>
                    <Col>
                        {control.type == "range" &&
                            <input
                                id={id}
                                min={0} max={1}
                                value={this.state[name]}
                                type="range"
                                step={0.05}
                                onChange={(event) => {
                                    event.preventDefault();
                                    updateState(name, parseFloat(event.target.value));
                                }} />}
                        {control.type == "checkbox" &&
                            <input
                                id={id}
                                type="checkbox"
                                checked={this.state[name]}
                                onChange={(event) => {
                                    event.preventDefault();
                                    updateState(name, event.target.checked);
                                }}
                                readOnly />}
                        {control.type == "select" &&
                            <select
                                id={id}
                                value={this.state[name]}
                                onChange={(event) => {
                                    event.preventDefault();
                                    updateState(name, event.target.value);
                                }}>
                                {control.options.map((x, i) => <option key={i} value={x}>{x}</option>)}
                            </select>}
                    </Col>
                </Row>
            )
        }

        return (
            <Container >
                {Object.keys(StarryNightControl.controls).map((key) => <ControlRow key={key} name={key} />)}
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => { this.props.onStateChange(this.state) }}>
                                Submit
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                    this.resetState();
                                    this.props.onStateChange(this.props.default);
                                }}>
                                Reset
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container >
        )
    }

}

export default StarryNight;
export { StarryNightControl };