const API_BASE_URL = 'http://localhost:8090/api/v1';

// 1. Obtiene un producto por código de barras
export const getProducto = async (codigo) => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/scan/${codigo}`);

        if (!response.ok) {
            // Manejar 404
            if (response.status === 404) {
                return null; // Producto no encontrado
            }
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        return await response.json(); // USAR await aquí
    } catch (error) {
        console.error("Error al obtener producto:", error);
        throw error;
    }
};

// 2. Obtiene las alternativas sostenibles
export const getAlternativas = async (codigo) => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/alternatives/${codigo}`);

        if (!response.ok) {
            // Manejar 204 No Content
            if (response.status === 204) {
                return []; 
            }
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        return await response.json(); // USAR await aquí
    } catch (error) {
        console.error("Error al obtener alternativas:", error);
        throw error;
    }
};

// 3. Optimiza la lista de compras
export const optimizeLista = async (listaCompra) => {
    try {
        const response = await fetch(`${API_BASE_URL}/listas/optimize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listaCompra),
        });

        if (!response.ok) {
             throw new Error(`Error al optimizar lista: ${response.statusText}`);
        }

        return await response.json(); // USAR await aquí
    } catch (error) {
        console.error("Error de optimización:", error);
        throw error;
    }
};