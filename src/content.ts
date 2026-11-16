/** Todo el texto de la página vive aquí. Los componentes no llevan texto suelto. */
import imagenes from './datos/imagenes.json';

type Imagen = {fichero: string; manuscrito: string; fecha: string; licencia: string; w: number; h: number};
export const IMG = imagenes as Record<string, Imagen>;

const base = import.meta.env.BASE_URL;
export const img = (id: string) => `${base}bestias/${id}.webp`;
export const mapaUrl = `${base}mapa.webp`;
export const commons = (fichero: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fichero.replace(/ /g, '_'))}`;

export type Bestia = {id: string; nombre: string; latin: string; dice: string; moraleja: string};

/** Orden del libro. `dice`: lo que cuenta el bestiario, resumido. `moraleja`: cómo lo leía. */
export const bestias: Bestia[] = [
  {id: 'unicornio', nombre: 'Unicornio', latin: 'Monoceros', dice: 'Tan fiero que ningún cazador puede con él. Solo se deja atrapar si una doncella se sienta sola en el bosque: el unicornio apoya la cabeza en su regazo, se duerme y entonces lo cazan.', moraleja: 'El unicornio es Cristo, que se hizo hombre en el seno de una virgen.'},
  {id: 'pelicano', nombre: 'Pelícano', latin: 'Pelicanus', dice: 'Las crías crecen y picotean a sus padres, que las matan. Al tercer día la madre se abre el pecho con el pico y las revive con su sangre.', moraleja: 'Así Cristo devuelve la vida con su sangre. Por eso el pelícano acabó en altares y escudos.'},
  {id: 'castor', nombre: 'Castor', latin: 'Castor', dice: 'Lo cazan por sus testículos, que sirven de medicina. Cuando se ve acorralado se los arranca de un mordisco y los deja al cazador; si otro lo persigue, se pone en pie para enseñar que ya no los tiene.', moraleja: 'Quien quiera vivir en paz debe arrancarse los vicios y tirárselos al diablo.'},
  {id: 'ballena', nombre: 'Ballena-isla', latin: 'Aspidochelone', dice: 'Flota con el lomo fuera del agua, tan grande que los marineros la toman por una isla, anclan y encienden fuego. Al notar el calor se sumerge y los arrastra al fondo.', moraleja: 'El diablo engaña igual: parece tierra firme hasta que es tarde.'},
  {id: 'osa', nombre: 'Osa', latin: 'Ursus', dice: 'Da a luz trozos de carne sin forma, apenas con ojos. La madre los lame hasta darles cuerpo de oso.', moraleja: 'De aquí viene «dar forma a lametazos»: la educación que moldea lo que nace informe.'},
  {id: 'fenix', nombre: 'Fénix', latin: 'Phoenix', dice: 'Vive quinientos años. Al sentirse viejo se hace un nido de ramas aromáticas, se vuelve hacia el sol, arde con él y al tercer día renace de sus cenizas.', moraleja: 'La resurrección: si un ave puede renacer, ¿cómo no va a poder el hombre?'},
  {id: 'basilisco', nombre: 'Basilisco', latin: 'Basiliscus', dice: 'El rey de las serpientes, de medio pie de largo. Mata con la mirada y con el aliento; hasta los pájaros que vuelan sobre él caen muertos. Solo la comadreja puede con él.', moraleja: 'El pecado mata de lejos, sin necesidad de tocar.'},
  {id: 'caladrio', nombre: 'Caladrio', latin: 'Caladrius', dice: 'Un ave blanca que se lleva al palacio de los reyes. Si mira al enfermo, este se curará: el ave absorbe el mal y vuela hacia el sol para quemarlo. Si aparta la vista, el enfermo morirá.', moraleja: 'Cristo, sin mancha, carga con la enfermedad de los hombres.'},
  {id: 'grifo', nombre: 'Grifo', latin: 'Gryphes', dice: 'Cuerpo de león, alas y cabeza de águila. Vive en los montes del norte y es tan fuerte que se lleva por el aire un buey o un caballo armado.', moraleja: 'En otros textos es Cristo, señor del cielo y de la tierra, mitad ave y mitad fiera.'},
  {id: 'manticora', nombre: 'Mantícora', latin: 'Manticora', dice: 'Cara de hombre, cuerpo de león rojo, cola de escorpión y tres filas de dientes. Salta muy lejos, corre muchísimo y le gusta la carne humana. Su voz silba como una flauta.', moraleja: 'Sin moraleja: está en el libro para asombrar.'},
  {id: 'yale', nombre: 'Yale', latin: 'Eale', dice: 'Negra, del tamaño de un caballo, con cola de elefante y mandíbulas de jabalí. Sus cuernos se mueven: en la pelea apunta uno hacia delante y guarda el otro de reserva.', moraleja: 'Acabó en el escudo de armas de familias inglesas y en el Saint John’s College de Cambridge.'},
  {id: 'bonacon', nombre: 'Bonacón', latin: 'Bonnacon', dice: 'Un toro con los cuernos enroscados hacia atrás, inútiles para pelear. Cuando lo persiguen se defiende soltando un chorro de excremento ardiente que quema todo lo que toca en una gran distancia.', moraleja: 'El bestiario no le busca moraleja. Los miniaturistas lo pintaban con un entusiasmo evidente.'},
  {id: 'sirena', nombre: 'Sirena', latin: 'Sirena', dice: 'Mitad mujer y mitad pez o ave. Canta tan dulce que los marineros se duermen; entonces sube a bordo y los despedaza.', moraleja: 'Los placeres del mundo adormecen el alma y la entregan a la muerte.'},
  {id: 'elefante', nombre: 'Elefante', latin: 'Elephans', dice: 'No tiene articulaciones en las rodillas, así que duerme apoyado en un árbol. Los cazadores serran el árbol; el elefante cae y no puede levantarse hasta que llega uno pequeño y lo alza con la trompa.', moraleja: 'El hombre caído no se levanta solo: lo alza Cristo, que se hizo pequeño.'},
  {id: 'erizo', nombre: 'Erizo', latin: 'Ericius', dice: 'En la vendimia sube a la parra, tira las uvas al suelo y se revuelca sobre ellas para llevárselas clavadas en las púas a sus crías.', moraleja: 'El diablo, como el erizo, roba el fruto de la viña del alma.'},
  {id: 'salamandra', nombre: 'Salamandra', latin: 'Salamandra', dice: 'Vive en el fuego sin quemarse y lo apaga. Es el más venenoso de los animales: si sube a un árbol envenena todos los frutos, y si cae a un pozo, el agua.', moraleja: 'Como los tres jóvenes del horno de Babilonia, el justo atraviesa el fuego sin arder.'},
  {id: 'pantera', nombre: 'Pantera', latin: 'Panthera', dice: 'De muchos colores y muy mansa. Después de comer duerme tres días; al despertar lanza un aliento tan dulce que todos los animales la siguen, menos el dragón, que huye a esconderse.', moraleja: 'Cristo resucitado al tercer día, cuyo perfume atrae a todos salvo al demonio.'},
  {id: 'dragon', nombre: 'Dragón', latin: 'Draco', dice: 'La mayor de las serpientes. No mata con veneno sino con la cola, enroscándose. Su gran enemigo es el elefante: lo espera en los caminos y le ata las patas.', moraleja: 'El diablo, que no mata con los dientes sino atando.'},
  {id: 'anfisbena', nombre: 'Anfisbena', latin: 'Amphisbaena', dice: 'Una serpiente con una cabeza en cada extremo, que corre en las dos direcciones. Sus ojos brillan como lámparas y es la única que sale con el frío.', moraleja: 'El doble de todo: sin moraleja fija, sobre todo asombro.'},
  {id: 'avestruz', nombre: 'Avestruz', latin: 'Assida', dice: 'Tiene alas pero no vuela. Pone los huevos cuando sale cierta estrella, los entierra en la arena y se olvida de ellos; el calor del sol los incuba.', moraleja: 'Hay que olvidar lo terrenal y mirar al cielo, como el avestruz mira la estrella.'},
  {id: 'lechuza', nombre: 'Lechuza', latin: 'Noctua', dice: 'Ama la noche, ve en la oscuridad y huye de la luz. Si sale de día, las demás aves la persiguen y la acosan.', moraleja: 'El bestiario la usa en una alegoría antijudía, uno de los prejuicios que estos libros repetían.'},
  {id: 'hormigas', nombre: 'Hormigas', latin: 'Formica', dice: 'Van en fila, cargan grano en verano para el invierno y lo parten en dos para que no germine con la lluvia. Distinguen por el olor el trigo de la cebada.', moraleja: 'Guarda en la juventud lo que necesitarás en la vejez.'},
  {id: 'cocodrilo', nombre: 'Cocodrilo', latin: 'Crocodilus', dice: 'Vive en el Nilo, tiene veinte codos de largo y garras terribles. Pasa la noche en el agua y el día en tierra. El hidro se le mete por la boca y lo mata desde dentro.', moraleja: 'El hidro es Cristo, que entra en el infierno y sale vencedor.'},
  {id: 'zorro', nombre: 'Zorro', latin: 'Vulpes', dice: 'Cuando tiene hambre se revuelca en barro rojo, se tumba y aguanta la respiración. Los pájaros lo creen muerto, se posan sobre él y él los atrapa.', moraleja: 'Así el diablo se hace el muerto con quien vive pegado a la carne.'},
  {id: 'hiena', nombre: 'Hiena', latin: 'Yena', dice: 'Vive entre las tumbas y come cadáveres. Cambia de sexo: unas veces es macho y otras hembra. De noche imita la voz humana para atraer a los pastores.', moraleja: 'El hombre de dos caras, que no es ni lo uno ni lo otro.'},
];

export const portada = {
  antetitulo: 'Bestiarios ingleses · siglos XII y XIII',
  titulo: 'Bestiario',
  tapa: 'Liber de natura bestiarum',
  inicial: 'B',
  incipit: 'Aquí empieza el libro de la naturaleza de las bestias, de las aves y de las serpientes, y de lo que cada una enseña.',
  invitacion: 'Desliza para abrir el libro',
};

export const intro = {
  antetitulo: 'Qué es un bestiario',
  titulo: 'Un libro de animales que en realidad era un libro de lecciones.',
  cuerpo: [
    'En los monasterios de la Inglaterra del siglo XII y XIII se copiaban bestiarios: catálogos de animales reales e imaginarios, iluminados con oro y lapislázuli. Bebían de un texto griego, el Fisiólogo, de Plinio y de san Isidoro.',
    'No eran zoología. Cada bestia era una alegoría: lo importante no era si el pelícano revive a sus crías, sino lo que eso enseñaba. Por eso el unicornio y el castor aparecen en la misma página con la misma seriedad.',
  ],
  nota: 'Los textos de esta página son resúmenes propios en castellano. Algunas moralejas repiten prejuicios de su tiempo; se cuentan, no se suscriben.',
};

export const hojeo = {
  antetitulo: 'Hojear el libro',
  dice: 'Lo que cuenta',
  moraleja: 'Lo que enseña',
  indice: 'Ir a la bestia',
  folio: (i: number, n: number) => `${i} de ${n}`,
};

export type Punto = {id: string; nombre: string; texto: string; x: number; y: number; zoom: number};

export const mapa = {
  antetitulo: 'El mapa de los monstruos',
  titulo: 'Donde acaba el mundo conocido',
  cuerpo:
    'El Mappa Mundi de Hereford, hacia 1300, pone el este arriba y Jerusalén en el centro. En los bordes, donde nadie había estado, viven los pueblos monstruosos que describían Plinio y san Isidoro.',
  fuente: 'Facsímil de F. T. Havergal (1872) del Mappa Mundi de Hereford',
  etiqueta: 'Mappa Mundi de Hereford con etiquetas sobre sus criaturas',
  /** Coordenadas en la imagen (0–1), comprobadas sobre el facsímil leyendo las leyendas latinas. */
  puntos: [
    {id: 'juicio', nombre: 'El Juicio Final', texto: 'En la cúspide, Cristo juzga: los salvados a un lado, los condenados al otro.', x: 0.48, y: 0.07, zoom: 2.4},
    {id: 'paraiso', nombre: 'El Paraíso', texto: 'El Edén es una isla redonda en el extremo oriental, arriba del todo.', x: 0.492, y: 0.211, zoom: 3},
    {id: 'pigmeos', nombre: 'Pigmeos', texto: 'Hombres diminutos que, según los autores antiguos, luchaban contra las grullas.', x: 0.452, y: 0.259, zoom: 3.2},
    {id: 'jerusalen', nombre: 'Jerusalén', texto: 'El centro del mundo, con la Crucifixión encima.', x: 0.502, y: 0.555, zoom: 2.6},
    {id: 'sirena', nombre: 'Una sirena', texto: 'En pleno Mediterráneo, con su espejo, entre islas griegas.', x: 0.538, y: 0.631, zoom: 3.2},
    {id: 'esfinge', nombre: 'Esfinge', texto: '«Ave por las plumas, serpiente por los pies, doncella por el rostro», dice la leyenda latina.', x: 0.822, y: 0.516, zoom: 3.4},
    {id: 'labio', nombre: 'El pueblo del labio', texto: 'Tienen un labio tan grande que se tapan la cara con él para protegerse del sol.', x: 0.848, y: 0.497, zoom: 3.4},
    {id: 'esciapodo', nombre: 'Esciápodo', texto: 'Una sola pierna y rapidísimos. Tumbados, se dan sombra con su enorme pie.', x: 0.888, y: 0.507, zoom: 3.4},
    {id: 'boca', nombre: 'Los de la boca cerrada', texto: 'Tienen la boca soldada y se alimentan con una caña.', x: 0.9, y: 0.556, zoom: 3.4},
    {id: 'himantopodos', nombre: 'Himantópodos', texto: 'Sus piernas no los sostienen: avanzan a gatas.', x: 0.888, y: 0.64, zoom: 3.4},
    {id: 'blemias', nombre: 'Blemias', texto: 'Sin cabeza: los ojos y la boca, en el pecho.', x: 0.862, y: 0.716, zoom: 3.4},
    {id: 'basilisco', nombre: 'Basilisco', texto: '«Medio pie de largo, con manchas blancas»: el mismo del bestiario, ya en el mapa.', x: 0.828, y: 0.714, zoom: 3.4},
    {id: 'marmini', nombre: 'Los de cuatro ojos', texto: 'Etíopes con cuatro ojos, dice la leyenda: los marmini.', x: 0.818, y: 0.79, zoom: 3.4},
  ] as Punto[],
};

export const creencias = {
  antetitulo: 'Lo que creían, lo que es',
  titulo: 'Desliza para comprobarlo',
  creian: 'Creían',
  es: 'Hoy sabemos',
  etiqueta: (nombre: string) => `${nombre}: de la creencia medieval a lo que sabemos hoy`,
  casos: [
    {id: 'castor', nombre: 'El castor', creian: 'Se arranca los testículos para salvarse de los cazadores.', es: 'Lo que se buscaba era el castóreo, de unas glándulas junto a la cola. Los testículos del castor ni siquiera se ven: son internos.'},
    {id: 'elefante', nombre: 'El elefante', creian: 'No tiene rodillas y duerme apoyado en un árbol.', es: 'Tiene rodillas y las dobla. Duerme de pie a ratos y tumbado de vez en cuando.'},
    {id: 'osa', nombre: 'La osa', creian: 'Pare bultos sin forma y los lame hasta hacerlos osos.', es: 'Las crías nacen en la madriguera de invierno, ciegas, casi sin pelo y de unos pocos cientos de gramos. Diminutas, pero con forma.'},
    {id: 'pelicano', nombre: 'El pelícano', creian: 'Se abre el pecho para revivir a sus crías con su sangre.', es: 'Ningún pelícano se hiere. El mito pudo nacer de cómo apoya el pico en el pecho para vaciar el buche y alimentar a las crías.'},
    {id: 'hiena', nombre: 'La hiena', creian: 'Cambia de sexo: a veces es macho y a veces hembra.', es: 'No cambia, pero la hembra de hiena manchada tiene unos genitales que parecen masculinos. Aristóteles ya había desmentido el mito.'},
    {id: 'hormigas', nombre: 'Las hormigas', creian: 'Guardan grano para el invierno en almacenes bajo tierra.', es: 'Aquí acertaban: las hormigas granívoras, como las del género Messor, almacenan semillas en graneros subterráneos.'},
  ],
};

export const tesis = {
  etiqueta: 'Tesis',
  frase: 'Nadie había visto un unicornio. Pero todos sabían *lo que significaba,* y eso era lo que el libro quería que recordaras.',
  firma: 'Bestiario de Aberdeen, hacia 1200',
};

export const creditos = {
  antetitulo: 'Fuentes',
  titulo: 'Cómo está hecho',
  cuerpo:
    'Las miniaturas proceden de Wikimedia Commons y son de dominio público (o CC0): bestiarios de Aberdeen, Rochester, Harley 4751, Northumberland y Copenhague, de los siglos XII y XIII. El mapa es el facsímil de 1872 del Mappa Mundi de Hereford. Resúmenes y textos propios en castellano.',
  aviso: 'Los bestiarios no son zoología: cada bestia era una lección moral. Esta web los resume sin suscribir sus prejuicios.',
  volver: 'Volver arriba',
  wordmark: 'Bestiarium',
  firma: 'Textos y código hechos con IA (Claude) y revisados, como pieza de portfolio.',
  verCommons: 'ver en Commons',
};
