import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header' ;
import Map from '@/components/Map';

export default function Maps (){
  return (
    <ThemedView>
      <Header />
      <ThemedText>C'est la carte c'est la carte</ThemedText>
      <Map />
    </ThemedView>


  )
}