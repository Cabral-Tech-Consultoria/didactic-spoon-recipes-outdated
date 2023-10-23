export enum LanguagesEnum {
  af = 'Afrikaans', sq = 'Albanian', am = 'Amharic', ar = 'Arabic', hy = 'Armenian',
  az = 'Azerbaijani', be = 'Belarusian', bel = 'Belarusian (ISO-639-2)', bn = 'Bengali', bs = 'Bosnian',
  bg = 'Bulgarian', ca = 'Catalan', ceb = 'Cebuano', zhCN = 'Chinese (Simplified)', zhTW = 'Chinese (Traditional)',
  hr = 'Croatian', cs = 'Czech', da = 'Danish', nl = 'Dutch', en = 'English',
  et = 'Estonian', tl = 'Filipino', fi = 'Finnish', fr = 'French', fy = 'Frisian',
  gl = 'Galician', ka = 'Georgian', de = 'German', el = 'Greek', gu = 'Gujarati',
  ht = 'Haitian Creole', ha = 'Hausa', he = 'Hebrew', hi = 'Hindi', hu = 'Hungarian',
  is = 'Icelandic', ig = 'Igbo', id = 'Indonesian', ga = 'Irish', it = 'Italian',
  ja = 'Japanese', kn = 'Kannada', kk = 'Kazakh', km = 'Khmer', ko = 'Korean',
  lo = 'Lao', lv = 'Latvian', lt = 'Lithuanian', lb = 'Luxembourgish', mk = 'Macedonian',
  mg = 'Malagasy', ms = 'Malay', ml = 'Malayalam', mr = 'Marathi', mn = 'Mongolian',
  my = 'Myanmar (Burmese)', ne = 'Nepali', nb = 'Norwegian (Bokmål)', no = 'Norwegian', or = 'Odia (Oriya)',
  ps = 'Pashto', fa = 'Persian', pl = 'Polish', pt = 'Portuguese', ptBR = 'Portuguese (Brazil)',
  ptPT = 'Portuguese (Portugal)', pa = 'Punjabi', ro = 'Romanian', ru = 'Russian', gd = 'Scots Gaelic',
  sr = 'Serbian', sd = 'Sindhi', si = 'Sinhala', sk = 'Slovak', sl = 'Slovenian',
  so = 'Somali', es = 'Spanish', su = 'Sundanese', sw = 'Swahili', sv = 'Swedish',
  ta = 'Tamil', th = 'Thai', tr = 'Turkish', uk = 'Ukrainian', ur = 'Urdu',
  uz = 'Uzbek', vi = 'Vietnamese', cy = 'Welsh', xh = 'Xhosa', yi = 'Yiddish',
  yo = 'Yoruba', zu = 'Zulu',
}

export class Language {
	constructor(symbol: string) {
		this.symbol = symbol as LanguageSymbol

		const index = Object.keys(LanguagesEnum).indexOf(symbol)
		this.name = Object.values(LanguagesEnum)[index]
	}

	symbol: LanguageSymbol
	name: LanguagesEnum
}

export type LanguageSymbol =
  'af' | 'sq' | 'am' | 'ar' | 'hy' | 'az' | 'be' | 'bel' | 'bn' | 'bs' | 'bg' |
  'ca' | 'ceb' | 'zhCN' | 'zhTW' | 'hr' | 'cs' | 'da' | 'nl' | 'en' | 'et' | 'tl' |
  'fi' | 'fr' | 'fy' | 'gl' | 'ka' | 'de' | 'el' | 'gu' | 'ht' | 'ha' | 'he' |
  'hi' | 'hu' | 'is' | 'ig' | 'id' | 'ga' | 'it' | 'ja' | 'kn' | 'kk' | 'km' |
  'ko' | 'lo' | 'lv' | 'lt' | 'lb' | 'mk' | 'mg' | 'ms' | 'ml' | 'mr' | 'mn' |
  'my' | 'ne' | 'nb' | 'no' | 'or' | 'ps' | 'fa' | 'pl' | 'pt' | 'ptBR' | 'ptPT' |
  'pa' | 'ro' | 'ru' | 'gd' | 'sr' | 'sd' | 'si' | 'sk' | 'sl' | 'so' | 'es' |
  'su' | 'sw' | 'sv' | 'ta' | 'th' | 'tr' | 'uk' | 'ur' | 'uz' | 'vi' | 'cy' |
  'xh' | 'yi' | 'yo' | 'zu'