import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';


@Component({
  selector: 'app-game-templete',
  templateUrl: './game-templete.component.html',
  styleUrls: ['./game-templete.component.css']
})
export class GameTempleteComponent implements OnInit {

  
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {}

  iconsArray: string[] = []
  DuplicateArray: string[] = []
  shuffeledArray: { icon: string, flipped: boolean, solved: boolean, position: number }[] = []
  timeout!: any
  moves : number = 0

  ngOnInit(): void {
    this.startGame()
  }

  startGame() {
    this.moves = 30
    this.iconsArray = ['🎶', '☠️', '🤖', '🐚', '🕊️', '🦚']
    this.DuplicateArray = [...this.iconsArray, ...this.iconsArray]
    while (this.shuffeledArray.length < this.iconsArray.length * 2) {
      let randomIndex1 = Math.floor((Math.random() * this.DuplicateArray.length));
      this.shuffeledArray.push({
        icon: this.DuplicateArray[randomIndex1],
        flipped: false,
        solved: false,
        position: this.shuffeledArray.length
      })
      this.DuplicateArray.splice(randomIndex1, 1);
    }
  }

  handleActive(data: { icon: string, flipped: boolean, solved: boolean, position: number }) {
   
    const flippeddata = this.shuffeledArray.filter((item) => item.flipped && !item.solved)
    if (flippeddata.length === 2) return
    this.shuffeledArray.map((item) => {
      if (item.position === data.position) {
        item.flipped = !item.flipped
        if(item.flipped === true){
          this.moves --
        }
      }
    })

    this.gameLogicForFlipped()
  }


  gameLogicForFlipped() {
    const flippedData = this.shuffeledArray.filter(piece => piece.flipped && !piece.solved);
    if (flippedData.length === 2) {
      this.timeout = setTimeout(() => {
        this.shuffeledArray = this.shuffeledArray.map(piece => {
          if (
            piece.position === flippedData[0].position ||
            piece.position === flippedData[1].position
          ) {
            if (flippedData[0].icon === flippedData[1].icon) {
              piece.solved = true;
            } else {
              piece.flipped = false;
            }
          }
          return piece;
        });
      }, 800);
    }
  }


  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }


  isGameCompleted(): boolean {
    return this.shuffeledArray.length > 0 && this.shuffeledArray.every(piece => piece.solved);
  }

  clicked = false;
 
  playAudio(){
    let audio = new Audio();
    audio.src = "assets/audio/confettiSoundEffect.mp3";
    audio.load();
    audio.play();
    
  }
 
  surprise(): void {
    this.playAudio();
    const canvas = this.renderer2.createElement('canvas');
 
    canvas.id = 'confetti-canvas';

    const targetDiv = this.elementRef.nativeElement.querySelector('.absolute.bg-black.bg-opacity-50.pt-72');
    this.renderer2.appendChild(targetDiv, canvas);

    const myConfetti = confetti.create(canvas, {
        resize: true,
    });

    myConfetti();

    this.clicked = true;
}

restart(){
  this.startGame()
  window.location.reload()
}




}
