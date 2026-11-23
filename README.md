# Field Scout

Obstacle scouting app for the Pyka mapping process (Step 4: full safety-critical feature scout).
Mark power poles, power lines, guy wires and tall features with the phone GPS and export a KML/KMZ for the mapping team.

App de scouting de obstáculos para o processo de mapeamento da Pyka (Step 4). Interface em inglês, com botão para português.

## Features
- Obstacle types: power pole, tower, irrigation pivot, building, other
- 3 ways to mark: **GPS averaging** (5–30 s, accuracy-weighted), **pick on satellite map**, **bearing + distance** (compass + rangefinder)
- **Line mode**: poles saved in sequence become a Power Line (or Guy Wire) LineString
- Height AGL, width, notes, photos per obstacle
- **Scout track** recording (keeps running with the screen off in the iOS app)
- Import farm KML/KMZ → spray areas + **1.5 km buffer**; each obstacle is tagged `spray_area` / `within_1_5km` / `beyond_1_5km`
- Export **KMZ** (with photos), **KML**, **CSV** — always in English
- **Appearance**: Automatic (follows the device), Light or Dark, in the menu
- **3D view**: satellite on terrain with every obstacle extruded to its height and wires between pole tops
- Works offline; map tiles you view are cached on the device
- Edit, move, delete, undo

## Web version
Published automatically to GitHub Pages from `www/`. Open on the phone → Share → Add to Home Screen.
On a computer (wide screen + mouse) the same address opens a desktop layout: side panel, click the map to place an obstacle, keys 1–5 pick a type, Esc closes, Ctrl+Z undoes.

## iOS app (SideStore)
Every push to `main` runs `.github/workflows/ios.yml` on a macOS runner and publishes an **unsigned** `FieldScout.ipa`
to the `latest` release. On the iPhone: download the IPA → open SideStore → **+** → pick the file. SideStore signs it with your Apple ID.

## Dev
```
npm ci
npm run serve        # http://localhost:8080
npx cap sync ios     # after changing www/
```
