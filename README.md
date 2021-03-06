# RickAndMorty

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Goal

Using the Rick & Morty API (rickandmortyapi.com) display the profiles of the characters (either with pagination or showing the first page only).
The profile of a character should include:
- Image
- Character information (name, species, etc).
- Origin and location information (name, dimension, amount of residents, etc). 
- Name of the chapters the character is featured on.


## DESCRIZIONE

Ho usato Angular (versione 11) in quanto è il framework che utilizzo quotidianamente per adesso e 
avevo poco tempo a disposizione e non perché lo reputo migliore delle altre tecnologie.
Non ho particolari problemi a switchare da una tecnologia all'altra ma in questo caso ho preferito 
qualcosa che mi facesse essere produttivo nel breve tempo (pochi giorni).


Ho deciso di realizzare una doppia versione dell'applicativo.

No!! Non ho fatto un doppio lavoro, le 2 versioni sono molto simili e per questo ho deciso
di non divederli in branch diversi ma piuttosto `avere una dropdown nella barra in alto dell'app 
per poter cambiare velocemente da una versione all'altra`.
Spero questo non causi problemi a livello di leggibilità del codice.
Ho cercato di commentare abbastanza affinché non ci sia confusione
    

#### `Rick And Morty all Inclusive` 

La prima versione si chiama `Rick And Morty all Inclusive`  
Questa versione dell'app cerca di seguire in maniera più rigida le richieste che 
leggiamo nella sezione "Goal" di questo documento
Abbiamo "tutte" le informazioni presenti direttamente nella scheda del personaggio
 
#### `Rick And Morty alternative`    
La seconda versione si chiama `Rick And Morty alternative`  
Io mi sono permesso di andare oltre la richiesta dell'esercizio realizzando una seconda versione
che non segue perfettamente tutti gli schemi del "Goal" in maniera rigida (per l'esattezza i punti 3 e 4) ma 
la mia intenzione era quella di trovare
un modo, analizzando le api REST a disposizione, per 
- dare all'utente un'esperienza  che si avvicinasse il più possibile a quella offerta dalla prima versione, 
- e allo stesso tempo provare a fare una piccola ottimizzazione a 
livello tecnico nella comunicazione tra client e server e quindi trovare un compromesso 
tra ottimizzazione ed esperienza utente 

Il tutto, cercando rimanere il più vicino possibile al GOAL.      

In questo caso non troviamo "tutte" le informazioni nella scheda ma solo quelle principali;
per ottenere alcuni dettagli, l'utente dovrà richiederli esplicitamente.   

Mi piaceva anche l'idea di dare una soluzione di UI/UX alternativa alla prima 

Credo siano abbastanza chiari i motivi della mia scelta ma spero avremo modo di discuterne a voce

##


In entrambe le versioni, è presente la funzionalità di paginazione e ricerca personaggi per nome.

### STRUTTURA APP
 Per quanto riguarda la struttura, l'app è abbastanza semplice, presenta pochi componenti e
 solo una sezione per cui ho deciso di usare una struttura classica raggruppando i componenti, 
 i servizi e i modelli in relative directories. 
 Di solito per applicazioni complesse, suddivido le macro-sezioni dell'app in moduli angular separati
 per una migliore gestione e poi ogni singolo modulo viene caricato in lazy loading su richiesta.
 In quel caso anche la struttura delle directoris cambia è organizzata in modo che ogni directory abbia
 tutto quello che necessita quel modulo.
 Non è tuttavia il caso di questa app in quanto esiste un singolo Container (Smart Component) che è l'AppComponent
 
 Ho usato un unico service angular per simulare una sorta di "state manager". Ho ritenuto inutile
 pensare ad una libreria esterna (ngrx, ngxs) in questo caso vista la natura del progetto.
 Il service usa degli oggetti Observables (angular fa ampio uso di RxJs) e con essi vado a simulare
 i classici selettori di uno state manager. 
 In una piccola applicazione del genere va bene usare un servizio in questo modo.
 
 Inoltre ho usato anche la "changeDetectionStrategy.OnPush" come strategia di change detection.
 In questo caso è totalmente inutile perché non porta benefici (o cmq sono minimi) ma ho cercato di 
 adottare quanto piu possibile le "best practices" seguendo il testo dell'esercizio:
 
 `Write the code with production standards in mind.`
  

