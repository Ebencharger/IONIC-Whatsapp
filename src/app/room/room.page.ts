import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { MyserviceService } from '../myservice.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  myIndex: any;
  mec: "";
  picture:any;
  seen=false;
  callit=false;
  stat="Calling"
  menu=false;
  me=0;
  menuTwo=false;
  
 
  constructor(private route: ActivatedRoute, public myService: MyserviceService, private route2: Router, private fb: FormBuilder,private camera:Camera, private platform:Platform,private nativeStorage: NativeStorage) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.route2.navigate(['home'])
    });
  }
  forms=this.fb.group({ message: ["", [Validators.required]] });
  get message(){
   return this.forms.get('message')
  }
see = true;
ngOnInit() {
  let id = this.route.snapshot.paramMap.get('index');
  this.myIndex = id;
 
}
handleRoute(){
  this.route2.navigate(['home'])
}
handleSel(){
  this.see=false;
  this.seen=true;
  if (this.forms.get('message').value=="") {
    this.see=true;
    this.seen=false;
  }
}
handleCan(){
  if (this.forms.get('message').value=="") {
    this.see=true;
    this.seen=false;
  }
}
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
    this.picture='data:image/jpeg;base64,' + imageData;

  }, (err) => {
    // Handle error
  });
}
handleVideo() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.ALLMEDIA,
    correctOrientation: true,
    saveToPhotoAlbum: true
  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    // this.img = base64Image;
    // console.log(base64Image);
    this.picture='data:image/jpeg;base64,' + imageData;

  }, (err) => {
    // Handle error
  });
}

handleCallme(){
  this.callit=true;
  setTimeout(() => {
    this.stat="Ringing"
  }, 5000);
}

handleHangUp(){
  this.callit=false;
  this.stat="Calling"
}
handleMenu(){
  this.me=1;
  this.menu=!this.menu;
  setTimeout(() => {
    this.me=0;
  }, 100);
}
handleClickB(){
  this.menu=false;
}
handleMenuTwo(){
  this.menuTwo=!this.menuTwo;
}
handleClickBTwo(){
  this.menuTwo=false;
}
handleClickBThree(){
  if(this.me==0){
    this.menu=false;
    }
}
handleMessage(){
  let {message}=this.forms.value;
  this.myService.chatsArray[this.myIndex].myres.push({message:message, time:this.myService.time})
  this.nativeStorage.setItem('whatsapp', JSON.stringify(this.myService.chatsArray))
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  this.forms.get('message')?.setValue([""]);
  if (this.forms.get('message').value=="") {
    this.see=true;
    this.seen=false;
  }
}
}
