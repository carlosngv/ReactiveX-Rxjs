import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('Next:', value),
    error: error => console.warn(error),
    complete: () => console.info('Complete'),
}

const obs$ = new Observable<string>( subs => {

    try {

        // * Emite estos valores a todos los suscritos al observable
        subs.next('Hello world!');
        subs.next('Bye world!');

        // ? Forzando error
        const a = undefined;
        a.nombre = 'sads';

        // ? El observable termina de emitir acá.
        // ? Ninguna emisión luego del complete se realizará.
        subs.complete();

        subs.next('After complete!!!'); // ! No se ejecuta

    } catch (error) {

        subs.error(new Error('ERROR!!!'));

    }

});

obs$.subscribe( observer );

// obs$.subscribe(
//     resp => {
//         console.log(resp);
//     },
//     err => {
//         console.log(err);
//     },
//     () => {
//         console.info('Completed!');
//     }
// );
