import "./Portfolio.css"

import { Container, Row } from "react-bootstrap";
import { Title2, CardsSection } from "../../common/components";
import MySkills from "./Skills"

function ContactItem(props) {
    return (
        <span>{props.title}</span>
    )
}

function AboutMe(props) {
    return (
        <div>
            <h1>FEI DONG</h1>
            <div>
                {props.contacts.map((x, i) => <ContactItem key={i} title={x.title} />)}
            </div>
        </div>
    )
}

function Portfolio(props) {
    const { aboutme, contacts, publications, skills, work } = props.data;
    return (
        <Container id="my-portfolio">
            <AboutMe content={aboutme} contacts={contacts} />
            <Title2>Work Experience</Title2>
            <CardsSection
                items={work}
                getTitle={(item) => item.company}
                getBody={(item) => item.company}
            />
            <Title2>Publications</Title2>
            <CardsSection
                items={publications}
                getTitle={(item) => item.company}
                getBody={(item) => item.company}
            />
            <Title2>Skills</Title2>
            <MySkills skills={skills} />
            <div>Footer</div>
        </Container>
    )
}

export default Portfolio;