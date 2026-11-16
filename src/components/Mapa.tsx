import {useEffect, useRef} from 'react';
import {mapa, mapaUrl, IMG} from '../content';
import {clamp, easeInOutSine, lerp, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * El mapa de los monstruos: el Mappa Mundi de Hereford entero y, con el scroll, una cámara que viaja de
 * criatura en criatura (Juicio, Paraíso, Jerusalén y los pueblos monstruosos del borde africano). En cada
 * parada, una etiqueta anclada al punto exacto de la figura (patrón 13).
 *
 * Guion de scroll (p), sección de 46 svh por tramo:
 *   0.02 – 0.98  paradas 0 … M (0 = mapa entero con el texto de entrada)
 *   en cada tramo  reposo el 35 % inicial; luego viaja (easeInOutSine): el zoom se interpola en
 *                 logaritmo y el foco en la imagen, así la cámara no «tropieza» al acercarse
 *   etiquetas     la de la parada actual se apaga en 0.30–0.40 del tramo; la siguiente entra en 0.92–1
 *   texto entrada se apaga durante el primer viaje
 */

const PUNTOS = mapa.puntos;
const PARADAS = [{x: 0.5, y: 0.5, zoom: 1}, ...PUNTOS];
const M = PARADAS.length - 1;
const ALTO_VH = 46 * M + 120;
const ASPECTO = IMG.mapa.w / IMG.mapa.h;

export function Mapa() {
  const raizRef = useRef<HTMLElement>(null);
  const capaRef = useRef<HTMLDivElement>(null);
  const entradaRef = useRef<HTMLDivElement>(null);
  const etiquetaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contadorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let pAnterior = -1;
    let anchoAnterior = 0;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (!visible || (Math.abs(p - pAnterior) < 0.00005 && vw === anchoAnterior)) return;
      pAnterior = p;
      anchoAnterior = vw;
      const movil = vw < 768;

      // Mapa encajado (contain) al 94 % a zoom 1.
      let h = vh * 0.94;
      let w = h * ASPECTO;
      if (w > vw * 0.94) {
        w = vw * 0.94;
        h = w / ASPECTO;
      }
      const q = tramo(p, 0.02, 0.98) * M;
      const j = Math.min(M - 1, Math.floor(q));
      const u = q - j;
      const s = easeInOutSine(tramo(u, 0.35, 1));
      const a = PARADAS[j];
      const b = PARADAS[j + 1];
      const objetivo = (k: number) => (k === 0 ? [vw / 2, vh / 2] : movil ? [vw / 2, vh * 0.36] : [vw * 0.4, vh * 0.5]);
      const [cax, cay] = objetivo(j);
      const [cbx, cby] = objetivo(j + 1);
      const z = Math.exp(lerp(Math.log(a.zoom), Math.log(b.zoom), s));
      const fx = lerp(a.x, b.x, s);
      const fy = lerp(a.y, b.y, s);
      const cx = lerp(cax, cbx, s);
      const cy = lerp(cay, cby, s);
      const capa = capaRef.current!;
      capa.style.width = `${w}px`;
      capa.style.height = `${h}px`;
      capa.style.transform = `translate3d(${cx - fx * w * z}px, ${cy - fy * h * z}px, 0) scale(${z})`;

      entradaRef.current!.style.opacity = String(j === 0 ? 1 - tramo(u, 0.3, 0.5) : 0);
      etiquetaRefs.current.forEach((el, k) => {
        if (!el) return;
        const parada = k + 1;
        let o = 0;
        if (parada === j) o = 1 - tramo(u, 0.3, 0.4);
        else if (parada === j + 1) o = tramo(u, 0.92, 1);
        el.style.opacity = String(o);
        el.style.visibility = o > 0.01 ? 'visible' : 'hidden';
        const [x, y] = objetivo(parada);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      const actual = clamp(Math.round(q), 0, M);
      contadorRef.current!.textContent = actual === 0 ? '' : `${actual} / ${M}`;
    });
  }, []);

  return (
    <section ref={raizRef} id="mapa" aria-labelledby="mapa-titulo" className="relative" style={{height: `${ALTO_VH}svh`}}>
      <ol className="sr-only">
        {PUNTOS.map((pt) => (
          <li key={pt.id}>
            {pt.nombre}: {pt.texto}
          </li>
        ))}
      </ol>
      <div className="sticky top-0 h-pantalla overflow-hidden bg-superficie">
        <div ref={capaRef} className="absolute top-0 left-0 origin-top-left will-change-transform">
          <img src={mapaUrl} alt={mapa.etiqueta} width={IMG.mapa.w} height={IMG.mapa.h} loading="lazy" decoding="async" className="block size-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(15%_0.08_266/0.75))]" aria-hidden="true" />

        <div ref={entradaRef} className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,oklch(20%_0.1_266/0.95)_55%,transparent)] px-4 pt-24 pb-[4svh] sm:px-6 md:inset-x-auto md:top-0 md:left-0 md:flex md:w-[40vw] md:flex-col md:justify-center md:bg-[linear-gradient(to_right,oklch(20%_0.1_266/0.95)_60%,transparent)] md:px-[5vw] md:pt-0">
          <p className="versalitas text-etiqueta text-oro">{mapa.antetitulo}</p>
          <h2 id="mapa-titulo" className="mt-2 font-display text-display text-texto">
            {mapa.titulo}
          </h2>
          <p className="mt-3 max-w-[28rem] text-body text-texto-2">{mapa.cuerpo}</p>
          <p className="mt-3 text-[0.875rem] text-texto-3 italic">{mapa.fuente}</p>
        </div>

        {PUNTOS.map((pt, k) => (
          <div
            key={pt.id}
            ref={(el) => {
              etiquetaRefs.current[k] = el;
            }}
            className="absolute top-0 left-0"
            style={{opacity: 0, visibility: 'hidden'}}
            aria-hidden="true"
          >
            <span className="ancla-punto" />
            <div className="absolute top-6 left-1/2 w-[min(84vw,20rem)] -translate-x-1/2 border border-oro bg-[oklch(20%_0.1_266/0.92)] p-4 text-texto backdrop-blur-sm md:top-1/2 md:left-24 md:translate-x-0 md:-translate-y-1/2">
              <p className="font-display text-[1.75rem] leading-none text-oro">{pt.nombre}</p>
              <p className="mt-2 text-[1.0625rem] leading-snug">{pt.texto}</p>
            </div>
          </div>
        ))}

        <p className="versalitas absolute right-4 bottom-[3svh] text-etiqueta text-oro tabular-nums sm:right-6" aria-hidden="true">
          <span ref={contadorRef} />
        </p>
      </div>
    </section>
  );
}
