import { Component } from '@angular/core';

@Component({
  selector: 'app-game-templete',
  templateUrl: './game-templete.component.html',
  styleUrls: ['./game-templete.component.css']
})
export class GameTempleteComponent {
  constructor(){}

  iconsArray: string[] = ['🎶','☠️','🤖','🐚','🕊️','🦚']
  DuplicateArray:string[] = [...this.iconsArray,...this.iconsArray]

}
