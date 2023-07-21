import { POIHeader } from './POIHeader'
import { SectionParams } from './POISection'
import { POIGeography } from './POIGeography'

export class POI { 
    header: POIHeader
    sections: SectionParams[] = []
    thumbnail: string
    geography?: POIGeography
    
    constructor(header: POIHeader, sections: SectionParams[], thumbnail: string, geography?: POIGeography) {
        this.header = header
        this.sections = sections
        this.thumbnail = thumbnail
        this.geography = geography
    }
   
}