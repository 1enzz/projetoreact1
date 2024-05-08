import React from "react"
import { TouchableOpacity, Image } from "react-native"

const BtnVoltar = ({onPress}) =>{
    return(
        <TouchableOpacity onPress={onPress}>
            <Image source={require('../assets/211618_c_left_arrow_icon.png')}></Image>
        </TouchableOpacity>
    )
}


export default BtnVoltar;