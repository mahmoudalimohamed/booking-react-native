import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[
        styles.container,
        { backgroundColor: isDark ? '#000' : '#fff' }
      ]}>
        <Text style={[
          styles.title,
          { color: isDark ? '#fff' : '#000' }
        ]}>
          This screen does not exist.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#0a7ea4',
    lineHeight: 30,
  },
}); 