const notificationAreaContainer = document.querySelector("#taskbar__notification-area");

const notificationAreaTimeElement = document.querySelector("#taskbar__notification-area__time");

const navigationArea = {
    addProgramNotification: (iconPath) => {
        if (!notificationAreaContainer || !notificationAreaTimeElement)
        {
            console.error("addProgramNotification: No notificationAreaContainer or notificationAreaTimeElement!");
            return;
        }
    
        const newIcon = new Image(16, 16);
        newIcon.src = iconPath;
        newIcon.classList.add("taskbar__notification-area__program-icon");
    
        notificationAreaContainer.insertBefore(newIcon, notificationAreaTimeElement);
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