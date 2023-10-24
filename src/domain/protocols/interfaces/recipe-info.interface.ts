export type ImageType = 'jpg' | 'png' | 'jpeg'

export interface Ingredients {
  aisle: string,
  amount: number,
  consitency: string,
  id: number,
  image: string,
  measures: {
  metric: {
    amount: number,
      unitLong: string,
      unitShort: string,
  },
  us: {
    amount: number,
      unitLong: string,
      unitShort: string,
  }
},
  meta: string[],
  name: string,
  original: string,
  originalName: string,
  unit: string,
}

export interface ProductMatch {
  id: number,
  title: string,
  description: string,
  price: string,
  imageUrl: string,
  averageRating: number,
  ratingCount: number,
  score: number,
  link: string,
}

export interface IRecipeInfo {
  id: number,
  title: string,
  image: string,
  imageType: ImageType,
  servings: number,
  readyInMinutes: number,
  license: string,
  sourceName: string,
  sourceUrl: string,
  spoonacularSourceUrl: string,
  healthScore: number,
  spoonacularScore: number,
  pricePerServing: number,
  analyzedInstructions: string[],
  cheap: boolean,
  creditsText: string,
  cuisines: string[],
  dairyFree: boolean,
  diets: string[],
  gaps: string,
  glutenFree: boolean,
  instructions: string,
  ketogenic: boolean,
  lowFodmap: boolean,
  occasions: string[],
  sustainable: boolean,
  vegan: boolean,
  vegetarian: boolean,
  veryHealthy: boolean,
  veryPopular: boolean,
  whole30: boolean,
  weightWatcherSmartPoints: 17,
  dishTypes: string[],
  extendedIngredients: Ingredients[],
  summary: string,
  winePairing: {
    pairedWines: string[],
    pairingText: string,
    productMatches: ProductMatch[]
  }
}

export interface IRandomRecipes {
  recipes: IRecipeInfo[]
}