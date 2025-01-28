function addChapterToggling() {
    const chapterElems = document.querySelectorAll(".toc__item--chapter");
    console.log(`chapter btns: ${chapterElems.length}`);
    const episodeElems = Array.from(document.querySelectorAll(".toc__item--episode"));
    const buoyElems = Array.from(document.querySelectorAll(".toc__item--buoy"));
    const episodeAndBuoyElems = episodeElems.concat(buoyElems);

    for (const [index, chapterElem] of Array.from(chapterElems).entries()) {
        chapterElem.setAttribute("chapterIsOpen", "true");
        const chapter = chapterElem.getAttribute("chapter");
        if (chapter == null) {
            return;
        }

        const chapterBtn = chapterElem.querySelector(".toc__chapterBtn") as Element;
        
        const affectedElems = episodeAndBuoyElems.filter(elem => elem.getAttribute("parentChapter") == chapter);
        const affectedEpisodeElems = episodeAndBuoyElems.filter(elem => Array.from(elem.classList).includes(".toc__item--episode"));
        const affectedBuoyElems = episodeAndBuoyElems.filter(elem => Array.from(elem.classList).includes(".toc__item--buoy"));

        console.log(`${affectedElems.length} elems (${affectedEpisodeElems.length} episodes, ${affectedBuoyElems.length} buoys)\nbelonging to chapter "${chapter}"`);

        if (affectedElems == null) {
            return;
        }
        
        chapterBtn.addEventListener(
            "click",
            () => {
                const chapterIsOpenValue = chapterElem.getAttribute("chapterIsOpen");
                switch (chapterIsOpenValue) {
                    case "true":
                        chapterElem.setAttribute("chapterIsOpen", "false");
                        break;
                    case "false":
                        chapterElem.setAttribute("chapterIsOpen", "true");
                        break;
                }
                
                let svg = chapterBtn.querySelector(".chapterBtn__graphic") as Element;
                let svgClasses = svg.classList
                let svgClassName = svgClasses[0];
                svgClasses.toggle(svgClassName + "--chapterOpen");

                for (const [index, ele] of Array.from(affectedElems).entries()) {
                    let classes = ele.classList;
                    let className = classes[0];
                    const result = classes.toggle(className + "--hidden");
                }
            }
        );
    }
}

function addChapterBuoying() {
    const buoyElems = document.querySelectorAll(".toc__item--buoy");
    console.log(`${buoyElems.length} buoy elems found`);
    
    const chapterElems = document.querySelectorAll(".toc__item--chapter");
    console.log(`${chapterElems.length} chapter elems found`);
    
    let dict = new Map();
    for (const [index, chapterElem] of Array.from(chapterElems).entries()) {
        dict.set(chapterElem.getAttribute("chapter"), chapterElem);
    }
    
    for (const [index, buoyElem] of Array.from(buoyElems).entries()) {
        const buoyValue = buoyElem.getAttribute("parentChapter");
        const targetElem = dict.get(buoyValue);
        const buoyBtn = buoyElem.querySelector(".toc__buoyBtn") as Element;
        buoyBtn.addEventListener(
            'click',
            function() {
                targetElem.scrollIntoView(
                    {
                        behavior: "smooth",

                        // https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
                        block: 'nearest'
                    }
                );
            }
        );
    }
}

function testWhack(performTest: boolean) {
    const whackChapterElem = document.querySelector("[whackChapter]") as Element;
    const whackEpisode = document.querySelector("[whackParentChapter]") as Element;
    if (performTest == false) {
        whackChapterElem.remove();
        whackEpisode.remove();
        return;
    }

    const whackChapterTitleElem = whackChapterElem.querySelector(".chapterBtn__chapterTitle") as Element;
    const whackTitle = whackChapterTitleElem.textContent as string;
    whackChapterElem.setAttribute("chapter", whackTitle);
    whackEpisode.setAttribute("parentChapter", whackTitle);
}

// https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
function addAllToggle() {
    let toggleAllElem = document.querySelector(".overviewAside__toggleChapters") as Element;
    toggleAllElem.textContent = "Close Chapters";
    toggleAllElem.setAttribute("closeOnClick", "true");
    toggleAllElem.addEventListener(
        "click",
        () => {
            const closeOnClickValue = toggleAllElem.getAttribute("closeOnClick");
            
            const chapterElems = document.querySelectorAll(".toc__item--chapter");
            
            for (const [index, chapterElem] of Array.from(chapterElems).entries()) {
                const chapterIsOpenValue = chapterElem.getAttribute("chapterIsOpen");
                switch (closeOnClickValue) {
                    case null:
                    case "false":
                        if (chapterIsOpenValue == "true") {
                            continue;
                        }
                        break;
                    case "true": 
                        if (chapterIsOpenValue == "false") {
                            continue;
                        }
                        break;
                }
                const chapterBtn = chapterElem.querySelector(".toc__chapterBtn");
                const event = new Event(
                    "click",
                    {
                        bubbles: true
                    }
                );
                chapterBtn.dispatchEvent(event);
            }

            switch (closeOnClickValue) {
                case "true":
                    toggleAllElem.textContent = "Open All";
                    toggleAllElem.setAttribute("closeOnClick", "false");
                    break;
                case "false": 
                    toggleAllElem.textContent = "Close All";
                    toggleAllElem.setAttribute("closeOnClick", "true");
                    break;
            }
        }
    )
}
function addPossibleTabToggling() {
    const possibleTab_ul = document.querySelector(".possibleTabs") as Element;
    const possibleTab_btns = possibleTab_ul.querySelectorAll(".possibleTabs__btn");
    for (const [index, possibleTab_btn] of Array.from(possibleTab_btns).entries()) {
        if (index == 0) {
            let btnClassList = possibleTab_btn.classList;
            const firstElem = btnClassList[0];
            btnClassList.toggle(`${firstElem}--selected`);
        }
        possibleTab_btn.addEventListener(
            "click",
            () => {
                for (const btn of Array.from(possibleTab_btns)) {
                    let btnClassList = btn.classList;
                    const firstElem = btnClassList[0];
                    btnClassList.toggle(`${firstElem}--selected`, false);
                }
                let btnClassList = possibleTab_btn.classList;
                const firstElem = btnClassList[0];
                btnClassList.toggle(`${firstElem}--selected`);
            }
        );
    }
}

testWhack(false);
addChapterToggling();
addChapterBuoying();
addAllToggle();
addPossibleTabToggling();