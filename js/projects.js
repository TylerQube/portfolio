const createProject = (proj) => {
    const color = proj["color"];

    const projectCont = document.createElement('div');
    projectCont.classList.add("project");
    projectCont.style.borderColor =  color;
    projectCont.classList.add("hide-width", "hide-height");

    const project = document.createElement("div");
    project.classList.add("project-padding");

    // ### PROJECT INFO ### //
    const infoCont = document.createElement('div');
    infoCont.classList.add("project-info");

    const title = document.createElement("h2");
    title.textContent = proj["title"];
    title.style.color =  color;
    infoCont.appendChild(title);


    // ASCII
    if(proj["ascii_file"] != "") {
        const acont = document.createElement("div");
        acont.classList.add("ascii-cont");
        const ascii = document.createElement("pre");
        ascii.id = proj["ascii_file"].slice(0, proj["ascii_file"].indexOf(".")) + "-ascii";
        ascii.style.color = color;
        ascii.classList.add("ascii");

        acont.appendChild(ascii);
        infoCont.appendChild(acont);

        showAscii(proj["ascii_file"], ascii.id);
    }


    // Text Blocks
    for(const infoBlock of proj["text"]) {
        const block = document.createElement("div");
        for(const line of infoBlock) {
            const p = document.createElement("p");
            p.textContent = "* " + line;
            block.appendChild(p);
        }
        infoCont.appendChild(block);
    }


    // Technologies
    const techCont = document.createElement("div");

    const techTitle = document.createElement("p");
    techTitle.textContent = "Technologies:";
    techTitle.style.color =  color;
    techCont.appendChild(techTitle);

    const list = document.createElement("p");
    for(const tech of proj["technologies"]) {
        list.textContent += tech + ", ";
    }
    list.textContent = list.textContent.slice(0, -2);
    techCont.appendChild(list);
    infoCont.appendChild(techCont);


    project.appendChild(infoCont);
    // ### END PROJECT INFO ### //

    // ### BUTTONS ### //
    const ul = document.createElement("ul");
    for(const link of proj["buttons"]) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link["href"];
        a.target = "_blank";

        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-default", "btn-ghost");
        btn.textContent = link["label"];

        a.appendChild(btn);
        li.appendChild(a);
        ul.appendChild(li);
    }
    project.appendChild(ul);

    projectCont.appendChild(project);

    return projectCont;
};

// https://stackoverflow.com/a/66394121
const onVisible = (element, callback) => {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
            }
        });
    }).observe(element);
    if(!callback) return new Promise(r => callback=r);
}

let projects = [];
let ind = 0;

const revealProj = (proj) => {
    console.log(projects);
    proj.classList.remove("hide-width");
    setTimeout(() => {
        proj.classList.remove("hide-height")
    }, 300);

    ind++;

    if(ind >= projects.length) return;
    setTimeout(() => {
        onVisible(projects[ind], revealProj);
    }, 800)
}

const setUpProjects = () => {
    const first = projects[0];
    setTimeout(() => {
        revealProj(first);
    }, 500);
};

const loadProjects = () => {
    const cont = document.getElementById("projects");
    fetch("./projects.json").then(f => f.json()).then(arr => {
        for(const proj of arr) {
            cont.appendChild(createProject(proj));
        }
    }).then((arr) => {
        projects = document.getElementsByClassName("project");
        setUpProjects();
    });
};