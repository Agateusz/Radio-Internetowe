// Adres do Twoich statystyk
const statsUrl = "https://open.fm/itunestf/1"; 

async function updateMetadata() {
    try {
        const response = await fetch(statsUrl);
        const data = await response.json();
        const current = data.tracks[0];

        const artist = current.artist;
        const title = current.title;

        // Autor i muzyka
        document.getElementById('artist-name').innerText = artist;
        document.getElementById('song-title').innerText = title;

        //SZUKANIE OKŁADKI: Wysyłamy zapytanie do iTunes o ten konkretny utwór
        fetchCoverFromiTunes(artist, title);

    } catch (error) {
        console.error("Błąd pobierania danych stacji:", error);
    }
}

async function fetchCoverFromiTunes(artist, title) {
    const searchTerm = encodeURIComponent(`${artist} ${title}`);
    const iTunesUrl = `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=1`;

    try {
        // iTunes pozwala na pobieranie danych bez blokad CORS!
        const response = await fetch(iTunesUrl);
        const data = await response.json();

        const coverImg = document.getElementById('album-cover');

        if (data.results && data.results.length > 0) {
            // Pobieramy obrazek w lepszej rozdzielczości (zamieniamy 100x100 na 600x600)
            let highResCover = data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
            coverImg.src = highResCover;
        } else {
            // Jeśli iTunes nie znajdzie piosenki, ustawiamy Twoje logo
            coverImg.src = "logo.jpg";
        }
    } catch (error) {
        console.error("Błąd szukania okładki w iTunes:", error);
    }
}

// Odświeżanie co 20 sekund
setInterval(updateMetadata, 20000);
updateMetadata();