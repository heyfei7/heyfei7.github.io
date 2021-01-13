// React-Bootstrap
import { Envelope, Github, Linkedin, TelephoneFill } from 'react-bootstrap-icons';
import $ from 'jquery'

async function getJSON(filename, setData) {
    fetch("/data/" + filename, {
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then(setData);
}

async function getText(filename, setData) {
    fetch("/data/" + filename, {
        headers: {
            "Content-Type": "text/plain",
            'Accept': "text/plain"
        }
    }).then((response) => {
        response.text().then(setData);
    });
}

async function getHTML(filename, setData) {
    fetch("/docs/" + filename, {
        headers: {
            "Content-Type": "text/html",
            'Accept': "text/html"
        }
    }).then((response) => {
        response.text().then(setData);
    });
}

function getIcon(name) {
    switch (name) {
        case "Envelope": return <Envelope />; break;
        case "TelephoneFill": return <TelephoneFill />; break;
        case "Linkedin": return <Linkedin />; break;
        case "Github": return <Github />; break;
        default: console.error("No such icon:", name); break;
    }
}

function getImageSource(filename) {
    return process.env.PUBLIC_URL + "/images/" + filename;
}

function getBootstrapDeviceSize() {
    return $('#users-device-size').find('div:visible').first().attr('id');
}


export { getJSON, getText, getHTML, getIcon, getImageSource, getBootstrapDeviceSize };
