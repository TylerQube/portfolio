const runFuncs = [
    [showTitle, 0],
    [revealPortrait, 2000],
    [showInfo, 1500],
    [revealProjHeading, 3000],
    [loadProjects, 500],
]

let delay = 0;
for(const [func, dt] of runFuncs) {
    delay += dt;
    setTimeout(() => func(), delay);
}