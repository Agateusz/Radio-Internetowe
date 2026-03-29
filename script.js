const statsUrl = "https://somafm.com/songs/groovesalad.json";

async function updateMetadata() {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(statsUrl)}`);
        const json = await response.json();
        const data = JSON.parse(json.contents);
        
        // Wyciągamy ostatnią piosenkę z listy
        const current = data.songs[0];
        
        document.getElementById('artist-name').innerText = current.artist;
        document.getElementById('song-title').innerText = current.title;
        
        console.log("Gra: " + current.artist + " - " + current.title);

        // --- AKTUALIZACJA OKŁADKI ---
        const albumArt = document.getElementById('album-art');
        if (current.image) {
            albumArt.src = current.image;
        } else {
            // Jeśli piosenka nie ma okładki, wróć do domyślnego logo
            albumArt.src = "alfa.jpg";
        }
        
        console.log("Gra: " + current.artist + " - " + current.title);
        
    } catch (error) {
        console.error("Błąd:", error);
        document.getElementById('song-title').innerText = "Radio Alfa Live";
    }
}

function changeQuality() {
    const audio = document.getElementById('main-audio');
    const qualitySelect = document.getElementById('quality');
    const selectedSource = qualitySelect.value;
    
    // czy muzyka grała wcześniej
    const isPlaying = !audio.paused;

    // Podmieniamy źródło
    audio.src = selectedSource;
    audio.load(); // nowy strumień

    // Jeśli grała, odpalamy ją automatycznie po zmianie
    if (isPlaying) {
        audio.play();
    }
    
    console.log("Zmieniono jakość na: " + selectedSource);
}

setInterval(updateMetadata, 30000); // Odświeżanie
updateMetadata();