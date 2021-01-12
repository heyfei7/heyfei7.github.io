import React, { useEffect, useState } from 'react';
import { Section } from '../../components/Section';
import { getData, getIcon } from '../../common/util'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ContactItem(props) {
    return (
        <div>
            <div>{props.icon}</div>
            <p>{props.title}</p>
            <p>{props.value}</p>
        </div>
    )
}

function ContactMe(props) {
    const [data, setData] = useState([]);
    useEffect(() => { getData("contacts.json", setData) }, [])
    return (
        <Section title="Contact Me">
            <Container><Row>
                {
                    data &&
                    data.contacts &&
                    data.contacts.length > 0 &&
                    data.contacts.map((contact) =>
                        <Col xs={6} md={3} key={contact.title}>
                            <ContactItem
                                title={contact.title}
                                value={contact.value}
                                link={contact.link}
                                icon={getIcon(contact.icon)} />
                        </Col>)
                }
            </Row></Container>
            {/* write a thing to send auto-emails?? */}
        </Section>
    )
}

export default ContactMe;