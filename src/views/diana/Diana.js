import "./Diana.css"
import { getImageSource, getIcon, siteData } from '../../common/util'

// React
import { useState } from 'react';
import { Link } from "react-scroll";

// React Bootstrap
import { Row, Col, Carousel, Navbar, Nav, Badge } from 'react-bootstrap';
import { ArrowLeftCircleFill, ArrowRightCircleFill, StarFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function getStars(n) {
    const range = [...Array(n).keys()];
    return (
        <div className="star-container">
            {range.map((index) => { return <StarFill key={index} /> })}
        </div>
    )
}

function MyGallery(props) {
    const [source, setSource] = useState("icon.jpeg")

    const images = ["icon.jpeg", "Hiking3.jpg", "Shanghai1.JPG", "Hiking4.jpg", "WonderCon2.JPG"]
    const getPreviewImage = (src) => {
        const className = "gallery-preview-image pointer " + ((src == source) ? " active" : "");
        return (
            <Image
                className={className}
                key={src}
                onClick={() => setSource(src)}
                src={getImageSource(src)}
                rounded />
        )
    }

    return (
        <Container className="gallery">
            <Row className='mobile-only'>
                <Carousel
                    style={{ width: "100%" }}
                    nextIcon={<ArrowRightCircleFill />}
                    prevIcon={<ArrowLeftCircleFill />}>
                    {images.map((src) => {
                        return (
                            <Carousel.Item key={src}>
                                <Image className="gallery-image" src={getImageSource(src)} rounded />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </Row>
            <Row className='laptop-only'>
                <Col xs={12} className="gallery-preview">{images.map(getPreviewImage)}</Col>
                <Col xs={12}><Image className="gallery-image" src={getImageSource(source)} rounded /></Col>
            </Row>
        </Container>
    )
}

function MyName(props) {
    return (
        <Container>
            <h1>Fei Dong</h1>
            <em>Web Developer | Software Programmer | Writer</em>
            <br />
            {getStars(5)}
        </Container>
    )
}

function MyDetails(props) {
    const data = {
        "E-Mail": "feidong1998@gmail.com",
        "Location": "Toronto, ON",
        "Education": <div>
            University of Waterloo<br />
            Bachelor of Computer Science<br />
            English Minor
        </div>,
        "Specialities": "Web Development, Full-Stack Development"
    }

    return (
        <Container id="about-me">
            <div className="laptop-only h-divider" />
            {Object.entries(data).map(([key, value]) => {
                return (
                    <Row key={key}>
                        <Col xs={3}><b>{key}</b></Col>
                        <Col xs={9}>{value}</Col>
                    </Row>
                )
            })}
            <div className="laptop-only h-divider" />
            <h2 className="mt-3">About Me</h2>
            <p>{props.data.aboutme}</p>
        </Container>
    )
}

function ContactMe(props) {
    const buttons = props.contacts &&
        props.contacts.length > 0 &&
        props.contacts.map(contact => {
            return (
                <Button key={contact.title} className="secondary-bg secondary-border hover" href={contact.link} block>
                    {getIcon(contact.icon)}
                    {" " + contact.title}
                </Button>
            )
        });
    return (
        <div id="contact-me">
            <Card className="laptop-only">
                <Card.Body>{buttons}</Card.Body>
            </Card>
            <div className="mobile-only m-3">{buttons}</div>
        </div>
    )
}

function MySkills(props) {
    const getSkill = (skill) => {
        return (
            <Row key={skill.name}>
                <Col md={6}>{skill.name}</Col>
                <Col md={6}>{getStars(skill.level)}</Col>
            </Row>
        )
    }
    return (
        <Container id="my-skills">
            <h2>Skills</h2>
            {
                props.skills &&
                props.skills.length > 0 &&
                props.skills.filter((skill) => { return skill.type == "frontend" }).map(getSkill)
            }
        </Container>
    )
}

function MyWork(props) {
    const getWork = (work) => {
        return (
            <Container key={work.title + work.company} className="work-section mt-3 mb-3">
                <Row>
                    <Col xs={1}><Image className="work-company-icon" src={getImageSource(work.icon)} roundedCircle /></Col>
                    <Col xs={8} className="work-header pl-4">
                        <div>
                            <span className="work-title">{work.title}</span>
                            <span className="work-company">{" @" + work.company}</span>
                        </div>
                        <div className="work-duration">{work.startTime + " ~ " + work.endTime}</div>
                        <ul className="work-desc-container pl-3 mb-0">
                            {work.description &&
                                work.description.length > 0 &&
                                work.description.map((desc, index) => {
                                    return (
                                        <li key={index} className="work-desc">{desc}</li>
                                    )
                                })}
                        </ul>
                    </Col>
                    <Col xs={12} md={3} className="work-stack">
                        {work.stack &&
                            work.stack.length > 0 &&
                            work.stack.map((skill, index) => {
                                return (
                                    <Badge key={index} className="work-skill pointer secondary-bg hover mr-1">{skill}</Badge>
                                )
                            })}
                    </Col>
                </Row>
                <Row>
                </Row>
            </Container>
        )
    }

    return (
        <Container id="my-work">
            <h2>Experience</h2>
            {
                props.work &&
                props.work.length > 0 &&
                props.work.map(getWork)
            }
        </Container>
    )
}

function Header(props) {
    const sections = [
        {
            "id": "contact-me",
            "name": "Contact Me",
            "mobileOnly": true
        },
        {
            "id": "about-me",
            "name": "About Me",
            "mobileOnly": true
        },
        {
            "id": "my-work",
            "name": "My Work",
            "mobileOnly": false
        },
        {
            "id": "my-skills",
            "name": "My Skills",
            "mobileOnly": false
        }
    ]

    return (
        <Navbar
            collapseOnSelect
            className="primary-bg" expand="lg" variant="dark"
            style={{ "marginBottom": "15px" }}>
            <Navbar.Brand href="#home">Fei Dong</Navbar.Brand>
            <Navbar.Toggle aria-controls="diana-view-navbar-nav" />
            <Navbar.Collapse id="diana-view-navbar-nav">
                <Nav className="mr-auto">
                    {sections.map((section, index) => {
                        return (
                            <Navbar.Text key={index} className="nav-link mobile-only">
                                <Link className="pointer" to={section.id} spy={true} smooth={true} offset={-25} duration={500}>
                                    {section.name}
                                </Link>
                            </Navbar.Text>
                        )
                    })}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

function Footer(props) {
    return (
        <Container fluid className="p-0 mt-3">
            <div className="fifth-bg p-3"></div>
            <div className="primary-bg p-3 text-center text-light">
                <div>{"Site Version " + siteData.version}</div>
                <div>{siteData.copyright + " © " + siteData.owner}</div>
            </div>
        </Container>
    )
}

function DianaView(props) {
    return (
        <Container id="diana-view" className="view-root" fluid>
            <Header />
            <div className="mobile-only">
                <MyGallery />
                <MyName />
                <ContactMe contacts={props.data.contacts} />
                <MyDetails data={props.data} />
                <MyWork work={props.data.work} skills={props.data.skills} />
                <MySkills skills={props.data.skills} />
            </div>
            <Row className="laptop-only">
                <Col md={12} lg={3}><MyGallery /></Col>
                <Col md={12} lg={6}>
                    <MyName data={props.data} />
                    <MyDetails data={props.data} />
                </Col>
                <Col md={12} lg={3}><ContactMe contacts={props.data.contacts} /></Col>
            </Row>
            <Row className="laptop-only">
                <Col md={12} lg={3}><MySkills skills={props.data.skills} /></Col>
                <Col md={12} lg={6}><MyWork work={props.data.work} skills={props.data.skills} /></Col>
            </Row>
            <Footer />
        </Container>
    )
}

export default DianaView;