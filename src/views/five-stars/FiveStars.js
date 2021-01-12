
import "./FiveStars.css"
import { getIcon } from '../../common/util.js';

// React-Bootstrap
import { useState } from 'react';
import { Row, Col, Button, Carousel, Badge, Collapse } from 'react-bootstrap';
import { CaretDownFill, CaretUpFill, List, Star, StarFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

function ToggleSection(props) {
    const [show, setShow] = useState(true);
    return (
        <Card
            id={props.id}
            className="five-stars section toggle-section">
            <Card.Header
                className="text-center pointer"
                onClick={() => setShow(!show)}
                aria-controls={props.id + "-body"}
                aria-expanded={show}>
                {props.title + " "}
                {show && <CaretUpFill />}
                {!show && <CaretDownFill />}
            </Card.Header>
            <Collapse in={show}>
                <Card.Body id={props.id + "body"}>
                    {props.children}
                </Card.Body>
            </Collapse>
        </Card>
    )
}

function Section(props) {
    return (
        <Card
            id={props.id}
            className="five-stars section">
            <Card.Header
                className="text-center">
                <Row>
                    <Col xs={12}>{props.title}</Col>
                </Row>
            </Card.Header>
            <Card.Body id={props.id + "body"}>
                {props.children}
            </Card.Body>
        </Card >
    )
}

function AboutMe(props) {
    return (
        <Card id="about-me" className="five-stars section">
            <Card.Header>
                <Row>
                    <Col xs={3} md={3}>
                        <Image
                            src={process.env.PUBLIC_URL + "/images/icon.jpeg"}
                            style={{ "width": "inherit", "height": "inherit" }}
                            rounded />
                    </Col>
                    <Col xs={9} md={9}>
                        <h1>Fei Dong</h1>
                        <p>Web Developer | Software Programmer | Writer</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}><Button>Contact Me</Button></Col>
                    <Col xs={6}></Col>
                </Row>
            </Card.Header>
        </Card>
    )
}

function Experience(props) {
    const ExpItem = (item) => {
        console.log("helloworld?");
        return (
            <Carousel.Item>
                {console.log("whoop", item)}
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=373940"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    return (
        <Section id="my-experience" title="Experience">
            <Carousel>
                {
                    props.experience &&
                    props.experience > 0 &&
                    props.experience.map(ExpItem)
                }
            </Carousel>
        </Section>
    )
}

function MySkills(props) {
    const [state, setState] = useState({ "frontend": true, "backend": true, "os": false, "others": false, "database": false });

    const setKeyValue = (key, value) => {
        var tmpState = {};
        tmpState[key] = value;
        setState((Object.assign({}, state, tmpState)));
    }

    const Stars = (props) => {
        return (
            <div>
                {
                    [...Array(props.level).keys()].map((key) => {
                        return <StarFill key={key} />
                    })
                }
            </div>
        )
    }

    const SkillItem = (item) => {
        if (state[item.type]) {
            return (
                <Col xs={4} md={3} key={item.name} className="text-center" >
                    {item.name}
                    <Stars level={item.level} />
                </Col>
            )
        }
    }

    return (
        <ToggleSection id="my-skills" title="Skills">
            {
                Object.entries(state).map(([key, value]) => {
                    return (
                        <Badge pill
                            className="pointer"
                            key={key}
                            onClick={() => setKeyValue(key, !value)}
                            variant={value ? "info" : "light"}>{key}</Badge>
                    )
                })
            }
            <Row>
                {
                    props.skills &&
                    props.skills.length > 0 &&
                    props.skills.map(SkillItem)
                }
            </Row>
        </ToggleSection >
    )
}

function ContactMe(props) {
    const ContactItem = (item) => {
        return (
            <Row key={item.title}>
                <Col xs={1}>{getIcon(item.icon)}</Col>
                <Col xs={11}>
                    <b>{item.title}</b><br />
                    {item.value}
                </Col>
            </Row>
        )
    }

    return (
        <ToggleSection id="contact-me" title="Contact Me">
            {
                props.contacts &&
                props.contacts.length > 0 &&
                props.contacts.map(ContactItem)
            }
        </ToggleSection>
    )
}

function FiveStarsView(props) {
    return (
        <Container>
            <AboutMe />
            <Experience experience={props.data.experience} />
            <MySkills skills={props.data.skills} />
            <ContactMe contacts={props.data.contacts} />
        </Container>
    )
}

export default FiveStarsView;