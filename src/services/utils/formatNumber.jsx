// utils/formatNumber.js

export function formatPrice(price) {
    if (price === null || price === undefined) return "Precio desconocido";
    
    // Elimina los decimales
    const integerPart = Math.floor(price);
    
    // Convierte el número a cadena y formatea con puntos
    return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
