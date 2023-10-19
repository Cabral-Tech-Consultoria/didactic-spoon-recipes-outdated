export interface INutrition {
  bad: IEvalNutrient[]
  good: IEvalNutrient[]
  nutrients: INutrient[],
  properties: IProperty[],
  ingredients: INutrientByIngredient[],
  caloricBreakdown: ICaloricBreakDown,
  weightPerServing: {
    amount: number,
    unit: string
  }
}

export interface INutrient {
  name: string,
  amount: number,
  unit: string,
  percentOfDailyNeeds: number
}

export interface IEvalNutrient {
  amount: string,
  indented: boolean,
  title: string,
  percentOfDailyNeeds: number
}

export interface IProperty {
  name: string,
  amount: number,
  unit: string
}

export interface INutrientByIngredient {
  id: number,
  name: string,
  amount: number,
  unit: string,
  nutrients: INutrient[]
}

export interface ICaloricBreakDown {
  percentProtein: number,
  percentFat: number,
  percentCarbs: number,
}