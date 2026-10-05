# Road to Michigan ✈️🎄

Kleine Web-App, mit der ein deutschsprachiges Vorschulkind (ca. 4–5 Jahre) spielerisch erste
englische Wörter und Sätze lernt. Das Thema ist eine Reise von Deutschland nach Michigan:
Jeder Stern bringt das Flugzeug ein Stück weiter über den Atlantik.

## Wie es funktioniert

- **Komplett über Audio:** Das Kind muss nicht lesen können. Alle Wörter und Sätze werden
  vorgesprochen (Sprachausgabe des Geräts, bevorzugt US-Englisch).
- **11 Themen + Sätze:** Hallo & Danke, Fahrzeuge, Farben (Autos), Zahlen (Autos zählen), große
  Maschinen, Los & Stopp, Familie, Tiere, Essen, Gefühle (inkl. „I need to go to the bathroom“),
  Weihnachten. Dazu ein Sätze-Papagei mit Alltagssätzen für den Besuch bei der Gastfamilie.
- **Drei Spiele pro Thema:**
  - 👀 **Anschauen:** Bild antippen → Wort + Beispielsatz hören (optional 🇩🇪-Brücke).
  - 👂 **Hören & Finden:** „Where is the fire truck?“ → richtiges Bild antippen, das Rennauto fährt
    Richtung Ziel. Erst 2, später 3–4 Bilder zur Auswahl. Wörter mit Fehlern kommen häufiger.
  - 🦜 **Nachsprechen:** Satz hören, mit 🎤 selbst aufnehmen und sich selbst hören, oder 👍 drücken.
- **Ermutigend:** Es gibt keine Minuspunkte und kein „falsch“-Geräusch. Eine falsche Antwort
  wackelt nur, das Spiel sagt freundlich, was es ist, und hebt beim zweiten Versuch die richtige Antwort hervor.
- **Belohnungen:** Sterne, Fahrzeug-Sticker in der 🅿️ Garage, Reise-Karte mit Countdown (🌙 = Nächte).
- **Eltern-Bereich:** ⚙️ oben rechts **1,5 Sekunden gedrückt halten**. Dort lassen sich Name des Kindes,
  Abflug-Datum, Sprechtempo, Stimme und deutsche Hilfen einstellen. Außerdem sieht man dort die schwierigen Wörter
  und eine Tagesübersicht.

Der Fortschritt wird nur lokal im Browser gespeichert (`localStorage`). Es gibt keinen Server und kein Tracking.

## Starten

Es gibt keinen Build-Schritt, es sind nur statische Dateien.

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

**Live bringen und aufs iPad:** siehe [ANLEITUNG.md](ANLEITUNG.md) (GitHub Pages, Home-Bildschirm,
bessere Stimme, Offline für den Flug).

## Inhalte anpassen

Alle Wörter, Sätze und Sticker stehen in `data.js`. Ein neues Wort ist eine Zeile, zum Beispiel:

```js
{ en: 'snowplow', de: 'Schneepflug', pic: '🚜', say: 'The snowplow clears the road.' },
```
