# Timesheet Checker — Artifact

## Werkwijze voor updates

**Nooit rechtstreeks aanpassen in het gedeelde PHPro Project.**

Altijd via deze flow:

1. **Test** — aanpassingen maken en testen in een eigen gesprek (niet het gedeelde Project)
2. **Valideer** — grondig testen met een echte TIA CSV
3. **Push** — goedgekeurde versie naar GitHub (`artifact/timesheet-checker.jsx`)
4. **Deploy** — in het PHPro Project een nieuw gesprek starten, nieuwe versie laden, oud Artifact vervangen

## Versiehistorie

| Versie | Datum | Wijzigingen |
|---|---|---|
| v0.1 | 2026-03-22 | Initiële versie — CSV upload, detectielogica, visualisatie, sortering |

## Technische details

- Detectielogica: 9 regels (OPEN_DAYS, NOT_CLOSED, DAILY_VARIATION, OVER_HOURS, HOLIDAY_WORKED, NB_ON_PROJECT, OPEN_DAYS_CONTRACTOR, OPEN_DAYS_REMINDER, WEEKEND_WORKED)
- Config: hardcoded (consultants + projecten) — nog te koppelen aan GitHub config-bestanden
- Feestdagen: per taal (nl/es/ua) — enkel TsCodeDescription "Feestdagen" telt
- Sortering: Niet afgesloten → Probleem + badges → Probleem → Compleet + NB → Contractor → Compleet + overig → Compleet

## Volgende stappen

- [ ] Config dynamisch lezen uit GitHub
- [ ] Snapshot wegschrijven naar GitHub
- [ ] ORD-waarschuwing enkel bij écht ongekende ORDs
- [ ] Rollen: beheerder vs viewer onderscheid
