import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { useState, useEffect } from 'react';

//MAKE AN EXAMPLE INTERSTITIAL AD
const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true
});

//MAKE AN EXAMPLE INTERSTITIAL AD WITH A REWARD
const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(TestIds.REWARDED_INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true
});

//EMPTY ELEMENT FOR SPACING
const Separator = () => <View style={styles.separator} />;

export default function App() {

  const [interstitialLoaded, setInterstitialLoaded] = useState(false)
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false)
  const [rewardCount, setRewardCount] = useState(0)

  //function for loading the interstitial ad
  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true)
      }
    )

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false)
        interstitial.load()
      }
    )

    interstitial.load()

    return () => {
      unsubscribeClosed()
      unsubscribeLoaded()
    }
  }

  //FUNCTION FOR LOADING THE INTERSTITIAL AD WITH A REWARD
  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true)
      }
    )

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        setRewardCount(prevCount => prevCount + reward.amount)
      }
    )

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false)
        rewardedInterstitial.load()
      }
    )

    rewardedInterstitial.load()

    return () => {
      unsubscribeLoaded()
      unsubscribeClosed()
      unsubscribeEarned()
    }
  }

  useEffect(() => {
    const unsubscribeInterstitialEvents = loadInterstitial()
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

    return () => {
      unsubscribeInterstitialEvents();
      unsubscribeRewardedInterstitialEvents();
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.container}>
       {interstitialLoaded ? <Button style={styles.addButton} title='Show an Interstitial' onPress={() => interstitial.show()} /> : <Text style={styles.loadText}>Loading Interstitial...</Text> }
       <Separator />
       {rewardedInterstitialLoaded ? <Button style={styles.addButton} title='Show a Rewarded Interstitial' onPress={() => rewardedInterstitial.show()} /> : <Text style={styles.loadText}>Loading Interstitial With a Reward...</Text> }
       <Text style={styles.rewardText}>Your Reward Count: {rewardCount}</Text>
      </View>
      
      <BannerAd
        style={styles.footer}
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
      
      <StatusBar style="auto" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadText: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 25
  },
  rewardText: {
    fontWeight: 'bold',
    fontSize: 15,
    margin: 25
  },
  separator: {
    marginVertical: 10
  },
});
