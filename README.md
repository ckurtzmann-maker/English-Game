# Road to Michigan ✈️🎄

Kleine Web-App, mit der ein deutschsprachiges Vorschulkind (ca. 4–5 Jahre) spielerisch erste
englische Wörter und Sätze lernt. Das Thema ist eine Reise von Deutschland nach Michigan:
Jeder Stern bringt das Flugzeug ein Stück weiter über den Atlantik.

## Wie es funktioniert

- **Komplett über Audio:** Das Kind muss nicht lesen können. Alle Wörter und Sätze werden
  vorgesprochen (Sprachausgabe des Geräts, bevorzugt US-Englisch).
- **4 Stufen, freigeschaltet über Sterne** (im Eltern-Bereich auch sofort):

  | Stufe | Was | Spiele |
  |---|---|---|
  | 1 Wörter | 11 Themen: Fahrzeuge, Farben, Zahlen, Essen, Weihnachten … | 👀 Anschauen · 👂 Hören & Finden · 🦜 Nachsprechen |
  | 2 Sätze sagen | Alltagssätze wie „Thank you!“ oder „I need to go to the bathroom.“ | 🦜 Papagei mit 🎤-Aufnahme |
  | 3 Fragen & Antworten (ab 60 ⭐) | „How old are you?“, „Are you hungry?“, „Are you cold?“, „Do you want to go outside?“ … | Eine Figur fragt, das Kind tippt die passende Antwort an und spricht sie dann nach |
  | 4 Anweisungen (ab 150 ⭐) | „Put on your jacket!“, „Wash your hands!“, „Time for bed!“ und Bewegungsspiele („Jump!“, „Clap your hands!“) | Bild antippen bzw. mitmachen |

  Der gelbe Rahmen schlägt immer ein Thema aus der höchsten freigeschalteten Stufe vor.
  Bei Ja/Nein-Fragen zählt beides als richtig. Das Ja-Bild passt aber zur Frage (🥶 bei „cold“),
  sodass das Kind die Frage verstehen muss und nicht einfach immer 👍 tippen kann.
- **Ermutigend:** Es gibt keine Minuspunkte und kein „falsch“-Geräusch. Eine falsche Antwort
  wackelt nur, beim zweiten Versuch wird die richtige Antwort hervorgehoben.
- **Belohnungen:** Sterne, Fahrzeug-Sticker in der 🅿️ Garage, Reise-Karte mit Countdown (🌙 = Nächte).
- **Eltern-Bereich:** ⚙️ oben rechts **1,5 Sekunden gedrückt halten**. Dort lassen sich Name, Alter,
  Abflug-Datum, Sprechtempo, Stimme und deutsche Hilfen einstellen. Außerdem gibt es einen Fortschritt
  pro Stufe, eine Liste schwieriger Wörter und eine **Liste für die Gastfamilie** zum Teilen.
  Die Liste enthält alle Fragen und Anweisungen aus der App, damit die Familie genau diese Formulierungen benutzt.

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
