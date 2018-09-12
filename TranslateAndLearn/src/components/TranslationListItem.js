import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import WrapperButton from './Button';
import { TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../Constants';
import ArrorRight from '../../assets/ArrowRight.png';

const WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = WIDTH * 0.4;
const TOUCH_THRESHOLD = 15;
class TranslationListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.gestureDelay = 15;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;

        return Math.abs(dx) > TOUCH_THRESHOLD;
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.setScrollViewEnabled(false);
        let newX = gestureState.dx - this.gestureDelay;
        position.setValue({ x: newX, y: 0 });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) < SWIPE_THRESHOLD) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: 0 },
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.position, {
            toValue: { x: gestureState.dx > 0 ? WIDTH : -WIDTH, y: 0 },
            duration: 300,
          }).start(() => {
            this.props.success(this.props.item.id);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.position = position;
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  render() {
    const { item } = this.props;
    return (
      <Animated.View
        style={[this.position.getLayout()]}
        {...this.panResponder.panHandlers}
      >
        <WrapperButton
          style={styles.listItem}
          onPress={() => {
            console.log('press Button');
            this.props.navigation.navigate('translationDetail', {
              translation: item,
            });
          }}
        >
          <View
            style={{
              justifyContent: 'space-around',
              paddingVertical: 5,
              flex: 3,
            }}
          >
            <Text style={{ fontSize: 18, color: SECONDARY_TEXT_COLOR }}>
              {item.lang.from}
            </Text>
            <Text
              style={{ fontSize: 18, color: TEXT_COLOR }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.input}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
              marginRight: 10,
            }}
          >
            <Image
              source={ArrorRight}
              style={{
                width: 30,
                resizeMode: 'center',
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'space-around',
              paddingVertical: 5,
              flex: 3,
            }}
          >
            <Text style={{ fontSize: 18, color: SECONDARY_TEXT_COLOR }}>
              {item.lang.to}
            </Text>
            <Text
              style={{ fontSize: 18, color: TEXT_COLOR }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.output}
            </Text>
          </View>
        </WrapperButton>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
  },
});

export default withNavigation(TranslationListItem);
