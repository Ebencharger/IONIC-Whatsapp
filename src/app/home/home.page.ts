import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { MyserviceService } from '../myservice.service';
import { Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  chatsArray: any=[];
  statusArray: any=[];
  callArray: any=[];
  searchClick=0;
  clickMe="";
  menu = false;
  hide=false;
  searchTwo=false;
  pauseInterval=0;
  time=0;
  myStatusInt:any;
  width="0%"
  pause:any;
  pauseWidth:any;
  myMove:any;
  statusIndex:any;
  statusTwo=false;
  searchThree=false;
  status=false;
  myStyle="background-color:'white'; height:'20px'; width:'20%'";
  indexSer: any;
  myIndex:any;
  newsearch = false;
  callit=false;
  stat="Calling"
  seen = false;
  searchchat = [];
  search = false;
  menuTwo = false;
  my=0;
  me = 0;
  isee:any="";
  constructor(private camera: Camera, private route: Router, public myService: MyserviceService, private fb: FormBuilder, private platform:Platform, private sanitizer:DomSanitizer, private contacts:Contacts) {
    this.getContacts();
    this.callArray = myService.callArray;
    this.chatsArray = myService.chatsArray;
    this.statusArray = myService.statusArray;
  };
  forms = this.fb.group({ message: ["", [Validators.required]] });
  get message() {
    return this.forms.get('message');
  }

  contactsfound = [];
  contactList = []


  
  getContacts(): void {
    this.contacts.find(
      ["displayName", "phoneNumbers","photos"],
      {multiple: true, hasPhoneNumber: true}
      ).then((contacts) => {
        for (let i=0 ; i < contacts.length; i++){
          if(contacts[i].displayName !== null) {
            let contact = {};
            contact["name"]   = contacts[i].displayName;
            if (contact['name'].length>12) {
              contact['name']=contact['name'].substring(0, 15);
            }
            else{
              contact['name']=contact['name'];
            }
            contact["number"] = contacts[i].phoneNumbers[0].value;
            if(contacts[i].photos != null) {
              console.log(contacts[i].photos);
              contact["image"] = this.sanitizer.bypassSecurityTrustUrl(contacts[i].photos[0].value);
              console.log(contact);
            } else {
              contact["image"] = "fa fa-user";
            }
            this.contactList.push(contact);
            this.contactList=this.contactList.sort();
            setInterval(()=>{
              this.myService.contactList=this.contactList;
             }, 1000)
            // let a=JSON.stringify(this.contactList)
            // alert(a)
          }
        }
    });
  }






  ngOnInit() {
    console.log(this.forms.get("message")?.value);
    if (this.menuTwo==false) {
      this.platform.backButton.subscribeWithPriority(10000, () => {
        navigator['app'].exitApp();
      });
    }else{
      this.menuTwo=false;
    }
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
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.menuTwo=false;
      });
      this.menuTwo = !this.menuTwo;
    }
  handleClickBTwo() {
    this.menuTwo = false;
  }

  ConfirmSearchOne(){
  this.searchClick=1;
  }
  ConfirmSearchTwo(){
  this.searchClick=2;
  }
  ConfirmSearchThree(){
  this.searchClick=3;
  }

  handleSearch() {
    let { message } = this.forms.value;
    console.log(message);
    this.searchchat = [];
    
    console.log(this.searchchat);
   if (this.clickMe=="chats") {
     for (let i = 0; i < this.chatsArray.length; i++) {
      let reg = new RegExp(message, 'gi')
      let conreg = this.chatsArray[i].sender.match(reg);
      console.log(conreg, message, i);
      if (conreg) {
        this.seen = true;
        this.isee="";
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
      }
      else if (i == this.chatsArray.length - 1 && this.seen == false) {
        if (this.forms.get("message")?.value != "") {
          console.log("weloome");
          this.search =true;
          console.log("no");
           this.isee="No result found";
        }
      }
     }
    }
    else if (this.clickMe=="status") {
      for (let i = 0; i < this.statusArray.length; i++) {
        let reg = new RegExp(message, 'gi')
        let conreg = this.statusArray[i].sender.match(reg);
        console.log(conreg, message, i);
        if (conreg) {
          this.seen = true;
          this.isee="";
          if (this.forms.get("message")?.value == "") {
            console.log("weloome");
            this.searchTwo =true;
          }
          else {
            console.log("yes");
            this.searchTwo =true;
            this.indexSer = i;
            this.searchchat.push(
              { message: this.statusArray[i].message, myImg:this.statusArray[i].myImg, sender: this.statusArray[i].sender, time: this.statusArray[i].time, img: this.statusArray[i].img, mystat:this.statusArray[i].mystat, myindex: this.indexSer, status:this.statusArray[i].status})
            console.log(this.searchchat);
          }
          setTimeout(() => {
            this.seen=false;
          }, 10);
        }
        else if (i == this.statusArray.length - 1 && this.seen == false) {
          if (this.forms.get("message")?.value != "") {
            console.log("weloome");
            this.searchTwo =true;
            console.log("no");
             this.isee="No result found";
          }
        }
      }
    }
    else if (this.clickMe=="calls") {
      for (let i = 0; i < this.callArray.length; i++) {
        let reg = new RegExp(message, 'gi')
        let conreg = this.callArray[i].sender.match(reg);
        console.log(conreg, message, i);
        if (conreg) {
          this.seen = true;
          this.isee="";
          if (this.forms.get("message")?.value == "") {
            console.log("weloome");
            this.searchThree =true;
          }
          else {
            console.log("yes");
            this.searchThree =true;
            this.indexSer = i;
            this.searchchat.push(
              {sender: this.callArray[i].sender, time: this.callArray[i].time, img: this.callArray[i].img, myindex: this.indexSer, date: this.callArray[i].date, detail: this.callArray[i].detail })
            console.log(this.searchchat);
          }
          setTimeout(() => {
            this.seen=false;
          }, 10);
        }
        else if (i == this.callArray.length - 1 && this.seen == false) {
          if (this.forms.get("message")?.value != "") {
            console.log("weloome");
            this.searchThree =true;
            console.log("no");
             this.isee="No result found";
          }
        }
      }
    }
    else{
      for (let i = 0; i < this.chatsArray.length; i++) {
        let reg = new RegExp(message, 'gi')
        let conreg = this.chatsArray[i].sender.match(reg);
        console.log(conreg, message, i);
        if (conreg) {
          this.seen = true;
          this.isee="";
          if (this.forms.get("message")?.value == "") {
            console.log("weloome");
            this.search = false;
          }
          else {
            console.log("yes");
            this.search = true;
            this.indexSer = i;
            this.searchchat.push(
              { message: this.chatsArray[i].message, myres: this.chatsArray[i].myres, sender: this.chatsArray[i].sender, time: this.chatsArray[i].time, img: this.chatsArray[i].img, status: this.chatsArray[i].status, myindex: this.indexSer})
            console.log(this.searchchat);
          }
          setTimeout(() => {
            this.seen=false;
          }, 10);
        }
        else if (i == this.chatsArray.length - 1 && this.seen == false) {
          if (this.forms.get("message")?.value != "") {
            console.log("weloome");
            this.search =true;
            console.log("no");
             this.isee="No result found";
          }
        }
      }
    }

  }
  handleCli(indexSer: any) {
    console.log(indexSer);
    this.route.navigate([`room/${indexSer}`])
  }
  handleCliTwo(j: any) {
    this.time=0;
    this.width="0%";
    clearInterval(this.myMove)
    console.log(j);
    this.status=true;
    this.statusIndex=this.searchchat[j].myindex;
    this.handleMove();
  }
  handleCliThree(j: any) {
    this.callit=true;
    this.myIndex=this.searchchat[j].myindex;
  }
  handleCallme(q:any){
    this.myIndex=q;
    this.callit=true;
    setTimeout(() => {
      this.stat="Ringing"
    }, 5000);
  }
  
  handleHangUp(){
    this.callit=false;
    this.stat="Calling"
  }
  handleRoute(){
   this.status=false;
   this.statusTwo=false;
   this.time=0;
   this.width="0%";
  }
  handleStatus(i:any){
    clearInterval(this.myMove)
    this.time=0;
    this.width="0%"
    this.handleMove();
    console.log(i);  
  this.statusIndex=i;
  this.status=true;
  }

  handleMove() {
    this.myMove=setInterval(()=>{
      this.time=this.time+10;
      console.log(this.time);
      if (this.time==110) {
        clearInterval(this.myMove)
        this.status=false;
        this.statusTwo=false;
        this.time=0;
        this.width="0%";
      }
      else{
        this.width=`${this.time}%`
      }
    }, 1000)
  }
  
  handlePause(){
    this.myStatusInt=setInterval(()=>{
   this.pauseInterval++;
   console.log(this.pauseInterval++);
     if (this.pauseInterval>1) {
      this.pause=this.time;
      this.pauseWidth=this.width;
      clearInterval(this.myMove)
      this.time=0;
      this.width="0%"
      this.width=this.pauseWidth;
      this.time=this.pause;
      this.hide=true;
     }
    }, 1000)
  }

  handleStart(){
  this.handleMove();
  clearInterval(this.myStatusInt)
  this.hide=false;
  }

  handleMyStatus(){
    clearInterval(this.myMove)
    this.time=0;
    this.width="0%"
    this.handleMove();
    this.statusTwo=true;
  }

  handleCheckme(){
 this.clickMe="chats";
  }
  handleCheckmeone(){
 this.clickMe="status";
  }
  handleCheckmetwo(){
 this.clickMe="calls";
  }
  
}
