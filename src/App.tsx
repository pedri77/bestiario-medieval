import {useEffect} from 'react';
import {Creditos} from './components/Creditos';
import {Creencias} from './components/Creencias';
import {Hojeo} from './components/Hojeo';
import {Intro} from './components/Intro';
import {Mapa} from './components/Mapa';
import {PalabraAPalabra} from './components/patrones/PalabraAPalabra';
import {Portada} from './components/Portada';
import {tesis} from './content';
import {useMovimientoReducido} from './hooks/useMovimientoReducido';
import {iniciarScroll} from './lib/scroll';

/** Orden del guion: códice · qué es un bestiario · hojear · mapa de monstruos · creencias · tesis · fuentes. */
export default function App() {
  const reducido = useMovimientoReducido();
  useEffect(() => iniciarScroll(reducido), [reducido]);
  return (
    <main>
      <Portada />
      <Intro />
      <Hojeo />
      <Mapa />
      <Creencias />
      <PalabraAPalabra frase={tesis.frase} firma={tesis.firma} etiqueta={tesis.etiqueta} />
      <Creditos />
    </main>
  );
}
