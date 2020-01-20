import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
    overrides = {
        // override hammerjs default configuration
        swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
        pinch: { enable: true },
        rotate: { enable: false },
        pan: { enable: false },
    };
    options = {
        touchAction: 'pan-y'
    };
}
