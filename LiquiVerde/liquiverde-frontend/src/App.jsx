import React, { useState } from 'react';
import Home from './components/Home';
import ProductScanner from './components/ProductScanner';
import ListOptimizer from './components/ListOptimizer';

function App() {
    const [view, setView] = useState('home'); 

    const renderView = () => {
        switch (view) {
            case 'scanner': return <ProductScanner />;
            case 'optimizer': return <ListOptimizer />;
            default: return <Home setView={setView} />;
        }
    };

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', backgroundColor: '#121212', color: '#e0e0e0' }}>
            <header style={{
                backgroundColor: '#1e1e1e',
                padding: '20px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
            }}>
                <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#76ff03' }}>🌿 LiquiVerde: Retail Inteligente</h1>
                {view !== 'home' && (
                    <button 
                        onClick={() => setView('home')}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            padding: '8px 15px',
                            backgroundColor: '#333',
                            color: '#76ff03',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: '0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#4caf50'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
                    >
                        ← Volver
                    </button>
                )}
            </header>

            <main
                style={{
                    padding: '30px',
                    display: 'flex',
                    justifyContent: 'center', // centra horizontalmente
                    alignItems: 'flex-start',  // mantiene arriba, no al medio
                    minHeight: 'calc(100vh - 100px)',
                }}
                >
                <div style={{ width: '100%', maxWidth: '900px' }}>
                    {renderView()}
                </div>
            </main>
        </div>
    );
}

export default App;
