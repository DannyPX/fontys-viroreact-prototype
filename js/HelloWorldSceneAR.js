'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroMaterials,
  ViroSpotLight,
  ViroAnimations,
  ViroNode
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
          <Viro3DObject 
            source={require('./res/scene.gltf')}
            resources={[require('./res/scene.bin'),
                        require('./res/textures/mt_kart_Mario_S_baseColor.png'),
                        require('./res/textures/mt_Kart_Mario_Tire_S_baseColor.png'),
                        require('./res/textures/mt_mario_baseColor.png')]}
            position={[0, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            animation={{name: "rotate", run: true, loop: true}}
            type="GLTF"
          />
        </ViroNode>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} intensity={100}/>
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "HALLO JORRIT"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/guadalupe_360.jpg')
  }
})

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 450, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
