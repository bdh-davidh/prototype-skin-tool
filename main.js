const previewElement = document.querySelector("#preview");
const errorMessageElement = document.querySelector("#message");
const predictionsElement = document.querySelector("#predictions");
const progressElement = document.querySelector("#progress");
const maxFileSize = 1_048_576; // 1MB in bytes

function renderFileSizeError(files) {
  this.value = ""; // Clear the field
  const oversizedImage = files.find((file) => file.size > maxFileSize);

  errorMessageElement.innerHTML = `
        <p>${oversizedImage.name} file is too big! The maximum file size is 1MB.</p>`;
}

function renderUserImagePreviews(files) {
  for (const file of files) {
    // Only process image files
    if (!file.type.match("image.*")) {
      continue;
    }

    // Create elements for image
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = "User uploaded image";

    // Create elements for supplementary details
    const fileInfo = document.createElement("p");
    fileInfo.textContent = `File Name: ${file.name}`;

    // Append the image and file info to the container
    imgContainer.append(img);
    imgContainer.append(fileInfo);

    // Append the container to the preview div
    previewElement.append(imgContainer);
  }
}

function renderPredictions(predictions) {
  predictionsElement.innerHTML = predictions
    .map((prediction) => {
      return `
      <li>
        <h3>${prediction.name}</h3>
        <div class="possibility">Likelyhood: ${prediction.possibility}</div>
        <a href="${prediction.readMoreUrl}">Find out more about ${prediction.name}.</a>
      </li>`;
    })
    .join("");
}

function fetchPredictionData() {
  progressElement.innerHTML = `Submitting and analysing your image. This should only take a moment.`;
  const formData = new FormData();
  formData.append("file", document.querySelector("#fileInput").files[0]);
  formData.append("language", "en");
  formData.append("simple_names", "True");
  formData.append("model", "autoderm_v2_1");

  fetch("https://autoderm.ai/v1/query", {
    method: "POST",
    headers: {
      "Api-Key": "8954b689-338a-bca8-4c97-64ca160bf22b",
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        progressElement.innerHTML = `Apologies something went wrong, please try again.`;
        throw new Error(`status_error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      progressElement.innerHTML = `Your results are listed below.`;
      const predictions = data.predictions;
      renderPredictions(predictions);
    })
    .catch((error) => console.error("Error:", error));
}

document.querySelector("#fileInput").addEventListener("change", function (event) {
  errorMessageElement.innerHTML = ""; // Clear previous messages
  previewElement.innerHTML = ""; // Clear any existing images
  const files = [...event.target.files];
  const allFilesWithinMaxSize = files.every((file) => file.size < maxFileSize);
  if (allFilesWithinMaxSize) {
    fetchPredictionData();
    renderUserImagePreviews(files);
  } else {
    renderFileSizeError(files);
  }
});
