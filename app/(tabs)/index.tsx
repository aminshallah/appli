import {
  ActivityIndicator,
  StyleSheet,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState, useContext } from "react";
import Home from '@/components/Home'
import UserProvider, {UserContext} from '@/contexts/UserContext'


WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
});


const clientId = "5f14c1ba69967f99837dc5f61f636b4c142aa818";

export function generateShortUUID() {
  return Math.random().toString(36).substring(2, 15);
}
export default function App(){
  return(
    <AppContent />

  )
}
export  function AppContent() {
  const [accessToken, setAccessToken] = useState<string>();
  const [idToken, setIdToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [userInfo, setUserInfo] = useState<any>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const [statut, setStatut] = useState<boolean>(false)
  const {user,setUser} = useContext(UserContext)

  const [discoveryResult, setDiscoveryResult] =
    useState<AuthSession.DiscoveryDocument>();

  // Fetch OIDC discovery document once
  useEffect(() => {
    const getDiscoveryDocument = async () => {
      const discoveryDocument = await AuthSession.fetchDiscoveryAsync(
        'https://moncompte.viarezo.fr'
      );
      setDiscoveryResult(discoveryDocument);
    };
    getDiscoveryDocument();
  }, []);

  console.log(discoveryResult);

  const login = async () => {
    const state = generateShortUUID();
    // Get Authorization code
    const authRequestOptions: AuthSession.AuthRequestConfig = {
      responseType: AuthSession.ResponseType.Code,
      clientId,
      redirectUri: redirectUri,
      prompt: AuthSession.Prompt.Login,
      scopes: ["openid", "profile", "email", "offline_access"],
      state: state,
      usePKCE: true,
    };
    const authRequest = new AuthSession.AuthRequest(authRequestOptions);
    const authorizeResult = await authRequest.promptAsync(discoveryResult!, {
      useProxy: true,
    });

    if (authorizeResult.type === "success") {
      // If successful, get tokens
      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          code: authorizeResult.params.code,
          clientId: clientId,
          redirectUri: redirectUri,
          extraParams: {
            code_verifier: authRequest.codeVerifier || "",
          },
        },
        discoveryResult!
      );

      setAccessToken(tokenResult.accessToken);
      setIdToken(tokenResult.idToken);
      setRefreshToken(tokenResult.refreshToken);

      const infos =  await AuthSession.fetchUserInfoAsync(
        {
          accessToken: tokenResult.accessToken,
        },
        discoveryResult!
      );
      console.log(infos);
      setUserInfo(infos);
      setLastName(infos.last_name);
      setFirstName(infos.first_name);
      setAvatar(infos.avatar)
      const newUser = {
        firstName: infos.first_name,
        lastName: infos.last_name,
        avatar: infos.avatar
      };

      setUser(newUser);
      console.log("User data set:", {
        firstName : infos.first_name,
        lastName : infos.last_name,
        avatar : infos.avatar
      });
      console.log("TEst context:", {
        firstName : user.firstName,
        lastName : user.lastName,
        avatar : user.avatar
      });
      


    }
  };

  const refresh = async () => {
    const refreshTokenObject: AuthSession.RefreshTokenRequestConfig = {
      clientId: clientId,
      refreshToken: refreshToken,
    };
    const tokenResult = await AuthSession.refreshAsync(
      refreshTokenObject,
      discoveryResult!
    );

    setAccessToken(tokenResult.accessToken);
    setIdToken(tokenResult.idToken);
    setRefreshToken(tokenResult.refreshToken);
  };

  const logout = async () => {
 {
      setAccessToken(undefined);
      setIdToken(undefined);
      setRefreshToken(undefined);
    }
  };

  if (!discoveryResult) return <ActivityIndicator />;

  return (

    <View style={styles.container} >
      {accessToken ? (<Home />
      ) : (
        <View style={{ flex: 1, width: "100%" }}>
          {/* Texte centré en haut */}
          <View style={styles.header}>
            <Text style={styles.welcome}>Bienvenue sur l'application du WEI 2025</Text>
          </View>
          {/* Bouton au centre */}
          <View style={styles.center}>
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Se connecter avec ViaRezo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#244B93",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end", // Positionner en bas de la section supérieure
    alignItems: "center",
    paddingHorizontal: 20,
  },
  center: {
    flex: 2, // Donne plus d'espace pour centrer verticalement
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E79140",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  welcome: {
    color: "#E79140",
    fontSize: 24, // Augmente la taille de la police
    fontWeight: "bold",
    textAlign: "center",
  },
});