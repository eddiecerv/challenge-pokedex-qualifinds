import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View, Text
} from 'react-native';
import RangeSlider from '@m15r/react-native-range-slider';
//import RangeSlider from 'react-native-range-slider';

const Range = (props)  => {

  const handleChange = (values) => {
    // Your logic
    console.log('Handling:', values);
  }

  return (
    <View style={styles.gridView}>
        <View style={styles.rangeContainer}>
            <RangeSlider range={[0,180]} defaultValues={[0,props.baseStat]} onChange={handleChange} barStyle={styles.background} fillStyle={styles.fill} />
        </View>
        <View style={styles.statContainer}>
            <Text style={styles.text}>{props.baseStat}</Text>
        </View>
    </View>
  )

}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#cccccc"
    },
    fill: {
        backgroundColor: "#3F9AFD"
    },
    gridView: {
        flexDirection: "row",
    },
    rangeContainer: {
        justifyContent: 'flex-start',
        flex: 0.7,
        textAlignVertical: 'top'
    },
    statContainer: {
        justifyContent: 'flex-start',
        flex: 0.3,
        textAlignVertical: 'top',
        paddingRight: 10
    },
    text: {
        textAlign: "right"
    }
});

export default Range;