import {Asset} from 'expo-asset';
Asset;

const AudioFr = (name: string) => {

    switch (name) {
        case 'notre_histoire':
            return Asset.fromModule(require('./introduction/fr/notre_histoire.mp3'))
        case 'le_domaine_pommery':
            return Asset.fromModule(require('./introduction/fr/le_domaine_pommery.mp3'))
        case 'architecture':
            return Asset.fromModule(require('./introduction/fr/architecture.mp3'))
        case 'la_villa_demoiselle':
            return Asset.fromModule(require('./introduction/fr/la_villa_demoiselle.mp3'))
        case 'le_clos_pompadour':
            return Asset.fromModule(require('./introduction/fr/le_clos_pompadour.mp3'))
        case 'le_cellier_carnot':
            return Asset.fromModule(require('./introduction/fr/le_cellier_carnot.mp3'))
        case 'le_foudre_emile_galle':
            return Asset.fromModule(require('./introduction/fr/le_foudre_emile_galle.mp3'))
        case 'the_spirit_of_the_grape':
            return Asset.fromModule(require('./introduction/fr/the_spirit_of_the_grape.mp3'))
        case 'wursa':
            return Asset.fromModule(require('./introduction/fr/wursa.mp3'))
        case 'le_grand_escalier':
            return Asset.fromModule(require('./pois/fr/le_grand_escalier.mp3'))
        case 'les_maraudeurs':
            return Asset.fromModule(require('./pois/fr/les_maraudeurs.mp3'))
        case 'galerie_veuve_pommery':
            return Asset.fromModule(require('./pois/fr/galerie_veuve_pommery.mp3'))
        case 'crayere_notre_dame':
            return Asset.fromModule(require('./pois/fr/crayere_notre_dame.mp3'))
        case 'galerie_liverpool':
            return Asset.fromModule(require('./pois/fr/galerie_liverpool.mp3'))
        case 'elaboration_du_champagne_pommery':
            return Asset.fromModule(require('./pois/fr/elaboration_du_champagne_pommery.mp3'))
        case 'galerie_manchester':
            return Asset.fromModule(require('./pois/fr/galerie_manchester.mp3'))
        case 'histoire_des_crayeres':
            return Asset.fromModule(require('./pois/fr/histoire_des_crayeres.mp3'))
        case 'stockholm_oslo':
            return Asset.fromModule(require('./pois/fr/stockholm_oslo.mp3'))
        case 'silene':
            return Asset.fromModule(require('./pois/fr/silene.mp3'))
        case 'le_champagne_au_18eme_siecle':
            return Asset.fromModule(require('./pois/fr/le_champagne_au_18eme_siecle.mp3'))
        case 'fete_de_bacchus':
            return Asset.fromModule(require('./pois/fr/fete_de_bacchus.mp3'))
        case 'crayere_louise':
            return Asset.fromModule(require('./pois/fr/crayere_louise.mp3'))
        case 'oenotheque':
            return Asset.fromModule(require('./pois/fr/oenotheque.mp3'))
    } 

}

export default AudioFr