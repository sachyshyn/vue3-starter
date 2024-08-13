import { nextTick } from 'vue';
import { APP_DEFAULT_LOCALE, LOCALES } from '@/shared/i18n';
import type { i18n as TranslationInstance } from '@/shared/i18n';
import type { Locale, IStorageService } from '../../types';
import { PERSISTED_LOCALE_KEY } from '../../constants';
import { localeHelper } from './helper';

export class TranslationService {
  constructor(
    private readonly i18n: typeof TranslationInstance,
    private readonly storageService: IStorageService
  ) {}

  get defaultLocale(): Locale {
    return APP_DEFAULT_LOCALE;
  }

  get currentLocale(): Locale {
    return this.i18n.global.locale.value;
  }

  set currentLocale(locale: Locale) {
    this.i18n.global.locale.value = locale;

    this.updateLocaleSettings(locale);
  }

  get availableLocales(): Locale[] {
    return [...LOCALES];
  }

  isLocaleSupported(locale: Locale) {
    return this.availableLocales.includes(locale);
  }

  getCurrentInstance(): typeof TranslationInstance {
    return this.i18n;
  }

  async loadTranslationMessages(locale: Locale) {
    if (!this.i18n.global.availableLocales.includes(locale)) {
      const localeMessages = await localeHelper.loadTranslationMessages(locale);

      this.i18n.global.setLocaleMessage(locale, localeMessages);
    }

    await nextTick();
  }

  async switchLanguage(locale: Locale) {
    await this.loadTranslationMessages(locale);
    this.currentLocale = locale;
  }

  private getPersistedLocale() {
    return this.storageService.get<Locale>(PERSISTED_LOCALE_KEY);
  }

  private setPersistedLocale(locale: Locale) {
    this.storageService.set(PERSISTED_LOCALE_KEY, locale);
  }

  applyPersistedLocaleIfExists() {
    const locale = this.getPersistedLocale();
    const isLocaleSupported = !!locale && this.isLocaleSupported(locale);

    this.currentLocale = isLocaleSupported ? locale : this.defaultLocale;
  }

  private updateLocaleSettings(locale: Locale) {
    this.setPersistedLocale(locale);
    document.querySelector('html')?.setAttribute('lang', locale);
  }
}
