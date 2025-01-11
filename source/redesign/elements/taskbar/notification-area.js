const notificationAreaContainer = document.querySelector("#taskbar__notification-area");

const notificationAreaTimeElement = document.querySelector("#taskbar__notification-area__time");

const navigationArea = {
    addProgramNotification: (iconPath) => {
        if (!notificationAreaContainer || !notificationAreaTimeElement)
        {
            console.error("addProgramNotification: No notificationAreaContainer or notificationAreaTimeElement!");
            return;
        }

        const button = document.createElement("button");
        button.classList.add("taskbar__notification-area__program-icon")
        button.classList.add("not-implemented");

        button.innerHTML = `
            <img src="${iconPath}" height="16px" width="16px">
        `;
    
        notificationAreaContainer.insertBefore(button, notificationAreaTimeElement);
    },

}


// ============================ Private ================================

const _setupTaskbarNotificationsAreaTime = () => {
    if (!notificationAreaTimeElement) {
        console.error("No notificationAreaTimeElement!");
    }

    const updateTime = () => {
        notificationAreaTimeElement.innerHTML = new Date().toLocaleString(
            'en-US', 
            {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }
        );
    };

    setInterval(updateTime, 1000 * 60);
    updateTime();
}

_setupTaskbarNotificationsAreaTime();