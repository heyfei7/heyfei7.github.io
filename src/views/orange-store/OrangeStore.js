import "./OrangeStore.css"
import { getIcon } from '../../common/util.js';

// React-Bootstrap
import { useState } from 'react';
import { Row, Col, Carousel, Badge, Collapse, Dropdown } from 'react-bootstrap';
import { CaretDownFill, CaretUpFill, StarFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

const colours = {

}

function ToggleSection(props) {
    const [show, setShow] = useState(true);
    return (
        <Card
            id={props.id}
            className="orange-store section toggle-section">
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
            className="orange-store section">
            {
                props.title &&
                <Card.Header
                    className="text-center">
                    <Row>
                        <Col xs={12}>{props.title}</Col>
                    </Row>
                </Card.Header>
            }
            <Card.Body id={props.id + "body"}>
                {props.children}
            </Card.Body>
        </Card >
    )
}

function AboutMe(props) {
    const ContactMe = (props) => {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Connect
            </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        props.contacts &&
                        props.contacts.length > 0 &&
                        props.contacts.map((contact) => {
                            if (contact.link) {
                                return (
                                    <Dropdown.Item href={contact.link} key={contact.title}>
                                        {getIcon(contact.icon)}
                                        {" " + contact.title}
                                    </Dropdown.Item>
                                )
                            }
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <Card id="about-me" className="orange-store section">
            <Card.Header>
                <Row>
                    <Col xs={3} md={3}>
                        <Image
                            src={process.env.PUBLIC_URL + "/images/icon.jpeg"}
                            style={{ "width": "inherit", "height": "inherit" }}
                            rounded />
                    </Col>
                    <Col xs={9} md={7}>
                        <h1>Fei Dong</h1>
                        <p>Web Developer | Software Programmer | Writer</p>
                        <p>Toronto, ON</p>
                    </Col>
                    <Col xs={6} md={1}><ContactMe contacts={props.contacts} /></Col>
                </Row>
            </Card.Header>
        </Card>
    )
}

function MyWork(props) {
    const WorkItem = (item) => {
        const workTitle = item.title + " @" + item.company;
        return (
            <Carousel.Item key={workTitle}>
                <Card>
                    <Card.Body style={{ "height": "100px", "background-color": "black" }}>
                        <Card.Title>{workTitle}</Card.Title>
                    </Card.Body>
                </Card>
            </Carousel.Item>
        )
    }

    return (
        <Section id="my-work" >
            <Carousel>
                {
                    props.work &&
                    props.work.length > 0 &&
                    props.work.map(WorkItem)
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

function MoreFromMe(props) {
    const data = props.data.publications;

    const MoreItem = (item) => {
        return (
            <Col xs={6} md={3}>
                <Card style={{ "height": "300px" }}>
                    <Card.Header>{item.title}</Card.Header>
                </Card>
            </Col>
        )
    }

    return (
        <ToggleSection title="More From Me">
            <Container>
                <Row>
                    {data && data.length > 0 && data.map(MoreItem)}
                </Row>
            </Container>
        </ToggleSection>
    )
}

function Footer(props) {
    const data = {
        "Version": "1.0.1",
        "Copyright": "2021",
        "E-Mail": "feidong1998@gmail.com",
        "Phone": "(647)-233-3048"
    }
    return (
        <Section>
            <Container>
                <Row>
                    {Object.entries(data).map(([key, value]) => {
                        return (
                            <Col className="text-center" key={key} xs={6} md={3}>
                                <b>{key}</b>
                                <br />
                                {value}
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </Section>
    )
}

function OrangeStoreView(props) {
    return (
        <Container className="view-root">
            <AboutMe contacts={props.data.contacts} />
            <MyWork work={props.data.work} />
            <MySkills skills={props.data.skills} />
            <MoreFromMe data={props.data} />
            <Footer />
        </Container>
    )
}

export default OrangeStoreView;