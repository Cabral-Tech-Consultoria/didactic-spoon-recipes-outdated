export type ImageType = 'jpg' | 'png'

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
  cheap: false,
  creditsText: string,
  cuisines: string[],
  dairyFree: false,
  diets: string[],
  gaps: string,
  glutenFree: false,
  instructions: string,
  ketogenic: false,
  lowFodmap: false,
  occasions: string[],
  sustainable: false,
  vegan: false,
  vegetarian: false,
  veryHealthy: false,
  veryPopular: false,
  whole30: false,
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