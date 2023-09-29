import { Component, OnInit } from '@angular/core';
import * as confetti from 'canvas-confetti';




@Component({
  selector: 'app-game-templete',
  templateUrl: './game-templete.component.html',
  styleUrls: ['./game-templete.component.css']
})
export class GameTempleteComponent implements OnInit {

  constructor(
  ) {}


  iconsArray: string[] = ['🎶', '☠️', '🤖', '🐚', '🕊️', '🦚']
  DuplicateArray: string[] = [...this.iconsArray, ...this.iconsArray]
  shuffeledArray: { icon: string, flipped: boolean, solved: boolean, position: number }[] = []
  timeout!: any

  ngOnInit(): void {
    this.startGame()
  }

  startGame() {
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

  // celebrate() {
  //   console.log("hai");
    
  //   const confettiSettings = {
  //     particleCount: 100,
  //     spread: 70,
  //     colors: ['#FF0000', '#00FF00', '#0000FF'],
  //     target: 'confetti-canvas',
  //   };

   
  //     confetti(confettiSettings);
    
  // }



}
