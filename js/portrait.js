const portrait = document.getElementById("portrait");

let loading_portrait = [];

const initPortrait = (start) => {
    let newArr = Array(start.length).fill(Array(start[0].length).fill(",").join(""));
    for(let i = 0; i < start.length; i++) {
        portrait.appendChild(document.createElement("p"));
    }
    return newArr;
};

// let symbols = [" ", ".", ",", "/", "(", "%", "&", "*", "#", "@"];
let symbols = [" ", ".", ",", "/", "(", "%", "&", "*", "#", "@", "^", "$", "!", "?"];

// let symbols = ["-", "=", "+", "%", "*", "#", ":", "@"]
const randomizePortrait = (finalArr) => {
    let noDiff = true;
    const cxy = [Math.floor(loading_portrait.length / 2), Math.floor(loading_portrait[0].length / 2)]
    for(let i = 0; i < loading_portrait.length; i++) {
        let line = loading_portrait[i].split("");
        for(let j = 0; j < line.length; j++) {
            const char = loading_portrait[i].charAt(j);
            const dx = Math.abs(cxy[0] - i) * 2.3;
            const dy = Math.abs(cxy[1] - j);
            const d = dx**2 + dy**2;
            if(d >= 47**2) {
                line[j] = " ";
                continue;
            }
            if(char == finalArr[i][j]) continue;
            noDiff = false;
            if(Math.random() < 0.5) continue;
            const newChar = symbols[Math.floor(Math.random() * symbols.length)];
            line[j] = newChar;
            
        }
        loading_portrait[i] = line.join("");
    }
    return noDiff;
};

const setPortrait = () => {
    for(let i = 0; i < loading_portrait.length; i++) {
        const line = loading_portrait[i];
        const par = portrait.children.item(i);
        par.textContent = i+1 <= visibleLines ? line : " ".repeat(line.length);
    }
}

const startPortrait = (t) => {
    portrait.classList.remove("hidden");
    const reveal = setInterval(() => {
        const done = randomizePortrait(t.split("\n"));
        if(done) clearInterval(reveal);
        setPortrait();
    }, 50);
}

let visibleLines = 0;

const revealPortrait = () => fetch("./../ascii/space_portrait.txt").then(res => res.text()).then(t => {
    t = t.split("\n").slice(0).map(l => l.slice(35)).join("\n");
    loading_portrait = initPortrait(t.split("\n"));
    setPortrait();

    startPortrait(t);
    
    const incLines = setInterval(() => {
        visibleLines++;
        if(visibleLines >= loading_portrait.length) clearInterval(incLines);
    }, 30);
});