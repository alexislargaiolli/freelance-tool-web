import { AnimationMetadata, trigger, transition, animate, style, query, stagger, group, animateChild, state } from '@angular/animations';

export const loginAnim: AnimationMetadata =
    trigger('loginAnim', [
        transition('notLoggedIn => loggedIn', [
            query('.success-message', [
                style({
                    opacity: 0,
                    position: 'absolute'
                }),
            ]),
            query('section', [
                animate('300ms ease-in', style({
                    opacity: 0,
                    transform: 'scale(0.5)',
                })),
                style({
                    position: 'absolute'
                }),
            ]),
            query('.success-message', [
                style({
                    position: 'relative',
                    transform: 'scale(0.5)',
                }),
                animate('300ms ease-out', style({
                    opacity: 1,
                    transform: 'scale(1)',
                })),
            ]),
        ]),
        transition(':leave', [
            query(':self', [
                style({
                    opacity: 1
                }),
                animate('2000ms ease-out', style({
                    opacity: 0
                })),
            ])
        ]),
        transition(':enter', [
            query('mat-form-field, button, mat-card-title, span, p, a', [
                style({
                    opacity: 0,
                    transform: 'translateX(-10px)'
                }),
            ]),
            // query('aside', [
            //     style({
            //         opacity: 0,
            //         transform: 'translateX(-10px)'
            //     }),
            //     animate('300ms ease-out', style({
            //         opacity: 1,
            //         transform: 'translateX(0)'
            //     })),
            // ]),
            // query('main', [
            //     style({
            //         opacity: 0,
            //         transform: 'scaleX(0.5) scaleY(0.5)'
            //     }),
            //     animate('300ms ease-in', style({
            //         opacity: 1,
            //     })),
            //     animate('200ms ease-out', style({
            //         transform: 'scaleX(1) scaleY(0.5)'
            //     })),
            //     animate('200ms ease-out', style({
            //         transform: 'scaleX(1) scaleY(1)'
            //     }))
            // ]),
            query('mat-form-field, button, span, p, a', [

                stagger('60ms', animate('300ms ease', style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })))
            ]),
        ])
    ]);
