export enum CuisinesEnum {
  African = 'African',
  Asian = 'Asian',
  American = 'American',
  British = 'British',
  Cajun = 'Cajun',
  Caribbean = 'Caribbean',
  Chinese = 'Chinese',
  EasternEuropean = 'Eastern European',
  European = 'European',
  French = 'French',
  German = 'German',
  Greek = 'Greek',
  Indian = 'Indian',
  Irish = 'Irish',
  Italian = 'Italian',
  Japanese = 'Japanese',
  Jewish = 'Jewish',
  Korean = 'Korean',
  LatinAmerican = 'Latin American',
  Mediterranean = 'Mediterranean',
  Mexican = 'Mexican',
  MiddleEastern = 'Middle Eastern',
  Nordic = 'Nordic',
  Southern = 'Southern',
  Spanish = 'Spanish',
  Thai = 'Thai',
  Vietnamese = 'Vietnamese',
}

export class Cuisines {
	public African: KeyNamePair = { name: CuisinesEnum.African, key: 'african' }
	public Asian: KeyNamePair = { name: CuisinesEnum.Asian, key: 'asian' }
	public American: KeyNamePair = { name: CuisinesEnum.American, key: 'american' }
	public British: KeyNamePair = { name: CuisinesEnum.British, key: 'british' }
	public Cajun: KeyNamePair = { name: CuisinesEnum.Cajun, key: 'cajun' }
	public Caribbean: KeyNamePair = { name: CuisinesEnum.Caribbean, key: 'caribbean' }
	public Chinese: KeyNamePair = { name: CuisinesEnum.Chinese, key: 'chinese' }
	public EasternEuropean: KeyNamePair = { name: CuisinesEnum.EasternEuropean, key: 'eastern european' }
	public European: KeyNamePair = { name: CuisinesEnum.European, key: 'european' }
	public French: KeyNamePair = { name: CuisinesEnum.French, key: 'french' }
	public German: KeyNamePair = { name: CuisinesEnum.German, key: 'german' }
	public Greek: KeyNamePair = { name: CuisinesEnum.Greek, key: 'greek' }
	public Indian: KeyNamePair = { name: CuisinesEnum.Indian, key: 'indian' }
	public Irish: KeyNamePair = { name: CuisinesEnum.Irish, key: 'irish' }
	public Italian: KeyNamePair = { name: CuisinesEnum.Italian, key: 'italian' }
	public Japanese: KeyNamePair = { name: CuisinesEnum.Japanese, key: 'japanese' }
	public Jewish: KeyNamePair = { name: CuisinesEnum.Jewish, key: 'jewish' }
	public Korean: KeyNamePair = { name: CuisinesEnum.Korean, key: 'korean' }
	public LatinAmerican: KeyNamePair = { name: CuisinesEnum.LatinAmerican, key: 'latin american' }
	public Mediterranean: KeyNamePair = { name: CuisinesEnum.Mediterranean, key: 'mediterranean' }
	public Mexican: KeyNamePair = { name: CuisinesEnum.Mexican, key: 'mexican' }
	public MiddleEastern: KeyNamePair = { name: CuisinesEnum.MiddleEastern, key: 'middle eastern' }
	public Nordic: KeyNamePair = { name: CuisinesEnum.Nordic, key: 'nordic' }
	public Southern: KeyNamePair = { name: CuisinesEnum.Southern, key: 'southern' }
	public Spanish: KeyNamePair = { name: CuisinesEnum.Spanish, key: 'spanish' }
	public Thai: KeyNamePair = { name: CuisinesEnum.Thai, key: 'thai' }
	public Vietnamese: KeyNamePair = { name: CuisinesEnum.Vietnamese, key: 'vietnamese' }
}

export type KeyNamePair = { name: CuisinesEnum, key: string }
