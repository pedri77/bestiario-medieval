import {useEffect, useRef} from 'react';
import {bestias, commons, hojeo, IMG, img, type Bestia} from '../content';
import {easeInOutSine, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma, irAPosicion} from '../lib/scroll';

/**
 * Hojear el libro: un pliego abierto (miniatura a la izquierda, texto a la derecha) cuya hoja derecha
 * pasa con el scroll. En móvil el pliego se apila (miniatura arriba, texto abajo) y la hoja gira sobre
 * un lomo horizontal. Cuatro huecos con todas las bestias dentro; cada fotograma enseña la que toca:
 *   izquierda = miniatura i · debajo a la derecha = texto i+1 · hoja: anverso texto i, reverso miniatura i+1
 *
 * Guion de scroll (p), sección de 40 svh por página:
 *   0.03 – 0.97  q = 0 … N−1; en cada tramo la hoja reposa el 25 % inicial y el 15 % final y gira en medio
 *               (easeInOutSine); la sombra de la hoja sigue sin(π·t)
 *   índice      el punto activo es la bestia más cercana a q
 */

const N = bestias.length;
const VH_POR_PAGINA = 40;
const ALTO_VH = VH_POR_PAGINA * (N - 1) + 140;
const P0 = 0.03;
const P1 = 0.97;

type Hueco = (HTMLDivElement | null)[];

export function Hojeo() {
  const raizRef = useRef<HTMLElement>(null);
  const hojaRef = useRef<HTMLDivElement>(null);
  const sombraRef = useRef<HTMLDivElement>(null);
  const izq = useRef<Hueco>([]);
  const der = useRef<Hueco>([]);
  const anverso = useRef<Hueco>([]);
  const reverso = useRef<Hueco>([]);
  const puntoRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const folioRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let pAnterior = -1;
    let anchoAnterior = 0;
    // Lo que se ve al montar: izquierda y anverso la 0; derecha y reverso la 1.
    const visibles = new Map<Hueco, number>([
      [izq.current, 0],
      [der.current, 1],
      [anverso.current, 0],
      [reverso.current, 1],
    ]);
    const muestra = (hueco: Hueco, i: number) => {
      if (visibles.get(hueco) === i) return;
      const antes = visibles.get(hueco);
      if (antes !== undefined && hueco[antes]) hueco[antes]!.style.display = 'none';
      if (hueco[i]) hueco[i]!.style.display = '';
      visibles.set(hueco, i);
    };
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      const vw = window.innerWidth;
      if (!visible || (Math.abs(p - pAnterior) < 0.00005 && vw === anchoAnterior)) return;
      pAnterior = p;
      anchoAnterior = vw;

      const q = tramo(p, P0, P1) * (N - 1);
      const i = Math.min(N - 2, Math.floor(q));
      const t = easeInOutSine(tramo(q - i, 0.25, 0.85));
      muestra(izq.current, i);
      muestra(der.current, i + 1);
      muestra(anverso.current, i);
      muestra(reverso.current, i + 1);
      const vertical = vw < 768;
      hojaRef.current!.style.transform = vertical ? `rotateX(${180 * t}deg)` : `rotateY(${-180 * t}deg)`;
      sombraRef.current!.style.opacity = String(Math.sin(Math.PI * t) * 0.35);

      const activo = Math.round(q);
      puntoRefs.current.forEach((b, k) => b?.setAttribute('aria-current', k === activo ? 'true' : 'false'));
      folioRef.current!.textContent = hojeo.folio(activo + 1, N);
    });
  }, []);

  const ir = (k: number) => {
    const raiz = raizRef.current!;
    const top = raiz.getBoundingClientRect().top + window.scrollY;
    const recorrido = raiz.offsetHeight - window.innerHeight;
    // Al final del reposo de la página k (t = 0 del tramo k).
    const p = P0 + (k / (N - 1)) * (P1 - P0);
    irAPosicion(top + p * recorrido + 2);
  };

  return (
    <section ref={raizRef} id="libro" aria-labelledby="libro-titulo" className="relative" style={{height: `${ALTO_VH}svh`}}>
      <h2 id="libro-titulo" className="sr-only">
        {hojeo.antetitulo}
      </h2>
      <ol className="sr-only">
        {bestias.map((b) => (
          <li key={b.id}>
            <h3>
              {b.nombre} ({b.latin})
            </h3>
            <p>
              {hojeo.dice}: {b.dice}
            </p>
            <p>
              {hojeo.moraleja}: {b.moraleja}
            </p>
            <p>
              {IMG[b.id].manuscrito}, {IMG[b.id].fecha}.
            </p>
          </li>
        ))}
      </ol>

      <div className="lapis sticky top-0 flex h-pantalla flex-col items-center justify-center gap-[2svh] overflow-hidden px-3 pt-[2svh] pb-[6svh]">
        <p className="versalitas flex items-baseline gap-3 text-etiqueta text-oro" aria-hidden="true">
          {hojeo.antetitulo} · <span ref={folioRef} className="tabular-nums">{hojeo.folio(1, N)}</span>
        </p>
        <div
          aria-hidden="true"
          className="pliego relative grid h-[calc(var(--pw)*1.9)] w-[var(--pw)] grid-rows-2 [--pw:min(92vw,44svh)] md:h-[calc(var(--pw)*1.3)] md:w-[calc(var(--pw)*2)] md:grid-cols-2 md:grid-rows-1 md:[--pw:min(40vw,62svh)]"
          style={{perspective: '2400px'}}
        >
            {/* Página izquierda (arriba en móvil): miniatura i */}
            <div className="pergamino relative overflow-hidden rounded-t-[4px] shadow-[inset_-18px_0_30px_-20px_oklch(30%_0.05_60/0.6)] md:rounded-l-[4px] md:rounded-tr-none">
              {bestias.map((b, k) => (
                <div
                  key={b.id}
                  ref={(el) => {
                    izq.current[k] = el;
                  }}
                  className="absolute inset-0"
                  style={{display: k === 0 ? '' : 'none'}}
                >
                  <PaginaImagen b={b} />
                </div>
              ))}
            </div>
            {/* Página derecha (abajo en móvil): texto i+1, debajo de la hoja */}
            <div className="pergamino relative overflow-hidden rounded-b-[4px] md:rounded-r-[4px] md:rounded-bl-none">
              {bestias.map((b, k) => (
                <div
                  key={b.id}
                  ref={(el) => {
                    der.current[k] = el;
                  }}
                  className="absolute inset-0"
                  style={{display: k === 1 ? '' : 'none'}}
                >
                  <PaginaTexto b={b} n={k + 1} />
                </div>
              ))}
            </div>
            {/* La hoja que pasa: hija directa del pliego para que reciba la perspectiva */}
              <div ref={hojaRef} className="absolute inset-x-0 bottom-0 h-1/2 origin-top md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-1/2 md:origin-left" style={{transformStyle: 'preserve-3d'}}>
                <div className="pergamino absolute inset-0 overflow-hidden" style={{backfaceVisibility: 'hidden'}}>
                  {bestias.map((b, k) => (
                    <div
                      key={b.id}
                      ref={(el) => {
                        anverso.current[k] = el;
                      }}
                      className="absolute inset-0"
                      style={{display: k === 0 ? '' : 'none'}}
                    >
                      <PaginaTexto b={b} n={k + 1} />
                    </div>
                  ))}
                  <div ref={sombraRef} className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,oklch(20%_0.03_50),transparent)] md:bg-[linear-gradient(to_right,oklch(20%_0.03_50),transparent)]" style={{opacity: 0}} />
                </div>
                <div className="pergamino absolute inset-0 overflow-hidden [transform:rotateX(180deg)] md:[transform:rotateY(180deg)]" style={{backfaceVisibility: 'hidden'}}>
                  {bestias.map((b, k) => (
                    <div
                      key={b.id}
                      ref={(el) => {
                        reverso.current[k] = el;
                      }}
                      className="absolute inset-0"
                      style={{display: k === 1 ? '' : 'none'}}
                    >
                      <PaginaImagen b={b} />
                    </div>
                  ))}
                </div>
              </div>
        </div>
        {/* Índice, dentro de la capa fija y fuera de lo aria-hidden */}
        <nav aria-label={hojeo.indice} className="absolute inset-x-0 bottom-[1.5svh] z-10 flex justify-center">
          <ol className="flex max-w-[96vw] flex-wrap justify-center gap-1.5 px-2">
            {bestias.map((b, k) => (
              <li key={b.id}>
                <button
                  ref={(el) => {
                    puntoRefs.current[k] = el;
                  }}
                  type="button"
                  onClick={() => ir(k)}
                  aria-label={`${hojeo.indice}: ${b.nombre}`}
                  title={b.nombre}
                  className="block size-3 rotate-45 border border-oro transition-colors aria-[current=true]:bg-oro"
                />
              </li>
            ))}
          </ol>
        </nav>
      </div>

    </section>
  );
}

