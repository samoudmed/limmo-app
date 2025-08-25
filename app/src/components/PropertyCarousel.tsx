import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

export default function PropertyCarousel({ photos }: { photos: { photo: string }[] }) {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={width}
        height={250}
        data={photos}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            source={{ uri: `https://limmobilier.tn/uploads/photos/848x682/webp/${item.photo}.webp` }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
});
