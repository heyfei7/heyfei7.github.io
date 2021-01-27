import './App.css';
import { getJSON, getText } from './common/util';
import StarryNight, { StarryNightControl } from "./views/starry-night/StarryNight"
import Portfolio from "./views/portfolio/Portfolio";

// React
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Overlay, OverlayTrigger, Popover, PopoverTitle, PopoverContent } from 'react-bootstrap';
import { ArrowBarUp, StarFill, GearFill } from 'react-bootstrap-icons';
import { animateScroll as scroll } from "react-scroll";

function ScrollTop() {
  const [show, setShow] = useState(false)
  const handleScroll = () => {
    setShow(window.pageYOffset > 200);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Button
      id="scroll-top"
      className={(show ? "" : " display-none")}
      onClick={() => { scroll.scrollToTop(); }}>
      <ArrowBarUp />
    </Button>
  )
}

function LoadingScreen() {
  return (
    <div id="loading-screen">
      <div id="loading-star"><StarFill /></div>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true);

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

  const defaultState = StarryNightControl.getDefault();
  const [state, setState] = useState(defaultState);

  const SettingPopover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <StarryNightControl
          default={defaultState}
          onStateChange={(newState) => { setState(newState); }} />
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading &&
        <Container className="view-root" fluid>
          <StarryNight config={state} />
          <div id="toolbar">
            <ScrollTop />
            <OverlayTrigger trigger="click" overlay={SettingPopover}>
              <Button><GearFill /></Button>
            </OverlayTrigger>
          </div>
          <Portfolio data={data} />
        </Container>}
    </>
  );
}

export default App;
