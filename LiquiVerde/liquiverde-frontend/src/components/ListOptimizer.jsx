import React, { useState } from 'react';
import { optimizeLista } from '../api/liquiVerdeApi.js';

const pill = (text, color = '#76ff03') => ({
  display: 'inline-block',
  padding: '4px 10px',
  borderRadius: '999px',
  background: 'rgba(118,255,3,0.08)',
  color,
  fontWeight: 600,
  fontSize: '0.85rem',
});

const ProgressBar = ({ value = 0, max = 100 }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ height: 10, width: '100%', background: '#2a2a2a', borderRadius: 6, overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: '#03a9f4',
        boxShadow: '0 2px 8px rgba(3,169,244,0.2)',
        transition: 'width 0.5s ease'
      }} />
    </div>
  );
};

const Money = ({ value }) => <span style={{ fontWeight: 700 }}>${Number(value).toFixed(2)}</span>;

const ListOptimizer = () => {
  const [inputCodigos, setInputCodigos] = useState('');
  const [presupuesto, setPresupuesto] = useState("");
  const [listaOptimizada, setListaOptimizada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptimize = async () => {
    const codigosArray = inputCodigos.split(',').map(c => c.trim()).filter(c => c.length > 0);
    // Aseguramos que el presupuesto sea un número válido antes de la validación
    const budgetValue = parseFloat(presupuesto);

    if (codigosArray.length === 0 || isNaN(budgetValue) || budgetValue <= 0) {
      setError('Debe ingresar códigos de producto y un presupuesto válido (mayor a cero).');
      return;
    }

    setLoading(true);
    setError('');
    setListaOptimizada(null);

    const listaParaOptimizar = {
      nombre: "Lista Web",
      presupuestoMaximo: budgetValue, // Usamos el valor numérico
      codigosOriginales: codigosArray,
    };

    try {
      const result = await optimizeLista(listaParaOptimizar);
      setListaOptimizada(result);
    } catch (err) {
      setError(`Fallo la optimización: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  // utilitarios para mostrar cambios seguros
  const safe = (v, fallback = 0) => (typeof v === 'number' ? v : (v ? Number(v) : fallback));

  return (
    <div style={{
      maxWidth: 900,
      margin: '20px auto',
      padding: '24px',
      backgroundColor: '#1e1e1e',
      borderRadius: 12,
      boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
      color: '#e6e6e6'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div>
          <h2 style={{ margin: 0, color: '#76ff03' }}>🛒 Generador de Listas Optimizadas</h2>
          <p style={{ marginTop: 8, color: '#bdbdbd' }}>
            Ingresa códigos de barras (separados por coma) y define un presupuesto.
          </p>
        </div>
      </div>

      {/* Formulario - MODIFICADO para disposición vertical */}
      <div style={{ marginTop: 18 }}>
        {/* Códigos (separados por coma) */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#bdbdbd' }}>Códigos (separados por coma)</label>
          <input
            type="text"
            value={inputCodigos}
            onChange={(e) => setInputCodigos(e.target.value)}
            placeholder="780..., 780..."
            style={{
              width: '95%',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #2b2b2b',
              background: '#151515',
              color: '#fff',
              outline: 'none'
            }}
          />
          <div style={{ marginTop: 4, color: '#bdbdbd' }}>
            <small>Ej: 780100000001, 780100000002</small>
          </div>
        </div>

        {/* Presupuesto Máximo ($) - Ahora debajo y con ancho limitado */}
        <div style={{ marginBottom: 16, maxWidth: 160 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#bdbdbd' }}>Presupuesto Máximo ($)</label>
          <input
            type="number"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)} // Mantener como string en el estado
            placeholder="50.0"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #2b2b2b',
              background: '#151515',
              color: '#fff',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
        <button
          onClick={handleOptimize}
          disabled={loading}
          style={{
            padding: '10px 16px',
            backgroundColor: '#03a9f4',
            color: '#052026',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 6px 12px rgba(3,169,244,0.12)'
          }}
        >
          {loading ? 'Optimizando...' : 'Optimizar Lista'}
        </button>

        <button
          onClick={() => { setInputCodigos(''); setPresupuesto(""); setListaOptimizada(null); setError(''); }}
          style={{
            padding: '10px 12px',
            backgroundColor: '#2b2b2b',
            color: '#e0e0e0',
            border: '1px solid #333',
            borderRadius: 8,
            cursor: 'pointer'
          }}
        >
          Limpiar
        </button>
      </div>

      {error && <p style={{ marginTop: 12, color: '#ff6b6b' }}>Error: {error}</p>}

      {/* Resultados */}
      {listaOptimizada && (
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
          {/* Left: detalles */}
          <div style={{
            background: '#161616',
            padding: 16,
            borderRadius: 10,
            border: '1px solid #232323'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#76ff03' }}>📈 Resultados de Optimización</h3>
              <div style={{ color: '#bdbdbd' }}>
                <small>Lista: <b>{listaOptimizada.nombre || 'Lista Web'}</b></small>
              </div>
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#bdbdbd' }}>Presupuesto Máximo</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <Money value={safe(listaOptimizada.presupuestoMaximo, presupuesto)} />
                  <div style={{ flex: 1 }}>
                    <ProgressBar value={safe(listaOptimizada.presupuestoMaximo, presupuesto)} max={parseFloat(presupuesto) || 1} />
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: '#bdbdbd' }}>
                  Usado: <b>${safe(listaOptimizada.costoTotalOptimizado, 0).toFixed(2)}</b>
                </div>
              </div>

              <div style={{ width: 110, textAlign: 'center' }}>
                <div style={{ color: '#bdbdbd', fontSize: 12 }}>Ahorro</div>
                <div style={{ marginTop: 8, ...pill(`${(safe(listaOptimizada.costoTotalOriginal,0) - safe(listaOptimizada.costoTotalOptimizado,0)).toFixed(2)}`, '#80cbc4') }}>
                  ${ (safe(listaOptimizada.costoTotalOriginal,0) - safe(listaOptimizada.costoTotalOptimizado,0)).toFixed(2) }
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '14px 0' }} />

            <h4 style={{ margin: '8px 0', color: '#c5e1a5' }}>Comparación Total</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e6e6e6' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#bdbdbd', fontSize: 13 }}>
                  <th style={{ padding: '8px 6px' }}></th>
                  <th style={{ padding: '8px 6px' }}>Original</th>
                  <th style={{ padding: '8px 6px' }}>Optimizado</th>
                  <th style={{ padding: '8px 6px' }}>Ahorro/Impacto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 6px' }}>Costo Total</td>
                  <td style={{ padding: '8px 6px' }}><Money value={safe(listaOptimizada.costoTotalOriginal,0)} /></td>
                  <td style={{ padding: '8px 6px' }}><Money value={safe(listaOptimizada.costoTotalOptimizado,0)} /></td>
                  <td style={{ padding: '8px 6px' }}>${ (safe(listaOptimizada.costoTotalOriginal,0) - safe(listaOptimizada.costoTotalOptimizado,0)).toFixed(2) }</td>
                </tr>

                <tr>
                  <td style={{ padding: '8px 6px' }}>Impacto Promedio</td>
                  <td style={{ padding: '8px 6px' }}>{ safe(listaOptimizada.impactoTotalOriginal,0).toFixed(2) }</td>
                  <td style={{ padding: '8px 6px' }}>{ safe(listaOptimizada.impactoTotalOptimizado,0).toFixed(2) }</td>
                  <td style={{ padding: '8px 6px' }}>{ (safe(listaOptimizada.impactoTotalOptimizado,0) - safe(listaOptimizada.impactoTotalOriginal,0)).toFixed(2) } pts</td>
                </tr>
              </tbody>
            </table>

            {/* Productos seleccionados: si el backend devuelve objetos con detalles los mostramos, si no sólo códigos */}
            <div style={{ marginTop: 14 }}>
              <h4 style={{ margin: '6px 0', color: '#c5e1a5' }}>Productos Seleccionados</h4>

              {Array.isArray(listaOptimizada.productos) && listaOptimizada.productos.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
                  <thead>
                    <tr style={{ textAlign: 'left', color: '#bdbdbd' }}>
                      <th style={{ padding: 8 }}>Código</th>
                      <th style={{ padding: 8 }}>Nombre</th>
                      <th style={{ padding: 8 }}>Precio</th>
                      <th style={{ padding: 8 }}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaOptimizada.productos.map((p) => (
                      <tr key={p.codigo} style={{ borderTop: '1px solid #222' }}>
                        <td style={{ padding: 8, color: '#80cbc4' }}>{p.codigo}</td>
                        <td style={{ padding: 8 }}>{p.nombre || '-'}</td>
                        <td style={{ padding: 8 }}>${safe(p.precio,0).toFixed(2)}</td>
                        <td style={{ padding: 8 }}>{ typeof p.scoreTotal === 'number' ? p.scoreTotal.toFixed(1) : '-' }</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ marginTop: 8, color: '#bdbdbd' }}>
                  {Array.isArray(listaOptimizada.codigosOptimizados) && listaOptimizada.codigosOptimizados.length > 0
                    ? listaOptimizada.codigosOptimizados.join(', ')
                    : 'No hay productos detallados. El backend devolvió sólo códigos.'}
                </p>
              )}
            </div>
          </div>

          {/* Right: tarjeta resumida */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(3,169,244,0.06), rgba(118,255,3,0.03))',
            padding: 16,
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.03)'
          }}>
            <h4 style={{ marginTop: 0, color: '#0288d1' }}>Resumen rápido</h4>

            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, color: '#bdbdbd' }}>Costo Original</div>
              <div style={{ fontSize: 18, marginTop: 6 }}><Money value={safe(listaOptimizada.costoTotalOriginal,0)} /></div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, color: '#bdbdbd' }}>Costo Optimizado</div>
              <div style={{ fontSize: 18, marginTop: 6, color: '#76ff03' }}><Money value={safe(listaOptimizada.costoTotalOptimizado,0)} /></div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, color: '#bdbdbd' }}>Ahorro</div>
              <div style={{ fontSize: 20, marginTop: 6 }}>${ (safe(listaOptimizada.costoTotalOriginal,0) - safe(listaOptimizada.costoTotalOptimizado,0)).toFixed(2) }</div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 13, color: '#bdbdbd' }}>Impacto (orig → opt)</div>
              <div style={{ marginTop: 8 }}>
                <ProgressBar value={safe(listaOptimizada.impactoTotalOptimizado,0)} max={ Math.max(1, safe(listaOptimizada.impactoTotalOriginal,0)) } />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, color: '#bdbdbd', fontSize: 12 }}>
                  <span>Original: {safe(listaOptimizada.impactoTotalOriginal,0).toFixed(2)}</span>
                  <span>Optimizado: {safe(listaOptimizada.impactoTotalOptimizado,0).toFixed(2)}</span>
                </div>
            </div>
            </div>

            <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
              <button
                onClick={() => navigator.clipboard?.writeText(JSON.stringify(listaOptimizada))}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#4caf50',
                  color: '#021205',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                title="Copiar resultado (JSON)"
              >
                Copiar Resultado
              </button>

              <button
                onClick={() => { setListaOptimizada(null); setError(''); }}
                style={{
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid #2b2b2b',
                  background: '#121212',
                  color: '#e6e6e6',
                  cursor: 'pointer'
                }}
                title="Cerrar vista de resultados"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {!listaOptimizada && (
        <div style={{ marginTop: 18, color: '#9e9e9e' }}>
          <small>Después de optimizar, verás aquí el resumen con ahorros e impacto.</small>
        </div>
      )}
    </div>
  );
};

export default ListOptimizer;