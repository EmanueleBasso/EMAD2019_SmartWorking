# EMAD2019_SmartWorking
Progetto per la gestione dello Smart Working nell'ambito del corso universitario Enterprise Mobile Application Development.

## Guida per l'installazione

Per installare l'App bisogna:
- scaricare il progetto in locale
- recarsi nella cartella *files_di_configurazione*
- eseguire le seguenti configurazioni:
    1. Sostituire in *app/node_modules*:
       - *config.js* e *config.metadata.json* in *ion2-calendar/dist*
       - *calendar.service.js* in *ion2-calendar/dist/services*
       - *calendar.component.js* in *ion2-calendar/dist/components*
    2. Aggiungere in  *platforms/android/app*:
       -   *google-services.json*
- aprire la CLI
- spostarsi nella cartella *app* del progetto e installare tutte le dipendenze col comando:
```
npm install
```
- per eseguire la WebApp digitare:
```
ionic serve
```
- per installare l'applicazione sul device digitare invece:
```
ionic cordova run android --device
```



Per eseguire l'amministratore bisogna:

- aprire la CLI
- spostarsi nella cartella *amministratore* del progetto e installare tutte le dipendenze col comando:
```
npm install
```
- Eseguire la WebApp digitando:
```
ionic serve
```
## Struttura Progetto

- Nella cartella *amministratore* è presente il progetto amministratore
- Nella cartella *app* è presente il progetto dell'App
- Nella cartella *server* è presente il progetto back-end per Firebase

## Documenti

Nella cartella *documenti* sono presenti:

- Brochure del progetto
- Slides di presentazione per l'App Challenge e per l'azienda

- Problem Statement
- Prototype Report
