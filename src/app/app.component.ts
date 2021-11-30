import { Component, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChildren(RouterOutlet) routerOutlets: QueryList<RouterOutlet>;
  constructor(private platform:Platform) {
    this.platform.backButton.subscribe(() => {
      console.log("TEST");
    });
  }
}
