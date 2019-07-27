import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('schrimps', 200, 'g'),
    new Ingredient('Tea leaves', 50, 'g'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
