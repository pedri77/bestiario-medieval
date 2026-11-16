"""Descarga las miniaturas elegidas (tamaño estándar de Commons) y las pasa a WebP.

Bestias: public/bestias/<id>.webp (lado mayor 960 px). Mapa: public/mapa.webp (2400 px de ancho, desde la miniatura de 3840).
Uso: uv run --with pillow python -I scripts/imagenes.py
"""
from __future__ import annotations

import io
import json
import sys
import time
import urllib.request
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comun import COMMONS, RAIZ, UA, get_json  # noqa: E402

CRUDO = RAIZ / "datos-crudos" / "img"


def bajar(id_: str, fichero: str, ancho: int) -> bytes:
    destino = CRUDO / f"{id_}.bin"
    if destino.exists():
        return destino.read_bytes()
    info = get_json(COMMONS, {"action": "query", "format": "json", "titles": "File:" + fichero, "prop": "imageinfo", "iiprop": "url", "iiurlwidth": ancho})
    ii = next(iter(info["query"]["pages"].values()))["imageinfo"][0]
    url = (ii.get("thumburl") or ii["url"]).split("?")[0]
    for intento in range(6):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
                datos = r.read()
            CRUDO.mkdir(parents=True, exist_ok=True)
            destino.write_bytes(datos)
            time.sleep(1.5)
            return datos
        except Exception as e:  # noqa: BLE001
            ra = getattr(e, "headers", None) and e.headers.get("Retry-After")
            espera = int(ra) if ra and ra.isdigit() else 20 * (intento + 1)
            print(f"  aviso {id_}: {e!r}, reintento en {espera}s", file=sys.stderr)
            time.sleep(espera)
    raise RuntimeError(url)


def main() -> None:
    elegidos = json.loads((RAIZ / "datos-crudos" / "elegidos.json").read_text())
    (RAIZ / "public" / "bestias").mkdir(parents=True, exist_ok=True)
    salida = {}
    for id_, e in elegidos.items():
        mapa = id_ == "mapa"
        objetivo = 3840 if mapa else 960
        # La mayor miniatura estándar que no supere el original (si el original es menor, el original).
        ancho = objetivo if e["ancho"] >= objetivo else e["ancho"]  # original entero si es menor
        im = Image.open(io.BytesIO(bajar(id_, e["fichero"], ancho))).convert("RGB")
        if not mapa and max(im.size) > 960:
            im.thumbnail((960, 960), Image.LANCZOS)
        if mapa:  # 2400 px: basta para acercarse ×3 a los monstruos de los bordes
            im = im.resize((2400, round(im.height * 2400 / im.width)), Image.LANCZOS)
        destino = RAIZ / "public" / ("mapa.webp" if mapa else f"bestias/{id_}.webp")
        im.save(destino, "WEBP", quality=80 if not mapa else 74, method=6)
        salida[id_] = {**e, "w": im.width, "h": im.height}
        print(id_, im.size, f"{destino.stat().st_size // 1024} KB")
    ruta = RAIZ / "src" / "datos" / "imagenes.json"
    ruta.parent.mkdir(parents=True, exist_ok=True)
    ruta.write_text(json.dumps(salida, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
