import { CloudWatchLogs } from 'aws-sdk';
import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('Next:', value),
    error: error => console.warn(error),
    complete: () => console.info('Complete'),
}

const intervalo$ = new Observable<number>( subscriber => {
    let counter = 0;

    const interval = setInterval(() => {
        counter++;
        console.log(counter)
        subscriber.next(counter);
    }, 1000);

    return () => { // ? el return se ejecuta cuando se llama al unsuscribe() del observable.
        clearInterval( interval );
        console.log('Interval destroyed!!!!');
    }

});

// * Encadenar observables

/*
    * Las subscripciones pueden encadenarse, de tal forma que al ejecutar el unsubscribe()
    * la Subscription hará unsuscribe() a las múltiples Subscriptions encadenadas.
*/

const subscription  = intervalo$.subscribe( observer );
const subscription2 = intervalo$.subscribe( observer );

subscription.add( subscription2 )

setTimeout(() => {

    /*
        ? unsubscribe() no asegura cancelar del todo el observable,
        ? internamente seguirá trabajando.
    */

    subscription.unsubscribe();

    console.log('TimeOut finished!!!');

}, 3000);
