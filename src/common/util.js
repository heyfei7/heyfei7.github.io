// React-Bootstrap
import { ClipboardData, CpuFill, Envelope, Github, LaptopFill, Linkedin, DisplayFill, PlusCircleFill, TelephoneFill } from 'react-bootstrap-icons';
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
    switch (name.toLowerCase()) {
        case "envelope": return <Envelope />; break;
        case "telephonefill": return <TelephoneFill />; break;
        case "linkedin": return <Linkedin />; break;
        case "github": return <Github />; break;
        case "cpufill": return <CpuFill />; break;
        case "laptopfill": return <LaptopFill />; break;
        case "displayfill": return <DisplayFill />; break;
        case "clipboarddata": return <ClipboardData />; break;
        case "pluscirclefill": return <PlusCircleFill />; break;
        default: console.error("No such icon:", name); break;
    }
}

function getImageSource(filename) {
    return process.env.PUBLIC_URL + "/images/" + filename;
}

function getBootstrapDeviceSize() {
    return $('#users-device-size').find('div:visible').first().attr('id');
}



export {
    getJSON, getText, getHTML, getIcon,
    getImageSource, getBootstrapDeviceSize
};
