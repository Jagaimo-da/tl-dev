function addAsideToggling() {
    const asideBtn = document.querySelector(".tools__btn--episodes");
    const affectedElems = document.querySelectorAll("[asideAffected]");
    asideBtn.addEventListener("click", () => {
        for (const [index, ele] of Array.from(affectedElems).entries()) {
            let classes = ele.classList;
            let className = classes[0];
            const result = classes.toggle(className + "--showAside");
        }
    });
}
function clean(node) {
    for (var n = 0; n < node.childNodes.length; n++) {
        var child = node.childNodes[n];
        let child_nodeValue = child.nodeValue;
        if (child.nodeType === 8
            ||
                (child.nodeType === 3 && !/\S/.test(child_nodeValue))) {
            node.removeChild(child);
            n--;
        }
        else if (child.nodeType === 1) {
            clean(child);
        }
    }
}
function clean_workInfo__closeButton() {
    const node_workInfo__closeButton = document.querySelector(".workInfo__closeButton");
    clean(node_workInfo__closeButton);
}
addAsideToggling();
clean_workInfo__closeButton();
