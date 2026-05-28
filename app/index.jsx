import { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1, duration: 3000, useNativeDriver: false,
    }).start();
    const timer = setTimeout(() => { router.replace('/(auth)/login'); }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1], outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.waveBg}>
        <View style={styles.waveTop} />
        <View style={styles.waveBottom} />
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../src/assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.logoShadow} />
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      </View>
      <View style={styles.starContainer}>
        <Animated.Text style={styles.star}>✧</Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveBg: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  waveTop: {
    position: 'absolute',
    top: -80,
    left: -60,
    width: width * 1.2,
    height: 320,
    backgroundColor: '#7C3AED',
    opacity: 0.15,
    borderRadius: 160,
    transform: [{ rotate: '-12deg' }],
  },
  waveBottom: {
    position: 'absolute',
    bottom: -80,
    right: -60,
    width: width * 1.2,
    height: 320,
    backgroundColor: '#7C3AED',
    opacity: 0.1,
    borderRadius: 160,
    transform: [{ rotate: '-12deg' }],
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 96,
    height: 96,
  },
  logoShadow: {
    width: 80,
    height: 12,
    backgroundColor: '#7C3AED',
    opacity: 0.15,
    borderRadius: 40,
    marginTop: 8,
  },
  progressContainer: {
    width: width * 0.6,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 2,
  },
  starContainer: {
    position: 'absolute',
    bottom: 60,
  },
  star: {
    fontSize: 28,
    color: '#7C3AED',
    opacity: 0.6,
  },
});
