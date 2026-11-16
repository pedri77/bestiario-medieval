# El libro de las bestias · Bestiario medieval

Web cinemática con un bestiario medieval que se hojea con el scroll: unicornios, pelícanos, basiliscos y el mapa de los monstruos de Hereford.

Demo: https://pedri77.github.io/bestiario-medieval/

## Qué tiene

- Portada: un códice que se abre en 3D y una inicial que se dibuja sobre pan de oro.
- 25 bestias en un libro que pasa página con el scroll (en móvil, la hoja pasa hacia arriba), con índice navegable por teclado.
- El Mappa Mundi de Hereford con una cámara que recorre 13 criaturas y lugares, con etiquetas ancladas.
- «Lo que creían, lo que es»: seis comparaciones con un deslizador nativo.

## Imágenes y derechos

- Miniaturas: Wikimedia Commons, dominio público o CC0 (bestiarios de Aberdeen, Rochester, Harley MS 4751 y Copenhague GKS 1633, siglos XII y XIII). Cada una enlaza a su fichero en los créditos de la página.
- Mapa: facsímil de F. T. Havergal (1872) del Mappa Mundi de Hereford, dominio público.
- Textos: resúmenes propios en castellano. Algunas moralejas medievales contienen prejuicios; se mencionan, no se suscriben.
- Textos y código hechos con IA (Claude) y revisados.

```bash
python3 -I scripts/explorar.py                         # licencias y tamaños en Commons
uv run --with pillow python -I scripts/imagenes.py     # WebP en public/
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3011
npm run lint && npm run build
```

React 19, Vite, Tailwind 4 y Lenis; un solo bucle `requestAnimationFrame`. Respeta `prefers-reduced-motion`. Despliegue a GitHub Pages con `.github/workflows/pages.yml` en cada push a `main`.
