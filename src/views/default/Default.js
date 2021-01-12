// react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav'

// components
import ContactMe from './ContactMe';
import MySkills from './MySkills';


function Header(props) {
    var activeKey = "/home";
    var onSelect = (selectedKey) => alert('selected ${selectedKey}')
    return (
        <Container style={{}}>
            <Nav sticky="top" variant="pills" activeKey="{activeKey}" onSelect={onSelect}>
                <Nav.Item>
                    <Nav.Link href="/experience">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/skills">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/education">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/contact">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>{props.viewToggle}</Nav.Item>
            </ Nav>
        </Container>
    )
}

function DefaultView(props) {
    return (
        <Container>
            <Header viewToggle={props.viewToggle} />
            {/*
              <AboutMe />
              <WorkExperience />
              <Education />
            */}
            <MySkills />
            <ContactMe />
        </Container>
    )
}

export default DefaultView;