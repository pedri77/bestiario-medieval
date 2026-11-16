import {intro} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/** Pausa tras la portada: qué era un bestiario, en una página de pergamino con capitular. */
export function Intro() {
  const ref = useAparecer<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="intro-titulo" className="pergamino relative px-4 pt-[12svh] pb-[14svh] sm:px-6 md:px-[6vw]">
      <div className="mx-auto grid max-w-[80rem] gap-10 md:grid-cols-[1fr_1.1fr] md:gap-[6vw]">
        <div>
          <p data-aparece className="versalitas text-etiqueta text-rojo-profundo">
            {intro.antetitulo}
          </p>
          <h2 id="intro-titulo" data-aparece style={{'--i': 1} as React.CSSProperties} className="mt-3 text-display font-medium">
            {intro.titulo}
          </h2>
        </div>
        <div className="grid content-start gap-5 text-body md:pt-8">
          {intro.cuerpo.map((t, i) => (
            <p key={i} data-aparece style={{'--i': i + 2} as React.CSSProperties} className={i === 0 ? 'first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.6em] first-letter:leading-[0.8] first-letter:text-rojo-profundo' : undefined}>
              {t}
            </p>
          ))}
          <p data-aparece style={{'--i': 4} as React.CSSProperties} className="border-l-4 border-oro-2 pl-4 text-[1rem] italic">
            {intro.nota}
          </p>
        </div>
      </div>
    </section>
  );
}
