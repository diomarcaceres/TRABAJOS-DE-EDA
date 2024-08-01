class BKTree {
    constructor() {
        this.root = null;
    }

    // Función para calcular la distancia discreta entre dos productos
    distance(a, b) {
        return Math.abs(a.stock - b.stock) + Math.abs(a.reordered - b.reordered) + (a.category === b.category ? 0 : 1);
    }

    // Función recursiva para agregar un producto al BK-Tree
    add(node, product) {
        if (!node) {
            return { product: product, children: {} };
        }

        const dist = this.distance(node.product, product);
        if (!node.children[dist]) {
            node.children[dist] = this.add(null, product);
        } else {
            this.add(node.children[dist], product);
        }

        return node;
    }

    // Función recursiva para buscar productos similares en el BK-Tree
    search(node, product, threshold, results) {
        if (!node) return;

        const dist = this.distance(node.product, product);
        if (dist <= threshold) {
            results.push(node.product);
        }

        for (let d = Math.max(0, dist - threshold); d <= dist + threshold; d++) {
            if (node.children[d]) {
                this.search(node.children[d], product, threshold, results);
            }
        }
    }

    // Insertar un producto en el BK-Tree
    insert(product) {
        this.root = this.add(this.root, product);
    }

    // Encontrar productos similares dentro de un cierto umbral de distancia
    findSimilar(product, threshold) {
        const results = [];
        this.search(this.root, product, threshold, results);
        return results;
    }
}

const bktree = new BKTree();

// Lista predefinida de productos
const products = [
    { name: 'tv', stock: 10, reordered: 3, category: 'Electrónica' },
    { name: 'gorro', stock: 15, reordered: 1, category: 'Ropa' },
    { name: 'celular', stock: 8, reordered: 5, category: 'Electrónica' },
    { name: 'embutido', stock: 12, reordered: 2, category: 'Comida' },
    { name: 'intro a python', stock: 20, reordered: 4, category: 'Libros' },
    { name: 'tablet', stock: 6, reordered: 7, category: 'Electrónica' },
    { name: 'medias', stock: 25, reordered: 3, category: 'Ropa' },
    { name: 'pollo', stock: 14, reordered: 1, category: 'Comida' },
    { name: 'harry potter', stock: 18, reordered: 5, category: 'Libros' },
    { name: 'alicia en el pais de las maravillas', stock: 22, reordered: 4, category: 'Libros' },
    { name: 'mochila', stock: 7, reordered: 2, category: 'Ropa' },
    { name: 'conservas', stock: 9, reordered: 3, category: 'Comida' },
    { name: 'c++', stock: 11, reordered: 6, category: 'Libros' },
    { name: 'licuadora', stock: 23, reordered: 5, category: 'Electrónica' },
    { name: 'casaca', stock: 5, reordered: 1, category: 'Ropa' },
    { name: 'salchicha', stock: 16, reordered: 4, category: 'Comida' },
    { name: 'java', stock: 12, reordered: 3, category: 'Libros' },
    { name: 'parlantes', stock: 8, reordered: 5, category: 'Electrónica' },
    { name: 'buzo', stock: 10, reordered: 2, category: 'Ropa' },
    { name: 'verduras', stock: 19, reordered: 1, category: 'Comida' }
];

// Insertar productos predefinidos en el BK-Tree
products.forEach(product => bktree.insert(product));

// Función para buscar productos similares desde el formulario HTML
function searchProduct() {
    const name = document.getElementById('searchName').value;
    const stock = parseInt(document.getElementById('searchStock').value);
    const reordered = parseInt(document.getElementById('searchReordered').value);
    const category = document.getElementById('searchCategory').value;
    const threshold = parseInt(document.getElementById('threshold').value);

    const product = { name, stock, reordered, category };
    const results = bktree.findSimilar(product, threshold);

    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = `Nombre: ${result.name}, Stock: ${result.stock}, Veces Reordenado: ${result.reordered}, Categoría: ${result.category}`;
        resultsList.appendChild(li);
    });
}
