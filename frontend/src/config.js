// Basis-URL für API-Anfragen
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://deine-backend-domain.com/api'
    : 'http://127.0.0.1:8000/api';

export { API_BASE_URL };