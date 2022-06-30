import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cubitos';

  dogDicesAmount: number = 0;
  diploDuploDicesAmount: number = 0;

  currentRollDD: number = 0;
  currentRollDogs: number = 0;

  currentResult!: Result;
  results: Array<Result> = [];

  constructor(){
    this.resetCurrentResult();
  }

  resetCurrentResult(): void {
    this.currentResult = {
      dogsTotal: this.dogDicesAmount,
      diploDuploTotal: this.diploDuploDicesAmount,
      dogsActive: 0,
      diploDuploActive: 0,
      totalPoints: 0
    }
  }

  ngOnInit(): void {
    this.dogDicesAmount = 2;
    this.diploDuploDicesAmount = 7;

  }

  multipleThrowDices(n: number): void {
    for(let i = 0; i < n; i++){
      this.throwDices();
    }
  }

  throwDices(): void {
    if(this.currentResult.dogsTotal === 0){
      this.resetCurrentResult();
      this.currentRollDD = this.diploDuploDicesAmount;
      this.currentRollDogs = this.dogDicesAmount;
    }
    let success: boolean = false;
    for(let i = 0; i < this.currentRollDogs; i++){
      if((this.getRandomInt(6) + 1) >= 4){
        success = true;
        this.currentRollDogs--;
        i--;
        this.currentResult.dogsActive++;
      }
    }
    for(let i = 0; i < this.currentRollDD; i++){
      if((this.getRandomInt(6) + 1) >= 6){
        success = true;
        this.currentRollDD--;
        i--;
        this.currentResult.diploDuploActive++;
      }
    }
    if(!success && (this.currentResult.diploDuploActive + this.currentResult.dogsActive) >= 3){
      this.currentResult.totalPoints = (this.currentResult.diploDuploActive * this.currentResult.dogsActive)
        + this.currentResult.dogsActive;
      this.results.push(this.currentResult);
      this.resetCurrentResult();
      this.currentRollDD = this.diploDuploDicesAmount;
      this.currentRollDogs = this.dogDicesAmount;
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  get averagePoints(){
    const sum = this.results.reduce((a, b) => a + b.totalPoints, 0);
    const avg = (sum / this.results.length) || 0;
    return avg;
  }
}


export interface Result {
  diploDuploTotal: number;
  diploDuploActive: number;
  dogsTotal: number;
  dogsActive: number;
  totalPoints: number;
}
