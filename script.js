const statsUrl = "https://somafm.com/songs/groovesalad.json";

// Domyślna okładka, gdyby API nie zwróciło obrazka
const defaultCover = "logo.jpg"; 

async function updateMetadata() {
    try {
        // omijanie CORS
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(statsUrl)}`);
        
        if (!response.ok) throw new Error('Problem z siecią');
        
        const json = await response.json();
        const data = JSON.parse(json.contents);
        
        // Wyciąganie ostatniej piosenki z listy
        const current = data.songs[0];
        
        // Aktualizacja artysty i tutułu
        document.getElementById('artist-name').innerText = current.artist;
        document.getElementById('song-title').innerText = current.title;
        
        // Aktualizacja okładki albumu
        const coverElement = document.getElementById('album-cover');
        
        if (current.image && current.image !== "") {
            const fullImageUrl = current.image.startsWith('http') ? current.image : `https://somafm.com${current.image}`;
            coverElement.src = fullImageUrl;
        } else {
            coverElement.src = defaultCover;
        }
        
        console.log("Zaktualizowano: " + current.artist + " - " + current.title);
        
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
        // W razie błędu domyślne wartości
        document.getElementById('song-title').innerText = "Radio Alfa Live";
        document.getElementById('artist-name').innerText = "Najlepsza muzyka";
        document.getElementById('album-cover').src = defaultCover;
    }
}

// odświeżanie
setInterval(updateMetadata, 20000);

// Pierwsze wywołanie przy starcie strony
updateMetadata();