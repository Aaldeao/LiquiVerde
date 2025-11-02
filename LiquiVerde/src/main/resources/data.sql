-- Reiniciar la tabla de productos (Solo para entornos de desarrollo/test)
DELETE FROM productos;

-- Producto 1: Leche de Almendras (Score Alto / Precio Medio)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (1, 'Bebida Vegetal', 'LoncoLeche', '780100000001', 'Lacteos, Bebidas, Veganas', 'Bio, Organico', 'Chile', 2500.0, 'carton', 70.0, 95.0, 80.0, 83.0);

-- Producto 2: Yogurt Bebible (Score Medio / Precio Bajo)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (2, 'Yogurt Batido Vainilla Light', 'Soprole', '780100000002', 'Lacteos, Postres', 'Bajo en grasa', 'Chile', 890.0, 'plastico', 85.0, 60.0, 75.0, 75.0);

-- Producto 3: Galletas Ricas (Score Bajo / Precio Bajo - Mala Opción)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (3, 'Galletas de Chocolate', 'Costa', '780100000003', 'Snacks, Reposteria', 'Azucarado', 'Chile', 960.0, 'plastico', 80.0, 30.0, 50.0, 50.0);

-- Producto 4: Sustituto de Galletas (Score Alto / Precio similar - Mejor Opción)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (4, 'Galletón Avena y Almendras', 'Quaker', '780100000004', 'Snacks, Reposteria, Saludable', 'Fibra, Natural', 'Chile', 580.0, 'carton', 75.0, 85.0, 70.0, 78.0);

-- Producto 5: Agua Mineral (Score Medio)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (5, 'Agua Mineral Con Gas 1.5L', 'Cachantún', '780100000005', 'Bebidas, Agua', 'Natural', 'Chile', 800.0, 'plastico', 90.0, 60.0, 70.0, 74.0);

-- Producto 6: Café Tostado Local (Alto Score / Precio Alto)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (6, 'Café de Grano Tostado 250g', 'Juan Valdez', '780100000006', 'Bebidas, Cafe', 'Comercio Justo, Gourmet', 'Colombia', 5000.0, 'bolsa_biodegradable', 60.0, 95.0, 90.0, 90.0);

-- Producto 7: Arroz Blanco (Score Medio/Bajo / Precio Bajo)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (7, 'Arroz Blanco (Bolsa 1kg)', 'Tucapel', '780100000007', 'Granos, Despensa', 'Tradicional', 'Importado', 900.0, 'bolsa_plastico', 80.0, 50.0, 50.0, 60.0);

-- Producto 8: Detergente Biodegradable (Alternativa Sostenible)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (8, 'Detergente Ecológico Ropa', 'Quix', '780100000008', 'Limpieza', 'Biodegradable, Sin fosfatos', 'Chile', 3200.0, 'plastico_reciclado', 75.0, 95.0, 85.0, 88.0);

-- Producto 9: Detergente Químico (Producto a Sustituir)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (9, 'Detergente Líquido 1L', 'Omo', '780100000009', 'Limpieza', 'Quimico', 'Chile', 2800.0, 'plastico', 80.0, 35.0, 50.0, 45.0);

-- Producto 10: Plátanos Orgánicos (Score Alto / Precio Muy Bajo)
INSERT INTO productos (id, nombre, marca, codigo, categorias, etiquetas, origen, precio, envase, score_economico, score_ambiental, score_social, score_total) 
VALUES (10, 'Plátanos Orgánicos Premium', 'Frutas', '780100000010', 'Frutas', 'Orgánico, Sin pesticidas', 'Ecuador', 600.0, 'nulo', 95.0, 85.0, 75.0, 85.0);