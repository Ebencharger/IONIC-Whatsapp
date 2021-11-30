import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-newcontact',
  templateUrl: './newcontact.page.html',
  styleUrls: ['./newcontact.page.scss'],
})
export class NewcontactPage implements OnInit {

  constructor(public myService:MyserviceService) { }
  ngOnInit() {
  }

}
