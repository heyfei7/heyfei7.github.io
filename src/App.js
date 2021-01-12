import './App.css';

// Views
import { views, getData } from './common/util';
import DefaultView from "./views/default/Default"
import FiveStarsView from "./views/five-stars/FiveStars"

// React-Bootstrap
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';

function ViewToggle(props) {
  return (
    <Dropdown drop="up" id="view-toggle">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Change Design
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          views.map((view) => {
            return (
              <Dropdown.Item
                key={view.key}
                active={props.view == view.key}
                onClick={() => props.setView(view.key)}>
                {view.name}
              </Dropdown.Item>
            )
          })
        }
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
          skills.skills.sort((a, b) => { return b.level - a.level });
          setData(Object.assign(contacts, exp, skills));
        })
      })
    })
  }

  useEffect(() => { getAllData(); }, []);
  return (
    <Container className="p-3">
      <ViewToggle view={view} setView={setView} />
      {
        (view == "default" && <DefaultView data={data} />) ||
        (view == "five-stars" && <FiveStarsView data={data} />)
      }
    </Container>
  );
}

export default App;
