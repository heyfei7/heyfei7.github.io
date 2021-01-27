import { Card, Row, Col } from "react-bootstrap";

function Title2(props) {
    return (<Row><h2>{props.children}</h2></Row>);
}

function CardsSection(props) {
    const cards = props.items && props.items.map((item, index) => {
        return (
            <Col key={index} lg={3} md={4} sm={6} xs={12}>
                <Card>
                    <Card.Header>{props.getTitle(item)}</Card.Header>
                    <Card.Body>{props.getBody(item)}</Card.Body>
                </Card>
            </Col>
        )
    });

    return (
        <>
            <Row>{cards}</Row>
        </>
    );
}

export { Title2, CardsSection };