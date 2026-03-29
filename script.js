const statsUrl = "https://somafm.com/songs/groovesalad.json"; 

async function updateMetadata() {
    try {
        console.log("Pobieram dane z radia...");
        const response = await fetch(statsUrl);
        const data = await response.json();
        
        // Sprawdzanie czy dane w ogóle istnieją
        if (data && data.tracks && data.tracks.length > 0) {
            const current = data.tracks[0];
            
            const artist = current.artist || "Radio Alfa";
            const title = current.title || "Muzyka 24/7";

            // WYŚWIETLANIE TEKSTU
            document.getElementById('artist-name').innerText = artist;
            document.getElementById('song-title').innerText = title;

            // SZUKANIE OKŁADKI
            fetchCoverFromiTunes(artist, title);
        }
    } catch (error) {
        console.error("Błąd radia:", error);
    }
}

async function fetchCoverFromiTunes(artist, title) {
    // Zapytanie do iTunes
    const searchTerm = encodeURIComponent(`${artist} ${title}`);
    const iTunesUrl = `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=1`;

    try {
        const response = await fetch(iTunesUrl);
        const data = await response.json();
        const coverImg = document.getElementById('album-cover');

        if (data.results && data.results.length > 0) {
            // podmianka okładki
            let highResCover = data.results[0].artworkUrl100.replace('100x100bb', '500x500bb');
            coverImg.src = highResCover;
        } else {
            // jak nie ma to dajemy logo
            coverImg.src = "alfa.jpg";
        }
    } catch (error) {
        console.error("Błąd okładki:", error);
    }
}

// odświeżanie
updateMetadata();
setInterval(updateMetadata, 15000);