import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function YouTubeScreen({ route }) {
    const { videoId } = route.params;
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    console.log("videoId:", videoId + " tää on Youtuben puolella testi");

    return (
      <WebView
      style={styles.webview}
      javaScriptEnabled={true}
      source={{ uri: videoUrl }}
      />
    );
}

const styles = StyleSheet.create({
    webview: {
      flex: 1,
      alignSelf: 'stretch',
      height: 300,
    },
});