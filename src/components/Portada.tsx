import {useEffect, useRef} from 'react';
import {portada} from '../content';
import {easeInOutSine, easeOutCubic, lerp, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * Portada: un códice cerrado sobre un cielo de lapislázuli. El scroll abre la tapa de cuero en 3D
 * (gira 178° sobre el lomo) y el libro se desplaza para quedar centrado abierto. En la primera página,
 * los zarcillos de la inicial se dibujan trazo a trazo, entra el pan de oro con la B y luego el íncipit.
 *
 * Guion de scroll (p), sección de 420 svh:
 *   0.00 – 0.05  quieto, libro cerrado; la invitación se apaga
 *   0.05 – 0.40  la tapa gira de 0° a −178° (easeInOutSine) y el libro se desplaza medio ancho
 *   0.36 – 0.62  los zarcillos se dibujan (stroke-dashoffset), escalonados
 *   0.50 – 0.62  el recuadro de oro y la B aparecen (easeOutCubic)
 *   0.60 – 0.76  el íncipit entra línea a línea
 *   0.80 – 1.00  el libro se acerca un poco (×1 → ×1,08) y queda quieto hasta soltarse
 */

const ALTO_VH = 420;
const ZARCILLOS = [
  'M6 6 H94 V94 H6 Z',
  'M11 11 H89 V89 H11 Z',
  'M6 6 C-4 -4 -10 8 0 12 C6 14 6 6 2 6',
  'M94 94 C104 104 110 92 100 88 C94 86 94 94 98 94',
]

export function Portada() {
  const raizRef = useRef<HTMLElement>(null);
  const libroRef = useRef<HTMLDivElement>(null);
  const tapaRef = useRef<HTMLDivElement>(null);
  const zarcilloRefs = useRef<(SVGPathElement | null)[]>([]);
  const oroRef = useRef<HTMLDivElement>(null);
  const lineaRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const invitaRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let pAnterior = -1;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00005) return;
      pAnterior = p;

      invitaRef.current!.style.opacity = String(1 - tramo(p, 0, 0.05));
      const k = easeInOutSine(tramo(p, 0.05, 0.4));
      tapaRef.current!.style.transform = `rotateY(${-178 * k}deg)`;
      const s = lerp(1, 1.08, easeOutCubic(tramo(p, 0.8, 1)));
      // En móvil el libro abierto no cabe: la tapa sale por la izquierda y la página queda centrada.
      const desplaza = window.innerWidth < 768 ? 0 : k / 2;
      libroRef.current!.style.transform = `translate3d(calc(var(--w) * ${desplaza}), 0, 0) scale(${s})`;
      zarcilloRefs.current.forEach((z, i) => {
        z!.style.strokeDashoffset = String(1 - tramo(p, 0.36 + i * 0.04, 0.5 + i * 0.04));
      });
      const o = easeOutCubic(tramo(p, 0.5, 0.62));
      oroRef.current!.style.opacity = String(o);
      oroRef.current!.style.transform = `scale(${lerp(0.85, 1, o)})`;
      lineaRefs.current.forEach((l, i) => {
        l!.style.opacity = String(tramo(p, 0.6 + i * 0.05, 0.68 + i * 0.05));
      });
    });
  }, []);

  const frases = portada.incipit.split(/(?<=,)\s/);

  return (
    <section ref={raizRef} id="inicio" aria-labelledby="portada-titulo" className="relative" style={{height: `${ALTO_VH}svh`}}>
      <div className="lapis sticky top-0 flex h-pantalla items-center justify-center overflow-hidden" style={{perspective: '2200px'}}>
        <div
          ref={libroRef}
          className="relative [--w:min(78vw,50svh)] md:[--w:min(44vw,50svh)]"
          style={{width: 'var(--w)', height: 'calc(var(--w) / 0.7)', transformStyle: 'preserve-3d'}}
        >
          {/* Primera página (debajo de la tapa) */}
          <div className="pergamino absolute inset-0 flex flex-col p-[7%] shadow-[0_30px_60px_-20px_oklch(10%_0.05_266/0.8)]">
            <div className="relative aspect-square w-[46%]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
                {ZARCILLOS.map((d, i) => (
                  <path
                    key={i}
                    ref={(el) => {
                      zarcilloRefs.current[i] = el;
                    }}
                    d={d}
                    pathLength={1}
                    strokeDasharray="1 1"
                    style={{strokeDashoffset: 1}}
                    fill="none"
                    stroke={i === 1 ? 'var(--color-void)' : 'var(--color-rojo)'}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                  />
                ))}
              </svg>
              <div
                ref={oroRef}
                className="absolute inset-[16%] flex items-center justify-center bg-[linear-gradient(135deg,var(--color-oro),var(--color-oro-2)_60%,var(--color-oro))] marco-oro"
                style={{opacity: 0}}
                aria-hidden="true"
              >
                <span className="font-display text-[calc(var(--w)*0.24)] leading-none text-void">{portada.inicial}</span>
              </div>
            </div>
            <div className="mt-[6%] grid gap-[0.4em] text-[calc(var(--w)*0.052)] leading-snug">
              {frases.map((f, i) => (
                <p
                  key={i}
                  ref={(el) => {
                    lineaRefs.current[i] = el;
                  }}
                  style={{opacity: 0}}
                >
                  {i === 0 ? (
                    <>
                      <span className="text-rojo-profundo">{f.split(' ')[0]}</span> {f.split(' ').slice(1).join(' ')}
                    </>
                  ) : (
                    f
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Tapa: cara de cuero y guarda */}
          <div ref={tapaRef} className="absolute inset-0 origin-left" style={{transformStyle: 'preserve-3d'}}>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-r-[6px] bg-[oklch(33%_0.07_38)] p-[8%] text-center shadow-[inset_0_0_0_2px_oklch(25%_0.05_38),inset_0_0_60px_oklch(18%_0.04_38/0.8)]"
              style={{backfaceVisibility: 'hidden'}}
            >
              <div className="absolute inset-[5%] border-2 border-oro-2" aria-hidden="true" />
              <div className="absolute inset-[8%] border border-oro-2/70" aria-hidden="true" />
              {[
                'top-[3%] left-[3%]',
                'top-[3%] right-[3%]',
                'bottom-[3%] left-[3%]',
                'right-[3%] bottom-[3%]',
              ].map((c) => (
                <span key={c} className={`absolute size-[9%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--color-oro),var(--color-oro-2)_60%,oklch(40%_0.06_70))] ${c}`} aria-hidden="true" />
              ))}
              <p className="versalitas relative text-[calc(var(--w)*0.045)] text-oro">{portada.antetitulo}</p>
              <h1 id="portada-titulo" className="relative mt-[6%] font-display text-[calc(var(--w)*0.2)] leading-none text-oro drop-shadow-[0_2px_0_oklch(20%_0.05_38)]">
                {portada.titulo}
              </h1>
              <svg viewBox="0 0 100 40" className="relative mt-[8%] w-[40%]" aria-hidden="true">
                <path d="M50 2 L96 20 L50 38 L4 20 Z" fill="none" stroke="var(--color-oro-2)" strokeWidth={1.5} />
                <path d="M50 10 L76 20 L50 30 L24 20 Z" fill="var(--color-oro-2)" opacity={0.6} />
              </svg>
              <p className="relative mt-[8%] text-[calc(var(--w)*0.05)] text-oro-2 italic">{portada.tapa}</p>
            </div>
            <div className="pergamino absolute inset-0 rounded-l-[6px]" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', filter: 'brightness(0.93)'}} aria-hidden="true" />
          </div>
        </div>

        <p ref={invitaRef} className="versalitas absolute bottom-[3svh] left-1/2 -translate-x-1/2 text-etiqueta text-oro">
          {portada.invitacion} ↓
        </p>
      </div>
    </section>
  );
}
