import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  chatsArray=[{message:[{message:"hi, how're you", time:"07:09pm"}, {message:"Could you come home soon? I have been trying to tell him that, but he said he would like to see you", time:"07:34pm"}], myres:["hello, i am fine"], sender:"Adeola", time:"08:37pm", img:'../../assets/2.jpg', status:"Online"}, {message:[{message:"Eben can you do me a favour hi, how're you", time:"07:00pm"}], sender:"Teacher", time:"08:13pm", img:'../../assets/ajo.jpg',status:"Last seen 08:10pm"},{message:[{message:"what do you say?", time:"07:45pm"}], sender:"Debby", time:"08:10pm", img:'../../assets/bigger.jpeg',status:"Last seen 3m ago"},{message:[{message:"myself, i don't know", time:"06:34pm"}], sender:"Adeola", time:"08:02pm", img:'../../assets/book.JPG', status:"Online"},{message:[{message:"Could you come home soon? I have been trying to tell him that, but he said he would like to see you", time:"06:34pm"}], sender:"Joshua", time:"08:01pm", img:'../../assets/croch.jpg',status:"Last seen 5m ago"},{message:[{message:"you're amazing", time:"07:10pm"}], sender:"Tboy", time:"07:00pm", img:'../../assets/DAUD.png', status:"Online"}];

  statusArray=[{message:"Could you come home soon?", sender:"Joshua", time:"Today, 08:01pm", img:'../../assets/croch.jpg'},{message:"Eben can you do me a favour hi, how're you", sender:"Teacher", time:"Today, 08:13pm", img:'../../assets/ajo.jpg'},{message:"what do you say?", sender:"Debby", time:"Today, 08:10pm", img:'../../assets/bigger.jpeg'},{message:"myself, i don't know", sender:"Adeola", time:"Today, 08:02pm", img:'../../assets/book.JPG'},{message:"you're amazing", sender:"Tboy", time:"Today, 07:00pm", img:'../../assets/DAUD.png'}, {message:"hi, how're you", sender:"Adeola", time:"Today,08:37pm", img:'../../assets/2.jpg'}];

  callArray=[{sender:"Joshua", time:"08:01pm", img:'../../assets/croch.jpg', date:"November 24", detail:'received'},{ sender:"Teacher", time:"08:13pm", img:'../../assets/ajo.jpg', date:"November 23", detail:"call"}, { sender:"Debby", time:"08:13pm", img:'../../assets/2.jpg', date:"November 21", detail:"missed"}];
  constructor() { }
}
