// Array of image filenames and corresponding texts
const images = [
    "pictures/ÁTJÁRÓHÁZ.jpg",
    "pictures/AURA.png",
    "pictures/BÉRHÁZ.jpg",
    "pictures/CSAPDA.jpg",
    "pictures/DUGASZOLÓ ALJZAT.PNG",
    "pictures/EREKLYE.png",
    "pictures/FÉNYFORRÁS.jpg",
    "pictures/FÉREGSZÁLY-100.jpg",
    "pictures/FOTÓ.jpg",
    "pictures/FORRÁS.jpg",
    "pictures/KÉP.jpg",
    "pictures/KÖZLEKEDŐEDÉNY.jpg",
    "pictures/KULCSLYUK.jpg",
    "pictures/KÁTYÚ.jpg",
    "pictures/MENTŐÖV.jpg",
    "pictures/MONSTRANCIA.jpg",
    "pictures/MŰALKOTÁS.jpg",
    "pictures/NAPRAFORGÓ.jpg",
    "pictures/NÁRCISZ.jpg",
    "pictures/OLVAZSTÓTÉGELY.jpg",
    "pictures/PARAZITA.jpg",
    "pictures/PERSPEKTÍVA.jpg",
    "pictures/PÓRUS.jpg",
    "pictures/RORSCHACH TEST.jpg",
    "pictures/SALLY-100.jpg",
    "pictures/SZEMETES.jpg",
    "pictures/SZEMÜVEG-100.jpg",
    "pictures/SZERENCSEKERÉK.jpg",
    "pictures/VALUTA.jpg",
    "pictures/VETÍTŐ.jpg",
    "pictures/ÜVEGTEST.jpg",
    "pictures/TÁJ.jpg",
    "pictures/RÉS.jpg",
    "pictures/RONCS.jpg",
    "pictures/SMINKTÜKÖR.jpg",
    "pictures/SZELLŐZŐ.jpg",
    "pictures/GYÁR.jpg",
    "pictures/MÁGNES.jpg",
    "pictures/JÁTÉK.jpg",
    "pictures/ÁTRIUM.jpg",
    "pictures/FOJTOGATÓ.jpg",
    "pictures/JELÁTJÁTSZÓ.jpg",
    "pictures/ÖRVÉNY.jpg",
    "pictures/ISZAPSZÁRÍTÓ.jpg",
    "pictures/IDEGEN TEST.jpg",
    "pictures/NAGYÍTÓ.jpg",
    "pictures/TÁRGY.jpg",
    "pictures/GENERÁTOR.jpg"

]; // Replace with actual image filenames  // "pictures/GENERÁTOR.jpg"
const texts = [
    "ÁTJÁRÓHÁZ",
    "AURA",
    "BÉRHÁZ",
    "CSAPDA",
    "DUGASZOLÓ ALJZAT",
    "EREKLYE",
    "FÉNYFORRÁS",
    "FÉREGSZÁJ",
    "FOTOGRÁFIA",
    "FORRÁS",
    "REPRODUKCIÓ",
    "KÖZLEKEDŐEDÉNY",
    "KULCSLYUK",
    "KÁTYÚ",
    "MENTŐÖV",
    "MONSTRANCIA",
    "MŰALKOTÁS",
    "NAPRAFORGÓ",
    "NÁRCISZ",
    "OLVASZTÓTÉGELY",
    "PARAZITA",
    "PERSPEKTÍVA",
    "PÓRUS",
    "RORSCHACH TEST",
    "SALLY",
    "SZEMETES",
    "SZEMÜVEG",
    "SZERENCSEKERÉK",
    "VALUTA",
    "VETÍTŐ",
    "ÜVEGTEST",
    "TÁJ",
    "RÉS",
    "RONCS",
    "SMINKTÜKÖR",
    "SZELLŐZŐ",
    "GYÁR",
    "MÁGNES",
    "JÁTÉK",
    "ÁTRIUM",
    "„FOJTOGATÓ”",
    "JELÁTJÁTSZÓ",
    "ÖRVÉNY",
    "ISZAPSZÁRÍTÓ",
    "IDEGEN TEST",
    "NAGYÍTÓ",
    "HASZNÁLATI TÁRGY",
    "REFERENCIA-GENERÁTOR"


]; // Replace with corresponding texts

let intervalId;
let generating = true;
let lastSelections = []; // Keep track of last 10 selections

// Preload images
function preloadImages(imageUrls, callback) {
    let loadedImages = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                callback();
            }
        };
        img.onerror = () => {
            console.error(`Failed to preload image: ${imageUrl}`);
        };
    });
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });
}

async function displayRandomContent() {
    let randomImageIndex;
    let randomTextIndex;
    const backgroundColors = ["#9400d", "#87CEEB", "#90EE90", "#FFD700", "#FFA07A", "#FF0000", "0000FF"]; // Add more colors as needed

    do {
        randomImageIndex = getRandomIndex(images);
    } while (lastSelections.includes(images[randomImageIndex]));

    do {
        randomTextIndex = getRandomIndex(texts);
    } while (lastSelections.includes(texts[randomTextIndex]));

    const randomImageSrc = images[randomImageIndex];
    const randomText = texts[randomTextIndex];
    const randomColorIndex = getRandomIndex(backgroundColors);
    const randomBackgroundColor = backgroundColors[randomColorIndex];

    // Add the new selection to the lastSelections array
    lastSelections.push(randomImageSrc);
    lastSelections.push(randomText);

    // Ensure lastSelections contains at most 10 elements
    if (lastSelections.length > 20) {
        lastSelections = lastSelections.slice(2);
    }

    try {
        const img = await loadImage(randomImageSrc);
        document.getElementById("image").src = img.src;
        document.getElementById("text").textContent = randomText;
        document.getElementById("content").style.backgroundColor = randomBackgroundColor; // Change background color
    } catch (error) {
        console.error(`Failed to load image: ${randomImageSrc}`, error);
    }
}


function startGenerating() {
    intervalId = setInterval(displayRandomContent, 2000);
}

function stopGenerating() {
    clearInterval(intervalId);
}

function toggleGeneration() {
    if (generating) {
        stopGenerating();
        generating = false;
    } else {
        startGenerating();
        generating = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayRandomContent();
    startGenerating();

    document.addEventListener("keydown", (event) => {
        if (event.key === " ") {
            toggleGeneration();
        }
    });
});