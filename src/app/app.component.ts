import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MyserviceService } from './myservice.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChildren(RouterOutlet) routerOutlets: QueryList<RouterOutlet>;
  constructor(private platform:Platform, public service:MyserviceService) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      alert("appcomp")
      navigator['app'].exitApp();
    });
    // this.whatsapp.push({name:this.contactList})
  }

  ngOnInit(){
      this.platform.backButton.subscribeWithPriority(10, () => {
        navigator['app'].exitApp();
        alert("homecomp")
      });
  }
}
