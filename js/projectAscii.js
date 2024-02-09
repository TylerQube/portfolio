const showAscii = (fname, id) => {
    fetch("../ascii/" + fname).then(res => res.text()).then(t => {
        document.getElementById(id).textContent = t;
    });
}

