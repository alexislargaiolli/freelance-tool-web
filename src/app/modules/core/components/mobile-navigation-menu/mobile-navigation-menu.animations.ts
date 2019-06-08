import { animate, animation, AnimationMetadata, query, state, style, transition, trigger, keyframes, group } from '@angular/animations';

export const transAnimation = animation([
    style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
]);

export const mobileNavAnim: AnimationMetadata =
    trigger('mobileNavAnim', [
        state('true', style({
            transform: 'rotate(0)'
        })),
        // state('false', style({
        //     transform: 'rotate(90deg)'
        // })),
        transition('false => true', [
            query('button', [
                style({
                    opacity: 0
                }),
            ]),
            group([
                animate('300ms ease-out', style({
                    transform: 'rotate(0deg)'
                })),
                query('button', [
                    animate('300ms ease-in',
                        style({ opacity: 1 }),
                    ),
                ])
            ])
        ]),
        transition('true => false', [
            animate('200ms ease-in', style({
                transform: 'rotate(90deg)'
            }))
        ]),
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
    ]);
