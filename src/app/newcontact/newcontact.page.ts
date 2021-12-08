import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MyserviceService } from '../myservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newcontact',
  templateUrl: './newcontact.page.html',
  styleUrls: ['./newcontact.page.scss'],
})
export class NewcontactPage implements OnInit {
  contactList = [];
  indexSer: any;
  newsearch = false;
  seen = false;
  chatsArray: any = [];
  searchchat = [];
  name=[];
  contactDey=false;
  whatsapp=[];
  search = false;
  menuTwo = false;
  menu = false;
  me = 0;
  isee = false;
  loading = true;
  constructor(public myService: MyserviceService, private platform: Platform, private route: Router, private fb: FormBuilder) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.route.navigate(['home'])
    });

    for (let i = 0; i < this.myService.contactList.length; i++) {
      this.name.push(this.myService.contactList[i].name);
       this.name.sort();
     }
     for (let i = 0; i < this.name.length; i++) {
       for (let j = 0; j < this.myService.chatsArray.length; j++) {
         if (this.myService.chatsArray[j].sender==this.name[i]) {
           this.whatsapp.push(myService.chatsArray[j]);
           this.contactDey=true;
           setTimeout(() => {
             this.contactDey=false;
           }, 100);
         }
         else if (i==this.myService.chatsArray.length-1 && this.contactDey==false) {
           console.log("false");
           
         }
         else{
           console.log("false");
           
         }
         
       }
     }
     this.myService.whatsapp=this.whatsapp;
    setInterval(() => {
      this.contactList = this.myService.whatsapp;
      this.chatsArray = myService.whatsapp;
    }, 1000)
   
    if (this.chatsArray == "") {
      this.loading = true;
    }
    else {
      this.loading = false;
    }
  }

  forms = this.fb.group({ message: ["", [Validators.required]] });
  get message() {
    return this.forms.get('message');
  }

  ngOnInit() {

  }

  handleMenuTwo() {
    if (this.menuTwo == true) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.menuTwo = false;
      });
    } else {
      this.menuTwo = !this.menuTwo;

    }
  }

  handleClickBTwo() {
    this.menuTwo = false;
  }
  handleSearch() {
    let { message } = this.forms.value;
    console.log(message);
    this.searchchat = [];

    console.log(this.searchchat);
    for (let i = 0; i < this.chatsArray.length; i++) {
      let reg = new RegExp(message, 'gi')
      let conreg = this.chatsArray[i].sender.match(reg);
      console.log(conreg, message, i);
      if (conreg) {
        this.seen = true;
        this.isee = false;
        if (this.forms.get("message")?.value == "") {
          console.log("weloome");
          this.search = false;
        }
        else {
          console.log("yes");
          this.search = true;
          this.indexSer = i;
          this.searchchat.push(
            { message: this.chatsArray[i].message, myres: this.chatsArray[i].myres, sender: this.chatsArray[i].sender, time: this.chatsArray[i].time, img: this.chatsArray[i].img, status: this.chatsArray[i].status, myindex: this.indexSer, myword: this.myService.chatsArray[i].myword })

        }
        setTimeout(() => {
          this.seen = false;
        }, 10);
      }
      else if (i == this.chatsArray.length - 1 && this.seen == false) {
        if (this.forms.get("message")?.value != "") {
          console.log("weloome");
          this.search = true;
          console.log("no");
          this.isee = true;
        }
      }
    }


  }
  handleCli(indexSer: any) {
    console.log(indexSer);
    this.route.navigate([`room/${indexSer}`])
  }


  handleMenu() {
    this.me = 1;
    this.menu = !this.menu;
    setTimeout(() => {
      this.me = 0;
    }, 100);
  }
  handleClickB() {
    if (this.me == 0) {
      this.menu = false;
    }
  }

}
