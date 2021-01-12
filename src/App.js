import './App.css';

// Views
import { getData } from './common/util';
import DefaultView from "./views/default/Default"
import FiveStarsView from "./views/five-stars/FiveStars"

// React-Bootstrap
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';

function ViewToggle(props) {
  return (
    <Dropdown >
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        View
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => props.setView("default")}>Default</Dropdown.Item>
        <Dropdown.Item onClick={() => props.setView("five-stars")}>Five Stars</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

function App() {
  const [view, setView] = useState("five-stars");
  const [data, setData] = useState({});
  const getAllData = async () => {
    getData("contacts.json", (contacts) => {
      getData("experience.json", (exp) => {
        getData("skills.json", (skills) => {
          setData(Object.assign(contacts, exp, skills));
        })
      })
    })
  }

  useEffect(() => { getAllData(); }, []);
  return (
    <Container className="p-3">
      {
        (view == "default" && <DefaultView data={data} />) ||
        (view == "five-stars" && <FiveStarsView data={data} />)
      }
    </Container>
  );
}

export default App;
