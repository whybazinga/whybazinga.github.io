const programTabsContainer = document.querySelector("#taskbar__program-tabs-area-container");

const programTabsArea = {
    addProgramTab: (iconPath, title, isForcePressed) => {
        if (!programTabsContainer)
        {
            console.error("addProgramTab: No programTabsContainer!");
            return;
        }

        const tab = document.createElement("div");
        tab.classList.add("taskbar__program-tabs-area__tab");
        if (isForcePressed)
        {
            tab.classList.add("pressed");
        }

        tab.innerHTML = 
        `
            <img src="${iconPath}">
            <p>
                ${title}
            </p>
        `;
    
        programTabsContainer.appendChild(tab);
    },
}