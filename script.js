// Używamy stacji SomaFM (kanał Groove Salad) - stabilne API z okładkami
const statsUrl = "https://somafm.com/songs/groovesalad.json";

// Domyślna okładka (np. logo Twojego radia), gdyby API nie zwróciło obrazka
const defaultCover = "letvultures.jpg"; 

async function updateMetadata() {
    try {
        // AllOrigins pomaga ominąć CORS przy testach lokalnych i na niektórych hostingach
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(statsUrl)}`);
        
        if (!response.ok) throw new Error('Problem z siecią');
        
        const json = await response.json();
        const data = JSON.parse(json.contents);
        
        // Wyciągamy ostatnią piosenkę z listy
        const current = data.songs[0];
        
        // 1. Aktualizujemy tekst (Artysta i Tytuł)
        document.getElementById('artist-name').innerText = current.artist;
        document.getElementById('song-title').innerText = current.title;
        
        // 2. Aktualizujemy okładkę albumu
        const coverElement = document.getElementById('album-cover');
        
        // SomaFM często podaje okładkę w polu 'image'. Jeśli go nie ma, używamy domyślnej.
        if (current.image && current.image !== "") {
            // Czasami linki są względne, więc musimy dodać domenę SomaFM
            const fullImageUrl = current.image.startsWith('http') ? current.image : `https://somafm.com${current.image}`;
            coverElement.src = fullImageUrl;
        } else {
            coverElement.src = defaultCover;
        }
        
        console.log("Zaktualizowano: " + current.artist + " - " + current.title);
        
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
        // W razie błędu ustawiamy domyślne wartości
        document.getElementById('song-title').innerText = "Radio Alfa Live";
        document.getElementById('artist-name').innerText = "Najlepsza muzyka";
        document.getElementById('album-cover').src = defaultCover;
    }
}

// Odświeżaj dane co 20 sekund (SomaFM nie zmienia piosenek tak często)
setInterval(updateMetadata, 20000);

// Pierwsze wywołanie przy starcie strony
updateMetadata();