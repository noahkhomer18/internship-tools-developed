document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text-input");
    const generateUrlsButton = document.getElementById("generate-urls");
    const urlInputsContainer = document.getElementById("url-inputs");
    const generateButtonsButton = document.getElementById("generate-buttons");
    const randomizeColorsButton = document.getElementById("randomize-colors");
    const buttonPreviewContainer = document.getElementById("button-preview-container");
    const outputCode = document.getElementById("output-code");

    function normalizeUrl(url) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return `https://${url}`;
        }
        return url;
    }

    function generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    }

    function getContrastColor(rgba) {
        const [r, g, b] = rgba.match(/\d+/g).map(Number);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? "black" : "white";
    }

    generateUrlsButton.addEventListener("click", () => {
        const lines = textInput.value.split("\n").filter(line => line.trim() !== "");
        urlInputsContainer.innerHTML = "";
        lines.forEach((line, index) => {
            const row = document.createElement("div");
            row.className = "url-row";
            row.innerHTML = `
                <label for="url-${index}">URL for "${line}":</label>
                <input type="text" id="url-${index}" placeholder="Enter URL">
                <span class="error-message">URL is required</span>
            `;
            urlInputsContainer.appendChild(row);
        });
    });

    generateButtonsButton.addEventListener("click", () => {
        const lines = textInput.value.split("\n").filter(Boolean);
        const urls = Array.from(urlInputsContainer.querySelectorAll("input"));
        let valid = true;

        urls.forEach((input) => {
            const errorMessage = input.nextElementSibling;
            if (!input.value.trim()) {
                input.classList.add("required");
                errorMessage.style.display = "inline";
                valid = false;
            } else {
                input.classList.remove("required");
                errorMessage.style.display = "none";
            }
        });

        if (!valid) return;

        const normalizedUrls = urls.map((input) => normalizeUrl(input.value.trim()));
        buttonPreviewContainer.innerHTML = "";
        let htmlCode = "";

        const longestText = lines.reduce((a, b) => (a.length > b.length ? a : b), "");
        const tempSpan = document.createElement("span");
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.fontSize = "16px";
        tempSpan.style.padding = "10px 20px";
        tempSpan.textContent = longestText;
        document.body.appendChild(tempSpan);
        const longestWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);

        lines.forEach((line, index) => {
            const url = normalizedUrls[index] || '#';
            const color = generateRandomColor();
            const contrast = getContrastColor(color);

            const button = document.createElement("a");
            button.href = url;
            button.target = "_blank";
            button.className = "custom-button";
            button.style.backgroundColor = color;
            button.style.color = contrast;
            button.style.width = `${longestWidth}px`;
            button.style.display = "inline-block";
            button.style.textAlign = "center";
            button.style.padding = "10px 20px";
            button.style.margin = "5px";
            button.style.borderRadius = "5px";
            button.style.fontSize = "16px";
            button.style.textDecoration = "none";
            button.style.border = "none";
            button.style.cursor = "pointer";
            button.style.transition = "background-color 0.3s, transform 0.2s";
            button.textContent = line;

            buttonPreviewContainer.appendChild(button);

            htmlCode += `
            <a href="${url}" target="_blank" style="
                background-color: ${color};
                color: ${contrast};
                width: ${longestWidth}px;
                display: inline-block;
                text-align: center;
                padding: 10px 20px;
                margin: 5px;
                border-radius: 5px;
                font-size: 16px;
                text-decoration: none;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;">${line}</a>\n`;
        });

        outputCode.value = htmlCode.trim();
    });

    randomizeColorsButton.addEventListener("click", () => {
        const buttons = buttonPreviewContainer.querySelectorAll(".custom-button");
        let htmlCode = "";

        buttons.forEach((button) => {
            const color = generateRandomColor();
            const contrast = getContrastColor(color);
            const url = button.href || '#';

            button.style.backgroundColor = color;
            button.style.color = contrast;

            htmlCode += `
            <a href="${url}" target="_blank" style="
                background-color: ${color};
                color: ${contrast};
                width: ${button.style.width};
                display: inline-block;
                text-align: center;
                padding: 10px 20px;
                margin: 5px;
                border-radius: 5px;
                font-size: 16px;
                text-decoration: none;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;">${button.textContent}</a>\n`;
        });

        outputCode.value = htmlCode.trim();
    });
});
