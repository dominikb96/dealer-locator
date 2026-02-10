# Dealer Locator

Eine Full-Stack-Demo-Applikation zur Suche von Autohändlern nach PLZ oder Ort inklusive Umkreissuche.  
Der Fokus liegt auf sauberer Architektur und einem  reproduzierbarem Datenimport.

---

## Features

- Händlersuche nach PLZ oder Ort
- Umkreissuche (z. B. 5 / 10 / 15 km)
- Unterstützung mehrerer Hersteller (KIA, SEAT, Opel)
- Export der Suchergebnisse als XLSX
- Monorepo-Setup mit pnpm
- Typsicherer Datenimport mit TypeScript

---

## Architekturüberblick

#### Grundprinzip:
Die Datenbank ist die zentrale Quelle der Wahrheit. Externe Herstellerdaten werden einmalig importiert und nicht zur Laufzeit abgefragt.

#### Datenstrategie:
Die Aufgabenstellung erlaubt sowohl Live-Abfragen von Herstellerseiten als auch eine vorherige Speicherung in einer Datenbank.
Entschieden wurde sich für den vorherigen Import der Daten, um:
externe Abhängigkeiten zur Laufzeit zu vermeiden
reproduzierbare Ergebnisse sicherzustellen
stabile Demo-Bedingungen zu gewährleisten
eine performante Umkreissuche zu ermöglichen

#### Datenimport
Unterstützte Hersteller:
- KIA, SEAT, OPEL

#### Vorgehen:
Analyse der internen JSON-Endpunkte der Hersteller <br/>
Einmaliger Abruf der Händlerdaten <br/>
Mapping auf ein einheitliches internes Domain-Modell <br/>
- Export in CSV-Dateien
- Import der CSV-Dateien in die Datenbank
- Externe Datenformate bestimmen nicht das interne Modell.

Datenbank Setup<br/>
PostgreSQL wird über Docker bereitgestellt.<br/>
<code>docker compose up -d</code><br/>
Seeding<br/>
Es existieren zwei getrennte Seed-Varianten:<br/>

Mock-Daten<br/>
<code>pnpm --filter backend db:seed:mock</code><br/>
Reale Herstellerdaten (CSV-Import)<br/>
<code>pnpm --filter backend db:seed:real</code><br/>
Beide Seeds nutzen dieselbe Insert-Logik, unterscheiden sich jedoch in der Datenquelle.<br/>

Datenbank zurücksetzen<br/>
<code>docker compose down -v</code><br/>
<code>docker compose up -d</code><br/>

<code>pnpm --filter backend db:init</code><br/>
<code>pnpm --filter backend db:seed:real</code><br/>


#### Architekturentscheidungen
- Keine Live-Scraping-Aufrufe zur Laufzeit
- Klare Trennung zwischen Import, API und Frontend
- Validierung externer Daten beim Import
- Gemeinsame Domain-Typen über ein Shared-Package
- Reproduzierbares lokales Setup

##### Mögliche Erweiterungen:
- Automatisierte Datenimporte (z. B. Cron-Jobs)
- Weitere Hersteller
- Pagination und Caching
- Kartenansicht
- env File hinzufügen (local, dev, prod)

## Setup
Voraussetzungen
- Node.js ≥ 20
- pnpm
- Docker 

### Dependencies installieren (Monorepo)
<code>pnpm install</code>

### PostgreSQL starten (Docker)
<code>docker compose up -d</code>

### Tabellen anlegen
<code>pnpm --filter backend db:init</code>

### Reale Händlerdaten importieren
<code>pnpm --filter backend db:seed:real</code>

### Shared Package bauen

Das Shared-Package enthält gemeinsame Typen für Backend und Frontend.

<code>pnpm --filter @dealer-locator/shared build</code>

### Alles gleichzeitig starten
Im Repo-Root:<br/>
<code>pnpm dev</code>