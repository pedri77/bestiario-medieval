"""Comprueba en Commons la licencia, el tamaño y el autor de cada miniatura elegida.

Escribe datos-crudos/elegidos.json. Uso: python3 -I scripts/explorar.py
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comun import COMMONS, RAIZ, get_json  # noqa: E402

AB, RO, HA, NO = "Bestiario de Aberdeen", "Bestiario de Rochester", "Bestiario Harley (MS 4751)", "Bestiario de Northumberland"

# id: (fichero en Commons, manuscrito, fecha aproximada)
ELEGIDOS = {
    "zorro": ("Лиса. Миниатюра из Абердинского бестиария.png", AB, "h. 1200"),
    "hiena": ("Hyena bestiary.jpg", AB, "h. 1200"),
    "unicornio": ("Unicorn hunt - British Library Royal 12 F xiii f10v (detail).jpg", RO, "h. 1230"),
    "pelicano": ("Пеликаны. Миниатюра из Абердинского бестиария.png", AB, "h. 1200"),
    "castor": ("Бобр. Миниатюра из Абердинского бестиария.png", AB, "h. 1200"),
    "ballena": ("Aspidochelone2-gks1633-danish-royal-library.jpg", "Bestiario de Copenhague (GKS 1633)", "h. 1250"),
    "osa": ("Bear licking a cub into shape - Bestiary (1230-1240), f.15v - BL Harley MS 4751.jpg", HA, "h. 1235"),
    "fenix": ("Phoenix detail from Aberdeen Bestiary.jpg", AB, "h. 1200"),
    "basilisco": ("Aberdeen Bestiary Basilisk.jpg", AB, "h. 1200"),
    "caladrio": ("RochesterBestiary detail Caladrius.jpg", RO, "h. 1230"),
    "grifo": ("RochesterBestiary detail Griffin.jpg", RO, "h. 1230"),
    "manticora": ("Manticore - British Library Royal 12 F xiii f24v (detail).jpg", RO, "h. 1230"),
    "yale": ("RochesterBestiary detail Yale.jpg", RO, "h. 1230"),
    "bonacon": ("RochesterBestiary detail Bonnacon.jpg", RO, "h. 1230"),
    "sirena": ("Siren enchants sailors - Bestiary (1230-1240), f.47v - BL Harley MS 4751.jpg", HA, "h. 1235"),
    "elefante": ("Harley elephant detail.jpg", HA, "h. 1235"),
    "erizo": ("Hedgehogs - British Library Royal 12 F xiii f45r (detail).jpg", RO, "h. 1230"),
    "salamandra": ("Саламандра. Миниатюра из Абердинского бестиария.png", AB, "h. 1200"),
    "pantera": ("AberdeenBestiaryFolio009rPantherDetail.jpg", AB, "h. 1200"),
    "dragon": ("AberdeenBestiaryFolio065vDragonDetail.jpg", AB, "h. 1200"),
    "anfisbena": ("Амфисбена. Миниатюра из Абердинского бестиария.png", AB, "h. 1200"),
    "avestruz": ("Страусы. Миниатюра из Абердинского бестиария.png", AB, "h. 1200"),
    "lechuza": ("Owl mobbed by smaller birds - Bestiary (1230-1240), f.47 - BL Harley MS 4751.jpg", HA, "h. 1235"),
    "hormigas": ("Муравьи. Миниатюра из Абердинского бестиария.png", AB, "h. 1200"),
    "cocodrilo": ("Crocodile - British Library Royal 12 F xiii f24r (detail).jpg", RO, "h. 1230"),
}
MAPA = ("Hereford map facsimile by Havergal 1872.jpg", "Mappa Mundi de Hereford (h. 1300), facsímil de F. T. Havergal", "1872")


def main() -> None:
    todos = {**ELEGIDOS, "mapa": MAPA}
    titulos = ["File:" + f for f, _, _ in todos.values()]
    info = {}
    for i in range(0, len(titulos), 20):
        d = get_json(COMMONS, {"action": "query", "format": "json", "titles": "|".join(titulos[i:i + 20]), "prop": "imageinfo",
                               "iiprop": "extmetadata|size|mime", "iiextmetadatafilter": "LicenseShortName|Artist|Credit"})
        normal = {x["from"]: x["to"] for x in d["query"].get("normalized", [])}
        for t in titulos[i:i + 20]:
            dest = normal.get(t, t)
            pag = next((p for p in d["query"]["pages"].values() if p["title"] == dest), {})
            info[t] = pag
    salida = {}
    for id_, (f, ms, fecha) in todos.items():
        pag = info["File:" + f]
        if "missing" in pag or not pag.get("imageinfo"):
            print("FALTA", id_, f)
            continue
        ii = pag["imageinfo"][0]
        em = ii.get("extmetadata", {})
        salida[id_] = {"fichero": f, "manuscrito": ms, "fecha": fecha, "licencia": em.get("LicenseShortName", {}).get("value", ""),
                       "ancho": ii["width"], "alto": ii["height"], "mime": ii.get("mime")}
        print(f"{id_:11} {salida[id_]['licencia'][:28]:28} {ii['width']}x{ii['height']}")
    (RAIZ / "datos-crudos").mkdir(exist_ok=True)
    (RAIZ / "datos-crudos" / "elegidos.json").write_text(json.dumps(salida, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
