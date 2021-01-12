import React, { useEffect, useState } from 'react';
import { Section } from '../../components/Section';
import { getData, getIcon } from '../../common/util'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SkillItem(props) {
    return (
        <div>
            <p>{props.data.name}</p>
        </div>
    )
}

function SkillGroup(props) {
    return (
        <Container><Row>
            {
                props.items &&
                props.items.length > 0 &&
                props.items.map((item) =>
                    <Col xs={6} md={3} key={item.name}>
                        <SkillItem data={item} />
                    </Col>)
            }
        </Row></Container>
    )
}

function MySkills(props) {
    const [data, setData] = useState([]);
    useEffect(() => { getData("skills.json", setData) }, [])

    return (
        <Section title="Skills">
            <SkillGroup items={data && data.skills && data.skills.frontend} />
            <SkillGroup items={data && data.skills && data.skills.backend} />
            <SkillGroup items={data && data.skills && data.skills.database} />
            <SkillGroup items={data && data.skills && data.skills.os} />
            <SkillGroup items={data && data.skills && data.skills.other} />
        </Section>
    )
}

export default MySkills;