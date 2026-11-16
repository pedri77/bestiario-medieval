import {bestias, commons, creditos, IMG} from '../content';
import {useAjustarTexto} from '../hooks/useAjustarTexto';
import {useAparecer} from '../hooks/useAparecer';
import {irA} from '../lib/scroll';

/** Cierre: fuentes con enlace a cada miniatura en Commons y wordmark gótico de borde a borde. */
export function Creditos() {
  const ref = useAparecer<HTMLElement>();
  const marca = useAjustarTexto<HTMLSpanElement>();
  return (
    <footer ref={ref} aria-labelledby="creditos-titulo" className="lapis relative pt-[12svh]">
      <div className="mx-auto grid max-w-[84rem] gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.3fr] md:px-[6vw]">
        <div>
          <p data-aparece className="versalitas text-etiqueta text-oro">
            {creditos.antetitulo}
          </p>
          <h2 id="creditos-titulo" data-aparece style={{'--i': 1} as React.CSSProperties} className="mt-2 font-display text-display text-texto">
            {creditos.titulo}
          </h2>
          <p data-aparece style={{'--i': 2} as React.CSSProperties} className="mt-5 text-body text-texto-2">
            {creditos.cuerpo}
          </p>
          <p data-aparece style={{'--i': 3} as React.CSSProperties} className="mt-4 border-l-4 border-oro pl-4 text-[1rem] text-texto-2 italic">
            {creditos.aviso}
          </p>
          <button
            type="button"
            onClick={() => irA('#inicio')}
            data-aparece
            style={{'--i': 4} as React.CSSProperties}
            className="mt-8 px-5 py-2.5 text-[1rem] font-semibold text-oro ring-2 ring-oro transition-colors hover:bg-oro hover:text-void"
          >
            ↑ {creditos.volver}
          </button>
          <p className="mt-8 text-[0.875rem] text-texto-3">{creditos.firma}</p>
        </div>
        <ul data-aparece style={{'--i': 2} as React.CSSProperties} className="columns-1 gap-8 text-[0.9375rem] leading-relaxed text-texto-2 sm:columns-2">
          {[...bestias.map((b) => ({id: b.id, nombre: b.nombre})), {id: 'mapa', nombre: 'Mappa Mundi'}].map(({id, nombre}) => (
            <li key={id} className="mb-1 break-inside-avoid">
              <a href={commons(IMG[id].fichero)} target="_blank" rel="noopener" className="underline decoration-borde underline-offset-4 hover:text-texto hover:decoration-oro">
                {nombre}
              </a>{' '}
              <span className="text-texto-3">
                · {IMG[id].manuscrito}, {IMG[id].fecha}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-[10svh] overflow-hidden px-4 pt-[0.1em] sm:px-6 md:px-[6vw]" aria-hidden="true">
        <span ref={marca} className="inline-block font-display leading-[1.1] whitespace-nowrap text-oro">
          {creditos.wordmark}
        </span>
      </div>
    </footer>
  );
}
