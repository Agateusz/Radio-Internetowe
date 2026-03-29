const statsUrl = "https://somafm.com/songs/groovesalad.json";

async function updateMetadata() {
    try {
        console.log("Pobieram dane...");
        // proxy, żeby ominąć blokady podczas testowania lokalnego
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(statsUrl)}`);
        const json = await response.json();
        const data = JSON.parse(json.contents);
        
        // Wyciągamy dane o piosence
        const current = data.songs[0];
        const artist = current.artist;
        const title = current.title;

        // wyświetlanie tekstu
        document.getElementById('artist-name').innerText = artist;
        document.getElementById('song-title').innerText = title;

        // szukanie okładki
        fetchCoverFromiTunes(artist, title);

        console.log("Sukces! Gra: " + artist + " - " + title);
    } catch (error) {
        console.error("Błąd stacji:", error);
    }
}

async function fetchCoverFromiTunes(artist, title) {
    const searchTerm = encodeURIComponent(`${artist} ${title}`);
    const iTunesUrl = `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=1`;

    try {
        const response = await fetch(iTunesUrl);
        const data = await response.json();
        const coverImg = document.getElementById('album-cover');

        if (data.results && data.results.length > 0) {
            // podmienianie na okładkę z itunes
            let highResCover = data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
            coverImg.src = highResCover;
        } else {
            // jak nie ma okładki dajemy nasze logo
            coverImg.src = "alfa.jpg";
        }
    } catch (error) {
        console.error("Błąd okładki:", error);
    }
}

// odświeżanie
updateMetadata();
setInterval(updateMetadata, 30000);