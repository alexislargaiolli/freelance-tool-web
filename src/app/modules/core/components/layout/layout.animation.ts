import { AnimationMetadata, trigger, transition, animate, style, query, stagger, group, animateChild, state } from '@angular/animations';

export const layoutAnim: AnimationMetadata =
    trigger('mobileMenuAnim', [
        state('true', style({
            transform: 'rotateY(-40deg)'
        })),
        state('false', style({
            transform: 'rotateY(0)'
        })),
        transition('false => true', [
            animate('300ms ease')
        ]),
        transition('true => false', [
            animate('250ms ease-in')
        ])
    ]);
