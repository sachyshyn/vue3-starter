import { type App } from 'vue';
import { LOCALES } from './constants';

export type Application = App<Element>;

export type Locale = (typeof LOCALES)[number];
export type LocaleMessage = Record<Locale, any>;
