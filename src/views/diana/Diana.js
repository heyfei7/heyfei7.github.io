import "./Diana.css"
import { getImageSource, getBootstrapDeviceSize, getIcon } from '../../common/util'

// React
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive'

// React Bootstrap
import { Row, Col, Carousel, Navbar, Nav } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const mobileQuery = { query: '(max-width: 750px)' };

function getStars(n) {
    const range = [...Array(n).keys()];
    return (
        <div className="star-container">
            {range.map((index) => { return <StarFill key={index} /> })}
        </div>
    )
}

function MyGallery(props) {
    const isMobile = useMediaQuery(mobileQuery);
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
                <Carousel style={{ width: "100%" }}>
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
        <Container>
            <div className="h-divider" />
            {Object.entries(data).map(([key, value]) => {
                return (
                    <Row key={key}>
                        <Col xs={3}><b>{key}</b></Col>
                        <Col xs={9}>{value}</Col>
                    </Row>
                )
            })}
            <div className="h-divider" />
            <h2>About Me</h2>
            <p>{props.data.aboutme}</p>

        </Container>
    )
}

function ContactMe(props) {
    const buttons = props.contacts &&
        props.contacts.length > 0 &&
        props.contacts.map(contact => {
            if (contact.link) {
                return (
                    <Button key={contact.title} className="secondary-bg" href={contact.link} block>
                        {getIcon(contact.icon)}
                        {" " + contact.title}
                    </Button>
                )
            }
        });
    return (
        <div>
            <Card className="laptop-only">
                <Card.Body>{buttons}</Card.Body>
            </Card>
            <div className="mobile-only">{buttons}</div>
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
        <Container>
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
            <Row key={work.title}>
                <Col md={6}>{work.title}</Col>
                <Col md={6}>{work.company}</Col>
            </Row>
        )
    }

    return (
        <Container>
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
    return (
        <Navbar
            collapseOnSelect
            className="primary-bg" expand="lg" variant="dark"
            style={{ "margin-bottom": "15px" }}>
            <Navbar.Brand href="#home">Fei Dong</Navbar.Brand>
            <Navbar.Toggle aria-controls="diana-view-navbar-nav" />
            <Navbar.Collapse id="diana-view-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">About Me</Nav.Link>
                    <Nav.Link href="#features">My Work</Nav.Link>
                    <Nav.Link href="#pricing">My Skills</Nav.Link>
                    <Nav.Link href="#pricing">Contact Me</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

function Footer(props) {
    return (
        <Container>whoop</Container>
    )
}

function DianaView(props) {
    return (
        <Container id="diana-view" className="view-root">
            <Header />
            <div className="mobile-only">
                <MyGallery />
                <MyName />
                <ContactMe contacts={props.data.contacts} />
                <MyDetails data={props.data} />
                <MyWork work={props.data.work} />
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
                <Col md={12} lg={9}><MyWork work={props.data.work} /></Col>
            </Row>
            <Footer />
        </Container>
    )
}

export default DianaView;