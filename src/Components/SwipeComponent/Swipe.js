import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  PanResponder,
  Dimensions,
  Animated,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { Card } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'id',
  };

  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this.position = new Animated.ValueXY();
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    });
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.data !== this.props.data) {
  //     this.setState({
  //       index: 0,
  //     });
  //   }
  // }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data, addNewMatch } = this.props;
    const item = data[this.state.index];
    // let [key, value] = data;
    // console.log(JSON.stringify(item[0]));

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    direction === 'right' ? addNewMatch(item[0]) : null;
    this.position.setValue({ x: 0, y: 0 });
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
    this.setState({ index: this.state.index + 1 });
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => this.onSwipeComplete(direction));
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }

  getCardStyle() {
    const { position } = this;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  }

  // renderCardItem = ([key, user], i) => {
  //   if (!this.props.data.length) {
  //     return this.props.renderNoMoreCards();
  //   }
  //   return i === 0 ? (
  //     <Animated.View
  //       key={key}
  //       style={this.getCardStyle()}
  //       {...this._panResponder.panHandlers}
  //     >
  //       {this.props.renderCard([key, user])}
  //     </Animated.View>
  //   ) : (
  //     <View key={key}>{this.props.renderCard([key, user], i)}</View>
  //   );
  // };

  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map(([key, user], i) => {
      if (i < this.state.index) {
        return null;
      }

      if (i === this.state.index) {
        return (
          <Animated.View
            key={key}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this._panResponder.panHandlers}
          >
            {this.props.renderCard([key, user])}
          </Animated.View>
        );
      }

      return (
        <View
          key={key}
          style={[styles.cardStyle, { top: 20 * (i - this.state.index) }]}
        >
          {this.props.renderCard([key, user])}
        </View>
      );
    });
  };

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 50,
    marginBottom: 10,
  },
  cardStyle: {
    // position: 'absolute',
    // height: 100,
    // marginTop: 100,
    width: SCREEN_WIDTH,
  },
};

export default Swipe;
