const programTabsContainer = document.querySelector("#taskbar__program-tabs-area-container");

const programTabsArea = {
    buildTab: (idAttribute, iconPath, title) => {
        const tab = document.createElement("div");
        tab.classList.add("taskbar__program-tabs-area__tab");
        tab.id = idAttribute;

        tab.innerHTML = 
        `
            <img src="${iconPath}">
            <p>
                ${title}
            </p>
        `;

        return tab;
    },
}