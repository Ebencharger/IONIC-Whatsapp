import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { MyserviceService } from '../myservice.service';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contactsfound = [];
  newsearch = false;
  chatsArray: any;
  statusArray: any;
  callArray: any;
  menu = false;
  indexSer: any;
  seen = false;
  searchchat = [];
  search = false;
  menuTwo = false;
  me = 0;
  isee=false;
  constructor(private contacts:Contacts, private camera: Camera, private route: Router, public myService: MyserviceService, private fb: FormBuilder, private sanitizer:DomSanitizer) {
    this.callArray = myService.callArray;
    this.chatsArray = myService.chatsArray;
    this.statusArray = myService.statusArray;
  }

  contactList = [];
  forms = this.fb.group({ message: ["", [Validators.required]] });
  get message() {
    return this.forms.get('message');
  }






  ngOnInit() {
    console.log(this.forms.get("message")?.value);
  }

  picture: any;
  handleCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      // this.img = base64Image;
      // console.log(base64Image);
      this.picture = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
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
  handleMenuTwo() {
    this.menuTwo = !this.menuTwo;
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
        this.isee=false;
        if (this.forms.get("message")?.value == "") {
          console.log("weloome");
          this.search = false;
        }
        else {
          console.log("yes");
          this.search = true;
          this.indexSer = i;
          this.searchchat.push(
            { message: this.chatsArray[i].message, myres: this.chatsArray[i].myres, sender: this.chatsArray[i].sender, time: this.chatsArray[i].time, img: this.chatsArray[i].img, status: this.chatsArray[i].status, myindex: this.indexSer })
          console.log(this.searchchat);
        }
        setTimeout(() => {
          this.seen=false;
        }, 10);
        return;
      }
      else if (i == this.chatsArray.length - 1 && this.seen == false) {
        if (this.forms.get("message")?.value != "") {
          console.log("weloome");
          this.search =true;
          console.log("no");
           this.isee=true;
          return;
        }
      }
      else{
        console.log("nooo");
        this.isee=true;
      }
    }


  }
  handleCli(indexSer: any) {
    console.log(indexSer);
    this.route.navigate([`room/${indexSer}`])
  }

  getContacts(): void {
    this.contacts.find(
      ["displayName", "phoneNumbers","photos"],
      {multiple: true, hasPhoneNumber: true}
      ).then((contacts) => {
        for (var i=0 ; i < contacts.length; i++){
          if(contacts[i].displayName !== null) {
            var contact = {};
            contact["name"]   = contacts[i].displayName;
            contact["number"] = contacts[i].phoneNumbers[0].value;
            if(contacts[i].photos != null) {
              console.log(contacts[i].photos);
              contact["image"] = this.sanitizer.bypassSecurityTrustUrl(contacts[i].photos[0].value);
              console.log(contact);
            } else {
              contact["image"] = "assets/dummy-profile-pic.png";
            }
            this.contactList.push(contact);
            alert(this.contactList)
          }
        }
    });
  }
}
