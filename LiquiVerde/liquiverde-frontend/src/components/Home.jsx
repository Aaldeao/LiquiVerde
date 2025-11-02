import React from 'react';

const availableProducts = [
    { name: "Bebida Vegetal", marca: "LoncoLeche", codigo: "780100000001", price: 2500.0, score: 83.0 },
    { name: "Yogurt Batido Vainilla Light", marca: "Soprole", codigo: "780100000002", price: 890.0, score: 75.0 },
    { name: "Galletas de Chocolate", marca: "Costa", codigo: "780100000003", price: 960.0, score: 50.0 },
    { name: "Galletón Avena y Almendras", marca: "Quaker", codigo: "780100000004", price: 580.0, score: 78.0 },
    { name: "Agua Mineral Con Gas 1.5L", marca: "Cachantún", codigo: "780100000005", price: 800.0, score: 74.0 },
    { name: "Café de Grano Tostado 250g", marca: "Juan Valdez", codigo: "780100000006", price: 5000.0, score: 90.0 },
    { name: "Arroz Blanco (Bolsa 1kg)", marca: "Tucapel", codigo: "780100000007", price: 900.0, score: 60.0 },
    { name: "Detergente Ecológico Ropa", marca: "Quix", codigo: "780100000008", price: 3200.0, score: 88.0 },
    { name: "Detergente Líquido 1L", marca: "Omo", codigo: "780100000009", price: 2800.0, score: 45.0 },
    { name: "Plátanos Orgánicos Premium", marca: "Frutas", codigo: "780100000010", price: 600.0, score: 85.0 },
];

const Home = ({ setView }) => (
    <div style={{
        padding: '30px',
        maxWidth: '900px',
        margin: 'auto',
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
    }}>
        <h2 style={{ color: '#76ff03', marginBottom: '10px' }}>👋 Bienvenido al Desafío Técnico LiquiVerde</h2>
        <p style={{ color: '#bdbdbd' }}>
            Esta interfaz permite analizar productos y generar listas optimizadas según presupuesto y sostenibilidad.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
                onClick={() => setView('scanner')} 
                style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: '0.3s'
                }}
            >
                🔍 Análisis de Producto
            </button>
            <button 
                onClick={() => setView('optimizer')}
                style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#03a9f4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: '0.3s'
                }}
            >
                🛒 Generador de Listas
            </button>
        </div>

        <hr style={{ margin: '25px 0', borderColor: '#333' }}/>

        <h3>📊 Productos de Prueba</h3>
        <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#212121',
            borderRadius: '6px',
            overflow: 'hidden'
        }}>
            <thead style={{ backgroundColor: '#333' }}>
                <tr>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Nombre</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Código</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Precio</th>
                </tr>
            </thead>
            <tbody>
                {availableProducts.map((p, i) => (
                    <tr key={p.codigo} style={{ backgroundColor: i % 2 ? '#2a2a2a' : '#1c1c1c' }}>
                        <td style={{ padding: '10px' }}>{p.name}</td>
                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#80cbc4' }}>{p.codigo}</td>
                        <td style={{ padding: '10px' }}>${p.price.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Home;
