import { Injectable, InjectionToken, Injector, Type } from '@angular/core';
import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

export interface OverlayContext {
  [key: string]: any;
}

export const OVERLAY_CONTEXT_DATA = new InjectionToken<OverlayContext>(
  'OverlayContext'
);

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  public open<T>(
    component: Type<T>,
    context: OverlayContext = {},
    config: OverlayConfig = {}
  ): { overlayRef: OverlayRef; componentInstance: T } {
    const positionStrategy = this.createPositionStrategy();
    const overlayConfig = this.createOverlayConfig(config, positionStrategy);
    const overlayRef = this.overlay.create(overlayConfig);

    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: OVERLAY_CONTEXT_DATA, useValue: context }],
    });
    const componentPortal = new ComponentPortal(component, null, injector);
    const componentRef = overlayRef.attach(componentPortal);

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
    overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        overlayRef.detach();
      }
    });

    return { overlayRef, componentInstance: componentRef.instance };
  }

  close(overlayRef: OverlayRef): void {
    overlayRef.detach();
  }

  private createPositionStrategy(): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }

  private createOverlayConfig(
    config: OverlayConfig,
    positionStrategy: GlobalPositionStrategy
  ): OverlayConfig {
    return new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      panelClass: 'cdk-overlay-pane',
      backdropClass: 'cdk-overlay-transparent-backdrop',
      ...config,
    });
  }
}
