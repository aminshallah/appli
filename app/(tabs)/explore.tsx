import { Button, Text, View, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = '5f14c1ba69967f99837dc5f61f636b4c142aa818';
const CLIENT_SECRET = '5d8329e25822fd2399fb62d5596729b6f3c6fd23';
const TOKEN_KEY = "@access_token";
const REFRESH_TOKEN_KEY = "@refresh_token";

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'mywei',
  path: 'explore'
});

async function setToken(data) {
  const token = data.access_token;
  const tokenValidUntil = Date.now() + 1000 * data.expires_in;
  try {
    const tokenData = {
      'access_token': token,
      'expires_at': tokenValidUntil,
    }
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
  } catch (err) {
    console.log(err);
  }
}

async function setRefreshToken(data) {
  const refresh_token = data.refresh_token;
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
  } catch (err) {
    console.log(err);
  }
}

export default function App() {
  const [status, setStatus] = useState('Non connecté');
  const [tokenResponse, setTokenResponse] = useState(null);

  // Utilisation de l'endpoint token directement dans la configuration
  const discovery = {
    authorizationEndpoint: 'https://auth.viarezo.fr/oauth/authorize',
    tokenEndpoint: 'https://auth.viarezo.fr/oauth/token',
  };

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri,
      scopes: ['openid', 'profile'],
      responseType: "code",
      extraParams: {
        access_type: 'offline',
      },
    },
    discovery
  );

  useEffect(() => {
    if (result?.type === 'success') {
      const { code } = result.params;
      console.log("Code reçu:", code);
      exchangeCodeForToken(code);
    } else if (result) {
      console.log("Résultat de l'authentification:", result);
    }
  }, [result]);

  const exchangeCodeForToken = async (code) => {
    try {
      setStatus('Échange du code...');
      console.log('Début échange code...');

      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          code,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          redirectUri,
          extraParams: {
            grant_type: 'authorization_code',
          },
        },
        discovery
      );

      console.log('Réponse token:', tokenResult);
      
      if (tokenResult.accessToken) {
        await setToken(tokenResult);
        await setRefreshToken(tokenResult);
        setTokenResponse(tokenResult);
        setStatus('Connecté avec succès!');
      } else {
        setStatus('Erreur: Pas de token reçu');
      }
    } catch (error) {
      console.error('Erreur échange token:', error);
      setStatus(`Erreur: ${error.message}`);
    }
  };

  const checkExistingToken = async () => {
    try {
      const tokenDataStr = await AsyncStorage.getItem(TOKEN_KEY);
      if (!tokenDataStr) {
        setStatus('Aucun token existant');
        return;
      }

      const tokenData = JSON.parse(tokenDataStr);
      const tokenValidUntil = tokenData.expires_at;

      if (Date.now() > tokenValidUntil) {
        setStatus('Token expiré, connexion nécessaire');
      } else {
        setStatus(`Token valide trouvé: ${tokenData.access_token.slice(0, 20)}...`);
      }
    } catch (error) {
      setStatus(`Erreur: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
      setTokenResponse(null);
      setStatus('Déconnecté');
    } catch (error) {
      setStatus(`Erreur lors de la déconnexion: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Se connecter" 
          disabled={!request} 
          onPress={() => promptAsync({ useProxy: false })} 
        />
        <Button 
          title="Vérifier le token" 
          onPress={checkExistingToken} 
        />
        <Button 
          title="Se déconnecter" 
          onPress={logout} 
          color="red"
        />
      </View>
      {tokenResponse && (
        <Text style={styles.tokenInfo}>
          Token reçu: {tokenResponse.accessToken.slice(0, 20)}...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  tokenInfo: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
  },
});