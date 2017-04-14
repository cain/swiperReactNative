/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import Dimensions from 'Dimensions';
export default class swiperReactNative extends Component {

  state = {x: 0,
        y: 0, position: 'none' };
  setPosition = (e) => {
    //Update our state with the deltaX/deltaY of the movement
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
      y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
    });
    const x = this.state.x;
    const y = this.state.y;
    let left = false;
    let right = false;

    if(x > 30 && y < 80 && y > -80 ) {
      right = true;
      this.setState({ position: 'right'})
    }
    if(x < -30 && y < 80 && y > -80 ) {
      left = true;
      this.setState({ position: 'left'})

    }

    if(y < -40 && !left && !right) {
      this.setState({ position: 'top'})

    }

    if(y > 40 && !left && !right) {
      this.setState({ position: 'bottom'})
    }
    if(y < 40 && y > -40 && x < 30 && x > -30) {
      this.setState({ position: 'none'})
    }


    //Set our drag to be the new position so our delta can be calculated next time correctly
    this.drag.x = e.nativeEvent.pageX;
    this.drag.y = e.nativeEvent.pageY;
  };
  resetPosition = (e) => {
    this.dragging = false;

    if(this.state.position !== 'none') {
      alert(this.state.position);
    }
    this.setState({ position: 'none' })

    //Reset on release
    this.setState({
      x: 0,
      y: 0,
    })
  };

  getRotationDegree = (rotateTop, x) => {
    var windowSize = Dimensions.get('window');

    var rotation = ( (x/windowSize.width) * 100)/3;
    var rotate = rotateTop ? 1 : 1,
        rotateString = (rotation * rotate) + 'deg';
    return rotateString;
  };

  _onStartShouldSetResponder = (e) => {
    this.dragging = true;
   this.rotateTop = e.nativeEvent.locationY <= 150;
   this.drag = {
     x: e.nativeEvent.pageX,
     y: e.nativeEvent.pageY
   }
   return true;
  };

  _onMoveShouldSetResponder = (e) => {
    return true;
  };
  getCardStyle = () => {

    var transform = [{translateX: this.state.x}, {translateY: this.state.y}];
    if (this.dragging) {
        transform.push({rotate: this.getRotationDegree(this.rotateTop, this.state.x)});

    }
    return {transform: transform};
  }

  getCircleStyle = () => {
    if(this.state.position === 'left')
    {
      return {opacity: 1, left: -470 - this.state.x };
    }

    if(this.state.position === 'right')
    {
      return {opacity: 1, right: -470 + this.state.x };
    }

    if(this.state.position === 'top')
    {
      return {opacity: 1, top: -500 - this.state.y, backgroundColor: '#4683F5' };
    }

    if(this.state.position === 'bottom')
    {
      return {opacity: 1, bottom: -500 + this.state.y, backgroundColor: '#F5465F' };
    }
  };

  render() {
    console.log(this.state.position);
    return (
      <View style={styles.container}>
        <View
           onResponderMove={this.setPosition}
           onResponderRelease={this.resetPosition}
           onStartShouldSetResponder={this._onStartShouldSetResponder}
           onMoveShouldSetResponder={this._onMoveShouldSetResponder}
           style={[styles.card, this.getCardStyle()]}
         >
           <View style={[styles.leftCircle, this.getCircleStyle()]}>
             <Image style={[styles.icon, this.state.position === 'top' ? { bottom: 20 } : { top: 20 }]} source={this.state.position === 'bottom' ? require('./w.png') : require('./love.png')} />
           </View>
           <Image style={styles.image} source={require('./s.jpg')} />
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  leftCircle: {
    height: 500,
    backgroundColor: '#F1EDE9',
    position: 'absolute',
    opacity: 0,
    borderRadius: 250,
    width: 500,
    zIndex: 1,
  },
  icon: {
    zIndex: 2,
    height: 30,
    width: 30,
    left: '50%',
    right: '50%',
    marginLeft: -15,


  },
  card: {
    position: 'relative',
    backgroundColor: 'grey',
    width: '100%',
    height: '80%',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('swiperReactNative', () => swiperReactNative);
