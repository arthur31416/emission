import React from "react"
import {
  ActivityIndicator,
  Image,
  ImageURISource,
  Text,
  TextInput,
  TextInputProperties,
  View,
  ViewProperties,
} from "react-native"

import { Colors } from "lib/data/colors"
import { Fonts } from "lib/data/fonts"
import styled from "styled-components/native"

interface ReffableTextInputProps extends TextInputProperties {
  ref?: (component: any) => any
}

export interface TextInputProps extends ViewProperties {
  searching?: boolean
  readonly?: boolean
  text?: ReffableTextInputProps
  preImage?: ImageURISource | ImageURISource[]
}

const Input = styled.TextInput`
  height: 40;
  background-color: black;
  color: white;
  font-family: "${Fonts.GaramondRegular}";
  font-size: 20;
  flex: 1;
`

const Separator = styled.View`
  background-color: white;
  height: 1;
`

const WritableInput = (props: TextInputProps) =>
  <Input
    autoCorrect={false}
    clearButtonMode="while-editing"
    keyboardAppearance="dark"
    placeholderTextColor={Colors.GraySemibold}
    selectionColor={Colors.GrayMedium}
    {...props.text}
  />

const ReadOnlyInput = (props: TextInputProps) =>
  <Text
    style={{
      color: props.text.value ? Colors.White : Colors.GraySemibold,
      fontFamily: Fonts.GaramondRegular,
      fontSize: 20,
      paddingTop: 8,
    }}
  >
    {props.text.value || props.text.placeholder}
  </Text>

const render = (props: TextInputProps) =>
  <View style={[props.style, { flex: 1, maxHeight: 40 }]}>
    <View style={{ flexDirection: "row", height: 40 }}>
      {props.preImage && <Image source={props.preImage} style={{ marginRight: 6, marginTop: 12 }} />}
      {props.readonly ? ReadOnlyInput(props) : WritableInput(props)}

      {props.searching ? <ActivityIndicator animating={props.searching} /> : null}
    </View>
    <Separator />
  </View>

export default render
