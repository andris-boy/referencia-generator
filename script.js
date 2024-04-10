// Array of image filenames and corresponding texts
const images = [
    "pictures/ÁTJÁRÓHÁZ.jpg",
    "pictures/AURA.png",
    "pictures/CSAPDA.jpg",
    "pictures/EREKLYE.png",
    "pictures/FÉNYFORRÁS.jpg",
    "pictures/FÉREGSZÁLY-100.jpg",
    "pictures/FOTÓ.jpg",
    "PICTURES/FORRÁS.jpg",
    "pictures/HORIZONT.jpg",
    "pictures/KÉP.jpg",
    "pictures/KÖZLEKEDŐEDÉNY.jpg",
    "pictures/KULCSLYUK.jpg",
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
    "pictures/SZIVÁRVÁNY.jpg",
    "pictures/VALUTA.jpg",
    "pictures/VETÍTŐ.jpg",
    "pictures/ÜVEGTEST.jpg",
    "pictures/TÁJ.jpg",
    "pictures/RÉS.jpg",
    "pictures/SMINKTÜKÖR.jpg",
    "pictures/A HATALOM GYŰRŰJE.jpg",
    "pictures/SZELLŐZŐ.jpg",
    "pictures/GYÁR.jpg",
    "pictures/MÁGNES.jpg",
    "pictures/JÁTÉK.jpg",
    "pictures/CSÚSZDA.jpg",
    "pictures/ÁTRIUM.jpg",
    "pictures/FOJTOGATÓ.jpg",
    "pictures/JELÁTJÁTSZÓ.jpg",
    "pictures/ÖRVÉNY.jpg"




]; // Replace with actual image filenames  // "pictures/ÖRVÉNY.jpg"
const texts = [
    "ÁTJÁRÓHÁZ",
    "AURA",
    "CSAPDA",
    "EREKLYE",
    "FÉNYFORRÁS",
    "FÉREGSZÁLY",
    "FOTOGRÁFIA",
    "FORRÁS",
    "HORIZONT",
    "REPRODUKCIÓ",
    "KÖZLEKEDŐEDÉNY",
    "KULCSLYUK",
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
    "SZIVÁRVÁNY",
    "VALUTA",
    "VETÍTŐ",
    "ÜVEGTEST",
    "TÁJ",
    "RÉS",
    "SMINKTÜKÖR",
    "A HATALOM GYŰRŰJE",
    "SZELLŐZŐ",
    "GYÁR",
    "MÁGNES",
    "JÁTÉK",
    "CSÚSZDA",
    "ÁTRIUM",
    "FOJTOGATÓ",
    "JELÁTJÁTSZÓ",
    "ÖRVÉNY"



]; // Replace with corresponding texts

let intervalId;
let generating = true;
let generationInterval = 40; // Initial interval between generations
const minInterval = 40; // Minimum interval between generations

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function displayRandomContent() {
    let randomImageIndex = getRandomIndex(images);
    let randomTextIndex = getRandomIndex(texts);

    const randomImage = images[randomImageIndex];
    const randomText = texts[randomTextIndex];

    document.getElementById("image").src = randomImage;
    document.getElementById("text").textContent = randomText;
}

function startGenerating() {
    clearInterval(intervalId); // Clear any existing interval
    intervalId = setInterval(() => {
        displayRandomContent();
        generationInterval = Math.max(minInterval, generationInterval - 300); // Decrease interval by 300ms, but not below the minimum
        clearInterval(intervalId); // Clear existing interval and set new one with updated interval
        intervalId = setInterval(startGenerating, generationInterval);
    }, generationInterval);
}

function stopGenerating() {
    clearInterval(intervalId);
    generationInterval = 3040; // Reset interval to 3040ms when generation stops
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
    startGenerating();

    document.addEventListener("click", () => {
        toggleGeneration();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === " ") {
            toggleGeneration();
        }
    });
});