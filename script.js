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
    } catch (error) {
        console.error("Błąd:", error);
        document.getElementById('song-title').innerText = "Radio Alfa Live";
    }
}

setInterval(updateMetadata, 30000); // Odświeżanie
updateMetadata();