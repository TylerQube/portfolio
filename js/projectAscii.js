const showAscii = (fname, id) => {
    fetch(fname).then(res => res.text()).then(t => {
        document.getElementById(id).textContent = t;
    });
}

// showAscii('../ascii/palpoll.txt', 'palpoll-ascii');
// showAscii('../ascii/ismordle.txt', 'ismordle-ascii');
