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


## Description

Ho usato Angular (versione 11) in quanto è il framework che utilizzo quotidianamente e 
avevo poco tempo a disposizoione . Non perchè lo reputo megliore di altri (infatti non lo penso).
Non ho particolari problemi a switchare da una tecnologia all'altra ma in questo caso ho preferito 
qualcosa che mi facesse essere produttivo nel breve tempo (pochi giorni)


Ho deciso di realizzare una doppia versione dell'applicativo.

No!! Non ho fatto un doppio lavoro, le 2 versioni sono molto simili e per questo ho deciso
di non divederli in branch diversi ma piuttosto avere una dropdown nella barra in alto dell'app 
per poter cambiare velocemente da una verione all'altra.
Spero questo non causi problemi a livello di codice che contiene parti riferite ad una
versione piuttosto che ad un'altra. Ho cercato di commentare abbastanza affinchè non ci sia troppa confuzione
    

#### `Rick And Morty all Inclusive` 

La prima versione si chiama `Rick And Morty all Inclusive`  
Questa versione dell'app cerca di seguire in maniera piu rigida le richieste che 
leggiamo nella sezione "Goal" di questo documento
Abbiamo "tutte" le informazioni presenti direttamente nella scheda del personaggio
 
#### `Rick And Morty alternative`    
La seconda versione si chiama `Rick And Morty alternative`  
Io mi sono permesso di andare oltre la richiesta dell'esercizio realizzando una seconda versione
che non segue perfettamente tutti gli schemi del "Goal" in maniera rigida (per l'esattezza i punti 3 e 4) ma 
la mia intenzione era quella di trovare
un modo, analizzando le api REST a disposizione, per 
- dare all'utente un'esperienza simile a quella offerta dalla prima versione, 
- e allo stesso tempo provare a fare una piccola ottimizzazione a 
livello tecnico nella comunicazione tra client e server e quindi trovare un compromesso 
tra ottimizzazione ed esperienza utente 

Il tutto, cercando rimanere piu vicini possibile al GOAL.      

In questo caso non troviamo "tutte" le infomazioni nella scheda ma solo quelle principali;
per ottenere il dettaglio delle altre info, l'utente dovrà richiederle esplicitamente.   

Mi piaceva anche l'idea di dare un'altra soluzine di UI/UX alternativa alla prima 

Credo siano abbastanza chiari i motivi della mia scelta ma spero avremo modo di discuterne a voce

##


In entrambe le versioni, è presente la funzionalità di paginazione e ricerca personaggi per nome.
