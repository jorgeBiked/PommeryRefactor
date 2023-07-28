// @ts-nocheck	
import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {  globalStyles, colors, fonts, fontSizes } from '../../styles';
import { View } from 'native-base';
import { SectionParams } from '../../model/POISection';
import { POIQuote } from '../../model/POIQuote';
import { POITagCloud } from '../../model/POITagCloud';
import ParsedText from 'react-native-parsed-text';
import Image from 'react-native-scalable-image';
import Images from '../../images/images';

interface Props {
  section: SectionParams
}

interface Style {
    title: TextStyle
    imageView: ViewStyle
    image: ViewStyle
    orange: TextStyle
    bold: TextStyle
    tagsView: ViewStyle
    tagView: ViewStyle
    tag: TextStyle
    indexSeparator: ViewStyle
    separator: ViewStyle
}

const SectionComponent = ({ section }) => {

    let title = null, index = null, contentText = null, footerText = null,
    images = null, quote = null, tagCloud = null;

    const _renderQuote = (quote: POIQuote) => {
        let author
        if (quote.author) {
            author = <Text style={globalStyles.quote_author}>{quote.author}</Text>
        }
        return (
            <View>
                <Text style={globalStyles.quote}>{quote.text}</Text>
                {author}
            </View>
        )
    }

    const _renderTagCloud = (tagCloud: POITagCloud) => {
        let tags = tagCloud.tags.map((tag, i) =>
            <View key={tag} style={styles.tagView}>
                <Text style={styles.tag}>{tag}</Text>
                <Text style={[styles.tag, (i === tagCloud.tags.length - 1) ? {display: 'none'} : {display: 'flex'}]}> - </Text>
            </View>
        )
        return (
            <View>
                <View style={[styles.separator, {height: 52}]}></View>
                <Text style={globalStyles.title}>{tagCloud.title}</Text>
                <View style={styles.tagsView}>
                    {tags}    
                </View>
            </View>
        )
    }

    const _renderBoldText = (matchingString: string) => {
        let match = matchingString.replace(/<bold>/g, "")
        match = match.replace(/<\/bold>/g, "")
        return match
    }

    const _renderColorText = (matchingString: string) => {
        let match = matchingString.replace(/<orange>/g, "")
        match = match.replace(/<\/orange>/g, "")
        return match
    }

    if (section) {

        if (section.title) {
            title = <Text style={[globalStyles.title, styles.title]}>{section.title}</Text>
        }

        if (section.index) {
            index = (
                <View style={[styles.indexSeparator, {height: 29}]}>
                    <Text style={globalStyles.index}>{section.index}</Text>
                </View>
            )
        }

        if (section.contentText) {
            contentText = (
                <ParsedText
                    style={globalStyles.paragraph}
                    parse={
                    [
                        {pattern: /<orange>[\w\W]*?<\/orange>/, style: styles.orange, renderText: _renderColorText},
                        {pattern: /<bold>[\w\W]*?<\/bold>/, style: styles.bold, renderText: _renderBoldText}
                    ]
                    }
                    childrenProps={{allowFontScaling: false}}>
                    {section.contentText}
                </ParsedText>
            )
        }
        if (section.images) { 
            images = section.images.map(image =>   
                <View key={String(image)} style={styles.imageView}>
                    <Image style={[styles.image]} resizeMode="contain" resizeMethod="resize" source={Images(image)} />
                </View>
            )
        }
        
        if (section.footerText) {
            footerText = <Text style={globalStyles.footerText}>{section.footerText}</Text>
        }

        if (section.quote) {
            quote = _renderQuote(section.quote)
        }

        if (section.tagCloud) {
            tagCloud = _renderTagCloud(section.tagCloud)
        }

        return (
            <View>
                {title}
                {index}
                {contentText}
                {images}
                {footerText}
                {quote}
                {tagCloud}
            </View>
        )
    } else {
        return <Text>No info</Text>
    }
}

const styles = StyleSheet.create<Style>({
    title: {
        marginRight: 40,
        marginLeft: 40,
    },
    imageView: {
        marginHorizontal: 40,
        marginVertical: 20
    },
    image: {
        alignSelf: 'center',
        width: '100%',
        height: 'auto',
        minHeight: 200,
    },
    orange: {
        fontFamily: fonts.primary_bold,
        color: colors.secondaryColor
    },
    bold: {
        fontFamily: fonts.primary_bold
    },
    tagsView: {
        flex: 1,
        margin: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start',
        justifyContent: 'center'
    },
    tagView: {
        flex: 0,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-evenly'
    },
    tag: {
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: fonts.primary,
        fontSize: fontSizes.small,
        color: colors.gray,
        lineHeight: 40
    },
    indexSeparator: {
        borderLeftColor: colors.secondaryColor,
        borderLeftWidth: 1,
        marginLeft: 40
    },
    separator: {
        alignSelf: 'center',
        backgroundColor: colors.secondaryColor,
        width: 1,
        marginTop: 20,
        marginBottom: 40,
        opacity: 0.6
    }
})

const mapStateToProps = (state: any, {}) => {
    return { poi: state.poi
    }
}

export default SectionComponent
