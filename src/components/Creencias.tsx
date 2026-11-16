import {useState} from 'react';
import {creencias, img} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/**
 * Lo que creían, lo que es: seis tarjetas con un deslizador que barre de la creencia medieval
 * (pergamino) a lo que sabemos hoy (lapislázuli). Las dos caras ocupan la misma celda de rejilla, así
 * la tarjeta mide lo que la más larga; la de hoy se recorta con clip-path según el valor.
 * El deslizador es un input range nativo: teclado y lectores de pantalla incluidos.
 */
export function Creencias() {
  const ref = useAparecer<HTMLElement>();
  return (
    <section ref={ref} id="creencias" aria-labelledby="creencias-titulo" className="lapis relative px-4 pt-[14svh] pb-[14svh] sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[84rem]">
        <p data-aparece className="versalitas text-etiqueta text-oro">
          {creencias.antetitulo}
        </p>
        <h2 id="creencias-titulo" data-aparece style={{'--i': 1} as React.CSSProperties} className="mt-2 font-display text-display text-texto">
          {creencias.titulo}
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {creencias.casos.map((c, i) => (
            <li key={c.id} data-aparece style={{'--i': i % 3} as React.CSSProperties}>
              <Tarjeta {...c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tarjeta({id, nombre, creian, es}: {id: string; nombre: string; creian: string; es: string}) {
  const [v, setV] = useState(0);
  return (
    <article className="overflow-hidden rounded-[4px] bg-pergamino text-tinta ring-2 ring-oro">
      <header className="flex items-center gap-3 border-b-2 border-oro px-4 py-3">
        <img src={img(id)} alt="" loading="lazy" decoding="async" className="size-12 rounded-full object-cover ring-2 ring-oro" />
        <h3 className="font-display text-[1.75rem] leading-none text-rojo-profundo">{nombre}</h3>
      </header>
      <div className="relative grid">
        <div className="col-start-1 row-start-1 px-4 py-5">
          <p className="versalitas text-[0.875rem] text-[oklch(45%_0.03_50)]">{creencias.creian}</p>
          <p className="mt-1 text-[1.125rem] leading-snug">{creian}</p>
        </div>
        <div className="col-start-1 row-start-1 bg-void px-4 py-5 text-texto" style={{clipPath: `inset(0 ${100 - v}% 0 0)`}} aria-hidden={v < 50}>
          <p className="versalitas text-[0.875rem] text-oro">{creencias.es}</p>
          <p className="mt-1 text-[1.125rem] leading-snug">{es}</p>
        </div>
        <span className="pointer-events-none absolute inset-y-0 w-0.5 bg-oro" style={{left: `${v}%`, opacity: v > 0 && v < 100 ? 1 : 0}} aria-hidden="true" />
      </div>
      <div className="flex items-center gap-3 border-t-2 border-oro px-4 py-3">
        <span className="versalitas text-[0.8125rem]" aria-hidden="true">
          {creencias.creian}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(+e.target.value)}
          aria-label={creencias.etiqueta(nombre)}
          aria-valuetext={v < 50 ? `${creencias.creian}: ${creian}` : `${creencias.es}: ${es}`}
          className="deslizador h-8 flex-1 cursor-ew-resize"
        />
        <span className="versalitas text-[0.8125rem]" aria-hidden="true">
          {creencias.es}
        </span>
      </div>
    </article>
  );
}
