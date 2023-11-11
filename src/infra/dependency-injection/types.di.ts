import {Container, interfaces} from 'inversify'
import ServiceIdentifier = interfaces.ServiceIdentifier;
import Newable = interfaces.Newable;

export const TYPES_DI = {
	RecipeService: Symbol.for('RecipeService'),
	RecipeController: Symbol.for('RecipeController'),
	IngredientService: Symbol.for('IngredientService'),
	IngredientController: Symbol.for('IngredientController'),
	TranslationService: Symbol.for('TranslationService'),
	AuthController: Symbol.for('AuthController'),
	AuthService: Symbol.for('AuthService'),
}

export class DIContainerConfig {
	static container: Container = new Container()

	static bindClass<T>(symbol: symbol, type: ServiceIdentifier<T>) {
		this.container.bind<T>(symbol).to(type as Newable<T>)
	}
}