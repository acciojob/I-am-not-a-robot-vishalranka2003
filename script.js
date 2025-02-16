//your code here
const images = [
    "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"
];

let selectedImages = [];
let selectedIds = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupImages() {
    let duplicate = images[Math.floor(Math.random() * images.length)];
    let imageSet = [...images, duplicate];

    shuffleArray(imageSet);

    let container = document.getElementById("imageContainer");
    container.innerHTML = "";

    imageSet.forEach((src, index) => {
        let img = document.createElement("img");
        img.src = src;
        img.dataset.id = src;
        img.addEventListener("click", () => selectImage(img));
        container.appendChild(img);
    });
}

function selectImage(img) {
    if (selectedImages.length < 2 && !selectedIds.includes(img.dataset.id)) {
        img.classList.add("selected");
        selectedImages.push(img.src);
        selectedIds.push(img.dataset.id);
    }

    document.getElementById("reset").style.display = "inline-block";

    if (selectedImages.length === 2) {
        document.getElementById("verify").style.display = "inline-block";
    }
}

document.getElementById("reset").addEventListener("click", () => {
    selectedImages = [];
    selectedIds = [];
    document.querySelectorAll(".selected").forEach(img => img.classList.remove("selected"));
    document.getElementById("verify").style.display = "none";
    document.getElementById("reset").style.display = "none";
    document.getElementById("para").innerText = "";
});

document.getElementById("verify").addEventListener("click", () => {
    let message = selectedImages[0] === selectedImages[1] ? 
        "You are a human. Congratulations!" : 
        "We can't verify you as a human. You selected the non-identical tiles.";

    document.getElementById("para").innerText = message;
    document.getElementById("verify").style.display = "none";
});

setupImages();
