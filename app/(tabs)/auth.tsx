import { Image, StyleSheet,  } from 'react-native';
import {useState, useEffect} from 'react';
import { Button, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'mywei',
  path: 'explore',
});

export default function App() {
  const discovery = AuthSession.useAutoDiscovery('https://moncompte.viarezo.fr');

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '5f14c1ba69967f99837dc5f61f636b4c142aa818',
      redirectUri,
      scopes: ['openid', 'profile'],
    },
    discovery
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Login!"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
