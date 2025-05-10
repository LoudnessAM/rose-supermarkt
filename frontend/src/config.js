// frontend/src/config.js
// Basis-URL für API-Anfragen
const API_BASE_URL = process.env.REACT_APP_API_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'https://rose-supermarkt.onrender.com/api'
        : 'http://127.0.0.1:8000/api');

// Bildpfad-Hilfsfunktion - korrigiert für korrekte URL-Konstruktion
const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/300?text=Kein+Bild';
  if (imagePath.startsWith('http')) return imagePath;
  
  // Entfernt das /api vom Pfad nur für Medien-URLs
  const baseUrl = API_BASE_URL.replace('/api', '');
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

// WICHTIG: Beide Funktionen exportieren
export { API_BASE_URL, getImageUrl };