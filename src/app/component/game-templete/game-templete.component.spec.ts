import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTempleteComponent } from './game-templete.component';

describe('GameTempleteComponent', () => {
  let component: GameTempleteComponent;
  let fixture: ComponentFixture<GameTempleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameTempleteComponent]
    });
    fixture = TestBed.createComponent(GameTempleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
