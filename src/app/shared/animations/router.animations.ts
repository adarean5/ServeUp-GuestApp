import {
  animate,
  query,
  style,
  transition,
  trigger,
  group, animateChild,
} from '@angular/animations';

export function routerAnimation(slideTime: string, slideOut: string, slideIn: string) {
  return trigger('routerAnimation', [
    transition(':decrement', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          // top: 0,
          // left: 0,
          width: '100%',
          height: '100%'
        })
      ]),

      query(':enter', [
        style({ transform: 'translate(-100%)'})
      ]),

      query(':leave', animateChild()),

      group([
        query(':leave', [
          animate(slideTime + ' ' + slideOut, style({ transform: 'translate(100%)'}))
        ]),
        query(':enter', [
          animate(slideTime + ' ' + slideIn, style({ transform: 'translate(0%)'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition(':increment', [
      // Apply styling to the host view
      style({ position: 'relative' }),
      // Set the entering and leaving component's position to absolute
      query(':enter, :leave', [
        style({
          position: 'absolute',
          // top: 0,
          // left: 0,
          width: '100%',
          height: '100%'
        })
      ]),
      // Move the entering component to the far right side
      query(':enter', [
        style({ transform: 'translate(100%)'})
      ]),
      // Trigger the leaving component's child animations.
      query(':leave', animateChild()),
      // Animate the leaving and entering component in parallel
      group([
        // Leaving component animations:
        query(':leave', [
          animate(slideTime + ' ' + slideOut, style({ transform: 'translate(-100%)'}))
        ]),
        // Entering component animations:
        query(':enter', [
          animate(slideTime + ' ' + slideIn, style({ transform: 'translate(0%)'}))
        ])
      ]),
      // Trigger the entering component's child animations.
      query(':enter', animateChild()),
    ])
  ]);
}
