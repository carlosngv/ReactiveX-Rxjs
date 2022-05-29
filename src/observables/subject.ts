import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('Next:', value),
    error: error => console.warn(error),
    complete: () => console.info('Complete'),
}

const interval$ = new Observable<number>( subscriber => {

    const interval = setInterval(() => subscriber.next(Math.random()), 1000);

    return () => {
        clearInterval(interval);
        console.log('Intervale destroyed!!!')
    }

});


/*
    * El Subject cuenta de las siguientes características importantes:
    ? 1. Casteo múltiple (Muchas suscripciones sujetas a este mismo Subject).
    ? 2. También es un observer.
    ? 3. Por poder ser un observer, también se puede manejar el next, error y complete.
*/

const subject$ = new Subject();
const subscription = interval$.subscribe( subject$ );

// * ¿Para qué sirve enlazar el subject al subscribe?

const subscription1  = subject$.subscribe( observer );
const subscription2 = subject$.subscribe( observer )


setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    subscription.unsubscribe();
}, 3500);



// ! NOTA
/*
    * Cuando la data es producida por el observable en sí mismo, es considerado un
    * "Cold Observable". Per cuando la data es producida FUERA del observable, es
    * llamado "Hot Observable".
    *
    * En resumen, un Subject, nos permite transformar un Cold Observable en un Hot Observable.
*/
