import React from "react"
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

import SwitchBoard from "../../../NativeModules/SwitchBoard"
import OpaqueImageView from "../../OpaqueImageView"
import Metadata from "./Metadata"

import { ArtistShow_show } from "__generated__/ArtistShow_show.graphql"

interface Props {
  show: ArtistShow_show
  styles?: {
    container?: ViewStyle
    image?: ViewStyle
    metadata?: ViewStyle
  }
}

class Show extends React.Component<Props> {
  handleTap() {
    SwitchBoard.presentNavigationViewController(this, this.props.show.href)
  }

  render() {
    const show = this.props.show
    const image = show.cover_image
    const imageURL = image && image.url

    const styles = this.props.styles

    return (
      <TouchableWithoutFeedback onPress={this.handleTap.bind(this)}>
        <View style={styles && styles.container}>
          <OpaqueImageView imageURL={imageURL} style={styles && styles.image} />
          <Metadata show={show as any} style={styles && styles.metadata} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default createFragmentContainer(
  Show,
  graphql`
    fragment ArtistShow_show on PartnerShow {
      href
      cover_image {
        url(version: "large")
      }
      ...Metadata_show
    }
  `
)
