export class POIHeader {
    title: string
    subtitle?: string
    image: string
    audio?: string

    constructor(title: string, image: string, subtitle?: string, audio?: string) {
        this.title = title
        this.image = image
        this.subtitle = subtitle
        this.audio = audio
    }
   
}