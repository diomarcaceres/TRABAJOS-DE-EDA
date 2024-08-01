// Importación de las funciones necesarias desde el módulo BKTree
import { BKTree } from './bktree.js';
import { levenshteinDistance } from './levenshtein.js';

// Inicialización del árbol BK con la función de distancia de Levenshtein
const bktree = new BKTree(levenshteinDistance);
const nombres = ["juan", "juanita", "john", "juana", "jana", "juam", "jose", "julia", "judith", "javier"];
nombres.forEach(nombre => bktree.add(nombre));

// Agregando evento al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('nameInput');
    const button = document.getElementById('searchButton');

    // Función que maneja la búsqueda y muestra sugerencias
    button.addEventListener('click', () => {
        const suggestions = bktree.search(input.value, 2); // Búsqueda con una distancia máxima de 2
        displaySuggestions(suggestions);
    });

    // Función para mostrar las sugerencias en la interfaz de usuario
    function displaySuggestions(suggestions) {
        const suggestionsDiv = document.getElementById('suggestions');
        suggestionsDiv.innerHTML = ''; // Limpiar las sugerencias anteriores
        if (suggestions.length === 0) {
            suggestionsDiv.textContent = 'No se encontraron sugerencias.';
        } else {
            const list = document.createElement('ul');
            suggestions.forEach(suggestion => {
                const listItem = document.createElement('li');
                listItem.textContent = suggestion;
                list.appendChild(listItem);
            });
            suggestionsDiv.appendChild(list);
        }
    }
});

