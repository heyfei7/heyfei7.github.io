import Card from 'react-bootstrap/Card';

function Section(props) {
  return (
    <Card id={props.title} className="mb-4">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.children}
      </Card.Body>
    </Card>
  )
}

export { Section };