function PaginaImagen({b}: {b: Bestia}) {
  const im = IMG[b.id];
  return (
    <figure className="flex size-full flex-col items-center justify-center gap-[3%] p-[7%]">
      <img src={img(b.id)} alt="" width={im.w} height={im.h} loading="lazy" decoding="async" className="marco-oro max-h-[82%] w-auto max-w-full object-contain" />
      <figcaption className="text-center text-[calc(var(--pw)*0.032)] text-[oklch(40%_0.03_50)] italic">
        {im.manuscrito}, {im.fecha} ·{' '}
        <a href={commons(im.fichero)} target="_blank" rel="noopener" tabIndex={-1} className="underline decoration-[oklch(60%_0.05_70)] underline-offset-2">
          Commons
        </a>
      </figcaption>
    </figure>
  );
}

function PaginaTexto({b, n}: {b: Bestia; n: number}) {
  return (
    <div className="flex size-full flex-col p-[7%] text-[calc(var(--pw)*0.04)] leading-[1.45] md:text-[calc(var(--pw)*0.036)]">
      <p className="versalitas text-[0.8em] text-[oklch(45%_0.03_50)]">fol. {n}</p>
      <h3 className="mt-[2%] font-display text-[2.6em] leading-none text-rojo-profundo">{b.nombre}</h3>
      <p className="mt-[1%] text-[0.95em] text-[oklch(42%_0.03_50)] italic">{b.latin}</p>
      <p className="versalitas mt-[5%] text-[0.85em] text-void">{hojeo.dice}</p>
      <p className="mt-[1%]">{b.dice}</p>
      <p className="versalitas mt-[4%] text-[0.85em] text-void">{hojeo.moraleja}</p>
      <p className="mt-[1%] italic">{b.moraleja}</p>
    </div>
  );
}
