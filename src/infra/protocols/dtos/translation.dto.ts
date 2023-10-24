export class TranslationDTO<T> {
	constructor(
		public to: string,
		public from: string,
		public protected_paths: string[],
		public json: T
	) {}
}
