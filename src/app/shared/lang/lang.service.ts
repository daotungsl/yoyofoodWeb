import { Injectable } from '@angular/core';
import {EN_LANG} from './en.lang';
import {VI_LANG} from './vi.lang';

export enum SupportedLang {
  en = 'en',
  vi = 'vi'
}

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private resource = {
    [SupportedLang.en]: EN_LANG,
    [SupportedLang.vi]: VI_LANG,
  };

  selectedLang;
  constructor() {
    const lang = localStorage.getItem('lang') as any || SupportedLang.en;
    this.use(lang);
  }

  use(lang: SupportedLang) {
    this.selectedLang = this.resource[lang];
    localStorage.setItem('lang', lang);
  }

  tran(key: string) {
    return this.selectedLang[key] || key;
  }
}
