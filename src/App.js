import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { Envelope, Github, Linkedin, TelephoneFill } from 'react-bootstrap-icons';


function Section(props) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.children}
      </Card.Body>
    </Card>
  )
}

function AboutMe(props) {
  return (
    <Section title="Fei Dong">
      Web Developer
      Software Programming
      Writer
    </Section>
  )
}

function WorkExperience(props) {
  return (
    <Section title="Work Experience">

    </Section>
  )
}

function MySkills(props) {
  return (
    <Section title="Skills">

    </Section>
  )
}

function Education(props) {
  return (
    <Section title="Education">

    </Section>
  )
}

function Contact(props) {
  return (
    <div>
      <div>{props.icon}</div>
      <p>{props.title}</p>
      <p>{props.value}</p>
    </div>
  )
}

function ContactMe(props) {
  const contacts = [
    { "title": "E-Mail", "value": "feidong1998@gmail.com", "icon": <Envelope /> },
    { "title": "Phone", "value": "(647) 233-3048", "icon":<TelephoneFill/> },
    { "title": "LinkedIn", "value": "@heyfei7", "link": "https://www.linkedin.com/in/heyfei7", "icon":<Linkedin/>},
    { "title": "GitHub", "value": "@heyfei7", "link": "https://github.com/heyfei7", "icon":<Github/> }
  ]
  const cols = [];

  for (let contact of contacts) {
    cols.push(
      <Col xs={6} md={3}>
        <Contact title={contact.title} value={contact.value} link={contact.link} icon={contact.icon}></Contact>
      </Col>)
  }

  return (
    <Section title="Contact Me">
      <Container><Row>{cols}</Row></Container>
      {/* write a thing to send auto-emails?? */}
    </Section>
  )
}

function App() {
  return (
    <Container className="p-3">
      <AboutMe />
      <WorkExperience />
      <MySkills />
      <Education />
      <ContactMe />
    </Container>
  );
}

export default App;
