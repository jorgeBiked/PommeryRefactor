import { language } from './Constants';
import * as data from '../localisations/app.json';

export function locale(key: string): string {
  return data[language][key]
}