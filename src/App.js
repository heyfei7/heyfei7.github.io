import './App.css';
import { getJSON, getText, getHTML } from './common/util';

// Views
import OrangeStoreView from "./views/orange-store/OrangeStore"
import DianaView from "./views/diana/Diana"

// React-Bootstrap
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

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

var views = [
  { key: "orange-store", name: "Orange Store" },
  { key: "diana", name: "Diana" }
]

function App() {
  const [view, setView] = useState("diana");

  const [data, setData] = useState({});
  const getData = async () => {
    getJSON("contacts.json", (contacts) => {
      getJSON("experience.json", (exp) => {
        getJSON("skills.json", (skills) => {
          getText("aboutme.txt", (aboutme) => {
            skills.skills.sort((a, b) => { return b.level - a.level });
            setData(Object.assign(contacts, exp, skills, { aboutme: aboutme }));
          })
        })
      })
    })
  }
  useEffect(() => { getData(); }, []);

  return (
    <div>
      <ViewToggle view={view} setView={setView} />
      {
        (view == "orange-store" && <OrangeStoreView data={data} />) ||
        (view == "diana" && <DianaView data={data} />)
      }
    </div>
  );
}

export default App;
