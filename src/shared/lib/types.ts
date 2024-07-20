import { type App } from 'vue';
import { LOCALES } from '../config';

export type Application = App<Element>;

export type Locale = (typeof LOCALES)[number];
export type LocaleMessages = Record<Locale, any>;
