# EMAD2019_SmartWorking
Progetto per la gestione dello Smart Working nell'ambito del corso Enterprise Mobile Application Development.

## Guida per l'installazione

Per cominciare a sperimentare dobbiamo:

- scaricare il progetto in locale.

-  aprire l'interfaccia della nostra command-line.
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



Aggiungeremo un nuovo attore, l'amministratore. L'amministratore dovrà occuparsi della gestione organizzativa del DB sottostante, dovrà:

- Inserire Dipendenti
- Modificare Status ai dipendenti se diventano Manager
- Inserire Progetti associando dipendenti e Menager