# FileTree Explorer

Wewnętrzne narzędzie do podglądu struktury katalogów. Użytkownik wkleja albo wgrywa JSON, a aplikacja rysuje drzewo, pokazuje szczegóły pliku i folderu oraz szuka po nazwie.

## Uruchomienie

Wymagany jest Node.js 18+.

```bash
npm install
npm run dev
```

Aplikacja startuje na adresie wypisanym przez Vite, zwykle `http://localhost:5173`.

## Decyzje architektoniczne

Kod jest podzielony wokół przyszłych feature’ów, a nie wokół warstw technicznych:

- `features/tree-import` — wklejenie, wgranie i przykład JSON
- `features/explorer` — drzewo, rozwijanie folderów i szczegóły węzła
- `features/search` — pole szukania i lista wyników
- `shared/tree` — czyste funkcje domenowe: walidacja, ścieżki, rozmiar poddrzewa, lookup, wyszukiwanie
- `app` — router, provider dokumentu i strona 404

Drzewo trzymam w kontekście Reacta. To jeden dokument na sesję, więc osobny store byłby tu tylko dodatkową warstwą. Oryginalny JSON ląduje w `localStorage` i przy starcie przechodzi tę samą walidację co przy imporcie. Zepsuty zapis jest odrzucany.

Zapytanie wyszukiwania jest w parametrze `?q=`. Wyniki nie mają własnego cache: po odświeżeniu strona czyta query z URL i przelicza je na aktualnym drzewie. Dzięki temu lista przeżywa refresh, a link z wynikami da się skopiować.

Ścieżka węzła nie zawiera nazwy korzenia, zgodnie z przykładem `src/components/Button.tsx`. Każdy segment jest kodowany osobno. Jeden route `tree/*` obsługuje zarówno `/tree`, jak i szczegóły. Korzeń nie ma segmentów, więc jego szczegóły są na `/tree`, a drzewo zostaje widoczne obok. Ten sam route sprawia, że zwinięcie folderów nie resetuje się przy przejściu do pliku.

Rodzeństwo z tą samą nazwą oraz nazwy z ukośnikiem są odrzucane. Inaczej ścieżka nie wskazywałaby jednego węzła.

Styl to zwykły CSS. Bez biblioteki UI, żeby stos został przy React 18+, TypeScript w `strict`, React Router v6 i Vite.

## Przy większej ilości czasu

- Testy parsera, rozmiarów, ścieżek i wyszukiwania oraz scenariusz end-to-end
- Wirtualizacja długich list i liczenie dużego JSON poza głównym wątkiem
- Zapamiętywanie rozwiniętych folderów
- Nawigacja klawiaturą jak w eksploratorze plików
- Szukanie przybliżone, filtr typu i sortowanie wyników
- Edycja drzewa i porównanie dwóch JSON-ów
- Backend albo skompresowany link, gdy drzewo nie mieści się w `localStorage`

## Znane ograniczenia

- Całe drzewo jest w pamięci i w `localStorage` (limit przeglądarki to zwykle około 5 MB). Przy przekroczeniu limitu widok działa do odświeżenia.
- Brak wirtualizacji. Bardzo głębokie drzewo może oprzeć się o limit stosu przy walidacji i liczeniu rozmiaru.
- Wyszukiwanie to dopasowanie podciągu, bez rankingu i bez fuzzy search.
- Stan rozwinięcia ginie po odświeżeniu.
- Dwie takie same nazwy w jednym folderze oraz ukośnik w nazwie są błędem importu.
- Rozmiar jest pokazywany tylko jako B, KB albo MB. Wartości powyżej bezpiecznego zakresu liczby w JavaScript tracą precyzję już na etapie `JSON.parse`.
- `/tree` jest jednocześnie widokiem drzewa i szczegółami korzenia, bo korzeń nie ma segmentu ścieżki.
- Aplikacja nie ma kont, synchronizacji ani historii wersji dokumentu.
