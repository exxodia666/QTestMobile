import React from 'react'
import { Dimensions, Image } from 'react-native'

type ImageComponentTypes = {
    image: string
}

const ImageComponent: React.FC<ImageComponentTypes> = ({ image }) => {
    return (
        <Image
            style={{
                borderBottomWidth: 1,
                //borderBottomRightRadius: 15,
                width: Dimensions.get('screen').width,
                minHeight: 240
            }}
            source={{ uri: image }}
        />
    )
}

export default ImageComponent
