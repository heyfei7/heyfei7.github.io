import { version } from "../../package.json"

const siteData = {
    version: version,
    copyright: "Copyright 2021",
    owner: "Fei Dong"
}

const skillLevels = {
    3: "Familiar",
    4: "Proficient",
    5: "Expert"
}

const skillTypes = {
    "frontend": { name: "Front-End", icon: "DisplayFill" },
    "backend": { name: "Back-End", icon: "LaptopFill" },
    "database": { name: "Database", icon: "ClipboardData" },
    "os": { name: "OS", icon: "CpuFill" },
    "other": { name: "Other", icon: "PlusCircleFill" }
}

export {
    siteData, skillLevels, skillTypes
};