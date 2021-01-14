import './App.css';
import { getJSON, getText } from './common/util';

// React
import { animateScroll as scroll } from "react-scroll";

// Views
import DianaView from "./views/diana/Diana"

// React-Bootstrap
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { ArrowBarUp, StarFill } from 'react-bootstrap-icons';
import { Button, ButtonGroup } from 'react-bootstrap';

var views = {
  "diana": { name: "Diana" },
  "starry-night": { name: "Starry Night", mobile: false }
}

function ViewToggle(props) {
  return (
    <Dropdown drop="up" id="view-toggle">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Change Design
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          Object.entries(views).map(([key, view]) => {
            return (
              <Dropdown.Item
                key={key}
                active={props.view == key}
                href={"#" + key}>
                {view.name}
              </Dropdown.Item>
            )
          })
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

function ScrollTop(props) {
  const [show, setShow] = useState(false)
  window.addEventListener("scroll", () => { setShow(window.pageYOffset > 200); });

  return (
    <Button id="scroll-top"
      className={"mobile-only" + (show ? "" : " display-none")}
      onClick={() => { scroll.scrollToTop(); }}>
      <ArrowBarUp />
    </Button>
  )
}

function LoadingScreen(props) {
  return (
    <div id="loading-screen">
      <div id="loading-star"><StarFill /></div>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true);

  const getHash = () => {
    const href = window.location.href;
    return href.substr(href.indexOf("#") + 1);
  }
  const [view, setView] = useState(getHash());
  window.addEventListener("hashchange", () => { setView(getHash()); });

  const [data, setData] = useState({});
  const getData = async () => {
    getJSON("contacts.json", (contacts) => {
      getJSON("experience.json", (exp) => {
        getJSON("skills.json", (skills) => {
          getText("aboutme.txt", (aboutme) => {
            skills.skills.sort((a, b) => { return b.level - a.level });
            setData(Object.assign(contacts, exp, skills, { aboutme: aboutme }));
            setLoading(false);
          })
        })
      })
    })
  }
  useEffect(() => { getData(); }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <ButtonGroup id="sticky-buttons">
        {window.pageYOffset > 100 && <ScrollTop />}
        <ViewToggle view={view} />
      </ButtonGroup>
      {((view == "diana" && <DianaView data={data} />) ||
        (<DianaView data={data} />))}
    </>
  );
}

export default App;
