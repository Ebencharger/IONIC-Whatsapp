import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TextpipePipe } from './textpipe.pipe';
import { Camera } from '@ionic-native/camera/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@NgModule({
  declarations: [AppComponent, TextpipePipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera, Contacts, NativeStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
