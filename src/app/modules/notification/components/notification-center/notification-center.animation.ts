import { trigger, state, style, transition, animate, group, query } from '@angular/animations';
import { AnimationMetadata } from '@angular/animations';

export const notifAnim: AnimationMetadata = trigger('notifAnim', [
    state('*', style({
        transform: 'translate(0%)',
        opacity: 1
    })),
    transition(':enter', [
        style({
            transform: 'translate(100%)',
            opacity: 0
        }),
        animate('300ms cubic-bezier(.06,.5,.27,1.3)')
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            'min-height': 0
        }),
        group([
            query('.close-icon',
                style({
                    opacity: 0
                }), { optional: true }),
            query('.notif-icon',
                animate('200ms ease-in',
                    style({
                        opacity: 0,
                        height: 0
                    })
                ), { optional: true }),
            animate('200ms ease-in',
                style({
                    opacity: 0,
                    height: 0
                })
            )
        ])
    ])
]);
