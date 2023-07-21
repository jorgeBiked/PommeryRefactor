import { language } from '../../../utilities/Constants'
import * as data from '../../../localisations/map.json'
import { pommery_geography } from './map-poi-geography'
import { createPOI } from '../../common/content';

export const poi_escalier = createPOI(
    (<any>data)[language].poi_escalier, 
    pommery_geography.poi_escalier)

export const poi_maradeurs = createPOI(
    (<any>data)[language].poi_maradeurs, 
    pommery_geography.poi_maradeurs)

export const poi_veuve_pommery = createPOI(
    (<any>data)[language].poi_veuve_pommery, 
    pommery_geography.poi_veuve_pommery)

export const poi_notre_dame = createPOI(
    (<any>data)[language].poi_notre_dame, 
    pommery_geography.poi_notre_dame)

export const poi_liverpool = createPOI(
    (<any>data)[language].poi_liverpool, 
    pommery_geography.poi_liverpool)

export const poi_elaboration = createPOI(
    (<any>data)[language].poi_elaboration, 
    pommery_geography.poi_elaboration)

export const poi_manchester = createPOI(
    (<any>data)[language].poi_manchester, 
    pommery_geography.poi_manchester)

export const poi_crayeres = createPOI(
    (<any>data)[language].poi_crayeres, 
    pommery_geography.poi_crayeres)

export const poi_stockholm_olso = createPOI(
    (<any>data)[language].poi_stockholm_olso, 
    pommery_geography.poi_stockholm_olso)

export const poi_silene = createPOI(
    (<any>data)[language].poi_silene, 
    pommery_geography.poi_silene)

export const poi_champagne = createPOI(
    (<any>data)[language].poi_champagne, 
    pommery_geography.poi_champagne)

export const poi_fete_bacchus = createPOI(
    (<any>data)[language].poi_fete_bacchus, 
    pommery_geography.poi_fete_bacchus)

export const poi_louise = createPOI(
    (<any>data)[language].poi_louise, 
    pommery_geography.poi_louise)

export const poi_oenotheque = createPOI(
    (<any>data)[language].poi_oenotheque, 
    pommery_geography.poi_oenotheque)
    