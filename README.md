# EMAD2019_SmartWorking
Progetto per la gestione dello Smart Working nell'ambito del corso Enterprise Mobile Application Development.

## Guida per l'installazione

Per cominciare a sperimentare dobbiamo:

- scaricare il progetto in locale.
- recarsi nella cartella "files_di_configurazione"
- esegui le seguenti configurazioni 
    1. Sostituire in *app/node_modules*:
       - config.js e config.metadata.json in *ion2-calendar/dist*
       - calendar.service.js in *ion2-calendar/dist/services*
       - calendar.component.js in *ion2-calendar/dist/components*
       - leaflet-src.js in *leaflet/dist*
    2. Aggiungere in  *platforms/android/app*:
       -   google-services.json

- aprire l'interfaccia della nostra command-line.
- spostarci sulla cartella del progetto nello specifico entrare nella cartella app

Digitare:

```
npm install
```

Questo comando installa tutte le dipendenze.

Digitare:
```
ionic serve
```

Questo comando eseguirà il codice e permetterà la visualizzazione della webapp 

Per installare l'applicazione sul device lanciare:
```
ionic cordova run android --device
```


## Funzionalità presenti

- Login
- Logout
- Prenotazione Smart Working per ogni dipendente
- Notifica giornaliera per ricordare all'utente il giorno seguente se è in Smart working  o no
- Visualizza proprio Smart Working pianificato
- Visualizza piano Smart Working di ogni dipendente associato al progetto supervisionato dal menager
- Blocca giorno Smart Working per il manager



## Funzionalità in programma

- Prenota postazione



Aggiungeremo L'amministratore come nuovo attore della nostra applicazione. L'amministratore dovrà occuparsi della gestione organizzativa del DB sottostante, dovrà quindi:

- Inserire Dipendenti
- Modificare Status ai dipendenti se diventano Manager
- Inserire Progetti associando dipendenti e Menager 





Nella cartella documenti sono presenti:

- Problem starment versione 1 (prima stesura documento)
- Problem statment versione 2 (raffinamento del documento)
- Prototype report versione 1 (use case, class diagram, prototipi)
- Slide di presentazione prototipazione

Tale cartella verrà aggiornata ogni qual volta saranno introdotte delle modifiche.



