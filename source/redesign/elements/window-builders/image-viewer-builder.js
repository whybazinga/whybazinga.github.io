const defaultimageViewerCreateOptions = {
    imageSrc: "",
}

const imageViewer = {
    add: (imageViewerCreateOptions) => {
        const imageViewerFrameCreateOptions = {
            ...defaultimageViewerCreateOptions,
            ...imageViewerCreateOptions,
            withHideButton: true,
            withFullscreenButton: true,
        };

        const imageViewerBuilder = new WindowBuilder(imageViewerFrameCreateOptions);

        const resultimageViewer = imageViewerBuilder.build();

        const imageField = document.createElement("div");
        imageField.classList.add("window__field");

        imageField.innerHTML =
        `
            <img src="${imageViewerCreateOptions.imageSrc}">
        `;

        resultimageViewer.appendChild(imageField);

        windowsContainer.appendChild(resultimageViewer);
    }
}