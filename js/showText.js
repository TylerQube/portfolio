const reveal = (ele) => {
    const text = ele.getAttribute("text");
    let delayMs = 0;
    for(let i = 0; i <= text.length; i++) {
        const str = text.slice(0, i);
        const d = Math.random() * 75 + 50;
        delayMs += d;
        setTimeout(() => {
            ele.textContent = str;
        }, delayMs);
    }
    setTimeout(() => {
        ele.classList.add('no-cursor');
    }, delayMs + 300);
};

const showTitle = () => {
    const items = document.getElementsByClassName('reveal');
    for(const e of items) {
        reveal(e);
    }
}

const revealProjHeading = () => {
    const h = document.getElementById("project-header");
    h.classList.add("terminal-prompt");
    reveal(h);
}

const info = document.getElementById('info');
let lines = [];

const ic = Array.prototype.slice.call(info.children);
lines = ic.map(l => {
    const s = l.textContent;
    l.textContent = " ".repeat(s.length);
    return s;
});

const showInfo = () => {
    ("starting");
    let sum = 0;
    for(let i = 0; i < ic.length; i++) {
        let ind = 0;

        const duration = Math.random() * 200 + 200;
        setTimeout(() => {
            showLine(lines[i], ic[i], duration);
        }, sum);
        sum += duration;
    }
};

const showLine = (line, node, duration) => {
    node.classList.add('terminal-prompt');
    let sum = 0;
    let ind = 0;
    while(ind <= line.length) {
        let inc = Math.floor(Math.random() * line.length / 7);
        let delay = Math.random() * duration / 10;

        sum += delay;
        sum = Math.min(sum, duration);

        ind += inc;
        (function(ind){
            setTimeout(() => {
                node.textContent = line.slice(0, ind) + " ".repeat(line.slice(ind).length);
            }, sum);
        })(ind);
    }
    setTimeout(() => {
        node.classList.remove('terminal-prompt');
    }, sum);
}