// React-Bootstrap
import { Envelope, Github, Linkedin, TelephoneFill } from 'react-bootstrap-icons';

async function getData(filename, setData) {
    const filepath = "/data/" + filename;
    fetch(filepath, {
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
        }
    }).then(function (response) {
        return response.json();
    }).then(setData);
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

export { getData, getIcon };
