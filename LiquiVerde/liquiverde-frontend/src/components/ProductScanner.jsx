import React, { useState } from 'react';
import { getProducto, getAlternativas } from '../api/liquiVerdeApi.js';

const ProductScanner = () => {
    const [codigo, setCodigo] = useState('');
    const [producto, setProducto] = useState(null);
    const [alternativas, setAlternativas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleScan = async () => {
        if (!codigo) return;
        setLoading(true);
        setError('');
        setProducto(null);
        setAlternativas([]);
        try {
            const prod = await getProducto(codigo);
            if (!prod) {
                setError('Producto no encontrado.');
                setLoading(false);
                return;
            }
            setProducto(prod);
            const alts = await getAlternativas(codigo);
            setAlternativas(alts);
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const renderScore = (score) => (
        <span style={{
            color: score > 75 ? '#76ff03' : score < 50 ? '#f44336' : '#ff9800',
            fontWeight: 'bold'
        }}>
            {score ? score.toFixed(1) : 'N/A'}
        </span>
    );

    return (
        <div style={{
            padding: '30px',
            backgroundColor: '#1e1e1e',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            maxWidth: '700px',
            margin: 'auto'
        }}>
            <h2>🔍 Análisis de Producto </h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Código de barras"
                    style={{
                        flex: 1,
                        borderRadius: '6px',
                        border: '1px solid #333',
                        backgroundColor: '#2a2a2a',
                        color: '#fff'
                    }}
                />
                <button 
                    onClick={handleScan} 
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    {loading ? 'Cargando...' : 'Analizar'}
                </button>
            </div>

            {error && <p style={{ color: '#f44336' }}>{error}</p>}

            {producto && (
                <div style={{
                    marginTop: '20px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    padding: '15px'
                }}>
                    <h3>{producto.nombre}</h3>
                    <p><b>Marca:</b> {producto.marca}</p>
                    <p><b>Precio:</b> ${producto.precio.toFixed(2)}</p>
                    <p><b>Categoría:</b> {producto.categorias}</p>
                    <ul>
                        <li>Total: {renderScore(producto.scoreTotal)}</li>
                        <li>Económico: {renderScore(producto.scoreEconomico)}</li>
                        <li>Ambiental: {renderScore(producto.scoreAmbiental)}</li>
                        <li>Social: {renderScore(producto.scoreSocial)}</li>
                    </ul>
                </div>
            )}

            {alternativas.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h4>🌿 Alternativas Sugeridas</h4>
                    <ul>
                        {alternativas.map((alt) => (
                            <li key={alt.codigo}>
                                {alt.nombre} - ${alt.precio.toFixed(2)} - Score: {renderScore(alt.scoreTotal)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductScanner;
