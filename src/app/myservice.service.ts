import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  time: any = "";
  contactList = [];
  whatsapp = [];
  chatsArray = [
    {
      message:
        [
          {
            message: "myself, i don't know", time: "06:34pm"
          }
        ],
      sender: "Adesola Mum", myres: [],
      time: "08:02pm",
      img: '../../assets/book.JPG',
      status: "Online",
      myword: "hi, i am using Whatsapp"
    },
    {
      message:
        [
          {
            message: "Could you come home soon? I have been trying to tell him that, but he said he would like to see you",
            time: "06:34pm"
          }
        ],
      myres: [],
      sender: "Bro Josh",
      time: "08:01pm",
      img: '../../assets/croch.jpg',
      status: "Last seen 5m ago",
      myword: "hi, i am using Whatsapp"
    },
    {
      message:
        [
          {
            message: "you're amazing",
            time: "07:10pm"
          }
        ],
      myres: [],
      sender: "Daddy UK",
      time: "07:00pm",
      img: '../../assets/DAUD.png',
      status: "Online",
      myword: "hi, i am using Whatsapp"
    },
    {
      message:
        [
          {
            message: "hi, how're you",
            time: "07:09pm"
          },
          {
            message: "Could you come home soon? I have been trying to tell him that, but he said he would like to see you",
            time: "07:34pm"
          }
        ],
      myres: [
        {
          message: "hello, i am fine",
          time: "07:35pm"
        }
      ],
      sender: "Dear Eben",
      time: "08:37pm",
      img: '../../assets/2.jpg',
      status: "Online",
      myword: "hi, i am using Whatsapp"
    },
    {
      message:
        [
          {
            message: "what do you say?",
            time: "07:45pm"
          }
        ],
      myres: [],
      sender: "Taiwo Mi",
      time: "08:10pm",
      img: '../../assets/bigger.jpeg',
      status: "Last seen 3m ago",
      myword: "hi, i am using Whatsapp"
    },
    {
      message:
        [
          {
            message: "Eben can you do me a favour hi, how're you",
            time: "07:00pm"
          }
        ],
      myres: [],
      sender: "Teacher",
      time: "08:13pm",
      img: '../../assets/ajo.jpg',
      status: "Last seen 08:10pm",
      myword: "hi, i am using Whatsapp"
    }
  ];

  statusArray = [{ message: "Could you come home soon?", myImg: '../../assets/croch.jpg', sender: "Bro Josh", time: "Today, 08:01pm", img: '../../assets/Eben.jpg', mystat:"image"}, { message: "Eben can you do me a favour hi, how're you", myImg: '../../assets/ajo.jpg', sender: "Teacher", time: "Today, 08:13pm", img: '../../assets/Capture.PNG', mystat:"image"}, { message: "what do you say?", myImg: '../../assets/2.jpg', sender: "Debby", time: "Today, 08:10pm", img: '../../assets/ajosplash.png', mystat:"image"}, { message: "myself, i don't know", myImg: '../../assets/2.jpg', sender: "Dear Eben", time: "Today, 08:02pm", img: '../../assets/ASIGNEMENT.jpg', mystat:"image"}, { message: "you're amazing",  myImg: '../../assets/DAUD.png', sender: "Daddy UK", time: "Today, 07:00pm", img: '../../assets/Christcrucified.jpg', mystat:"image"}, { message: "hi, how're you", myImg: '../../assets/bigger.jpeg', sender: "Taiwo Mi", time: "Today,08:37pm", img: '../../assets/bigger.jpg', status:"I don't want to hide it", mystat:"message"}];

  callArray = [{ sender: "Debby", time: "08:13pm", img: '../../assets/2.jpg', date: "November 21", detail: "missed" },{ sender: "Joshua", time: "08:01pm", img: '../../assets/croch.jpg', date: "November 24", detail: 'received' }, { sender: "Teacher", time: "08:13pm", img: '../../assets/ajo.jpg', date: "November 23", detail: "call" }];
  constructor(private nativeStorage: NativeStorage) {
    let date = new Date;
    let arizon;
    let newminute;
    let newhour;
    let myhour = date.getHours();
    let myminute = date.getMinutes();
    if (myhour > 12) {
      arizon = "am";
    }
    else {
      arizon = "pm";
    }
    if (myminute < 10) {
      newminute = `0${myminute}`;
    }
    else {
      newminute = myminute;
    }
    if (myhour < 12) {
      newhour = `0${myhour}`;
    }
    else {
      newhour = myhour;
    }
    this.time = `${myhour}:${newminute}${arizon}`

    // this.nativeStorage.remove('myitem')
    //   .then(
    //     () => console.log('remove item!'),
    //     error => console.error('Error removing item', error)
    //   );

    // this.nativeStorage.setItem('whatsapp', JSON.stringify(this.chatsArray))
    //   .then(
    //     () => console.log('Stored item!'),
    //     error => console.error('Error storing item', error)
    //   );

    setInterval(()=>{
      this.nativeStorage.getItem('whatsapp')
      .then(
        data => this.chatsArray=JSON.parse(data),
        error => this.chatsArray=this.chatsArray
      );
    }, 1000)
  }
}
