// Basis-URL für API-Anfragen
const API_BASE_URL = process.env.REACT_APP_API_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'https://rose-supermarkt.onrender.com/api'  // Dies wird durch die REACT_APP_API_URL ersetzt
        : 'http://127.0.0.1:8000/api');

// Bildpfad-Hilfsfunktion
const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/300?text=Kein+Bild';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL.replace('/api', '')}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

export { API_BASE_URL, getImageUrl };