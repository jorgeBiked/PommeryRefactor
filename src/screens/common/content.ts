import { Bootle } from '../../model/Bootle';
import { SectionParams } from '../../model/POISection';
import { POITagCloud } from '../../model/POITagCloud';
import { POIQuote } from '../../model/POIQuote';

import { POI } from '../../model/POI'
import { POIHeader } from '../../model/POIHeader';
import { POIGeography } from '../../model/POIGeography';

export function createPOI(poi: any, geography?: any) {

    var sections: SectionParams[] = []

    sections = poi.sections.map((section: any) => {
        return createSection(section)
    })

    const poiGeography = geography !== undefined ? 
        new POIGeography(geography.x, geography.y, geography.thumbnail_x, geography.thumbnail_y)
        : undefined

    return new POI(
        new POIHeader(
            poi.header.title, 
            poi.header.image,
            poi.header.subtitle,
            poi.header.audio
        ),      
        sections,  
        poi.thumbnail,
        poiGeography
    )
}

export function createBootle(bootle: any): Bootle {

    var sections: SectionParams[] = []

    return {
        title: bootle.header.title,
        text: bootle.header.text,
        thumbnail: bootle.thumbnail,
        images: bootle.header.images
    }

}

function createSection(sectionJSON: any): SectionParams {
    var section: SectionParams = {}
    
    if (sectionJSON.title !== undefined) {
        section.title = sectionJSON.title
    }
    if (sectionJSON.index !== undefined) {
        section.index = sectionJSON.index
    }
    if (sectionJSON.contentText !== undefined) {
        section.contentText = sectionJSON.contentText
    }
    if (sectionJSON.footerText !== undefined) {
        section.footerText = sectionJSON.footerText
    }
    if (sectionJSON.images !== undefined) {
        section.images = sectionJSON.images
    }
    if (sectionJSON.quote !== undefined) {
        section.quote = new POIQuote(
            sectionJSON.quote.author, 
            sectionJSON.quote.text
        ) 
    }
    if (sectionJSON.tagCloud !== undefined) {
        section.tagCloud = new POITagCloud(
            sectionJSON.tagCloud.title,
            sectionJSON.tagCloud.tags
        )
    }

    return section
}
