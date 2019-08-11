import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('schrimps', 200, 'g'),
    new Ingredient('Tea leaves', 50, 'g'),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.notifyListObservers();
  }

  addIngredients(ingredients: Ingredient[]) {
    // TODO: add logic to group the ingredients by name
    this.ingredients.push(...ingredients);
    this.notifyListObservers();
  }

  updateIngredient(index: number, editedIngredient: Ingredient){
    this.ingredients[index] = editedIngredient;
    this.notifyListObservers();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.notifyListObservers();
  }

  private notifyListObservers() {
    this.ingredientsChanged.next(this.getIngredients().slice());
  }
}
