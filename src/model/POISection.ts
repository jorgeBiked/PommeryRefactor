import { POITagCloud } from './POITagCloud';
import { POIQuote } from './POIQuote';

export interface SectionParams {
    index?: string
    title?: string
    contentText?: string
    footerText?: string
    images?: string[]
    quote?: POIQuote
    tagCloud?: POITagCloud
}