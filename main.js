document.getElementById("fileInput").addEventListener("change", function (event) {
  var files = event.target.files;
  var preview = document.getElementById("preview");
  var messageDiv = document.getElementById("message");

  messageDiv.innerHTML = ""; // Clear previous messages

  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Check if file size exceeds 1MB
    if (file.size > 1048576) {
      // 1MB in bytes
      messageDiv.innerHTML += `<p>${file.name} is too big! Maximum file size is 1MB.</p>`;
      this.value = ""; // Clear the field
      // Optionally, you can break the loop if you don't want to process any files if one fails
      // break;
    }
  }

  if (messageDiv.innerHTML === "") {
    messageDiv.innerHTML = "<p>All files are within the size limit.</p>";
  }

  // Clear any existing content
  preview.innerHTML = "";

  // Loop through all selected files
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Only process image files
    if (!file.type.match("image.*")) {
      continue;
    }

    var imgContainer = document.createElement("div");
    imgContainer.style.marginBottom = "20px"; // Spacing between each image container

    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.height = "100px";
    img.style.display = "block"; // Ensure the image is displayed in a block to put it on a new line
    img.style.marginBottom = "10px";

    var fileInfo = document.createElement("p");
    fileInfo.textContent = `File Name: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`;
    fileInfo.style.fontSize = "14px";
    fileInfo.style.marginTop = "0";

    // Append the image and file info to the container
    imgContainer.appendChild(img);
    imgContainer.appendChild(fileInfo);

    // Append the container to the preview div
    preview.appendChild(imgContainer);
  }
});
