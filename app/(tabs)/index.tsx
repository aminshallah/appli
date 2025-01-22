import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState, useContext } from "react";
import Home from "@/components/Home";
import UserProvider, { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
});

const DEFAULT_USER_DATA = {
  id: "",
  name: "",
  age: "",
  family: "",
};

const clientId = "5f14c1ba69967f99837dc5f61f636b4c142aa818";

export function generateShortUUID() {
  return Math.random().toString(36).substring(2, 15);
}

export default function App() {
  return <AppContent />;
}

export function AppContent() {
  const [accessToken, setAccessToken] = useState<string>();
  const [idToken, setIdToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [userInfo, setUserInfo] = useState<any>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const [statut, setStatut] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const [idFound, setIdFound] = useState(false);

  const [discoveryResult, setDiscoveryResult] =
    useState<AuthSession.DiscoveryDocument>();
  const [userName, setUserName] = useState<string>(""); // Déplace ici le state
  const [userData, setUserData] = useState(null); // Déplace ici le state
  const [error, setError] = useState<string>(""); // Déplace ici le state
  const router = useRouter();

  const [memberNames, setMemberNames] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Fetch OIDC discovery document once
  useEffect(() => {
    const getDiscoveryDocument = async () => {
      const discoveryDocument = await AuthSession.fetchDiscoveryAsync(
        "https://moncompte.viarezo.fr"
      );
      setDiscoveryResult(discoveryDocument);
    };
    getDiscoveryDocument();
  }, []);

  console.log(discoveryResult);

  const login = async () => {
    const state = generateShortUUID();
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

      // Mettre à jour les tokens localement
      setAccessToken(tokenResult.accessToken);
      setIdToken(tokenResult.idToken);
      setRefreshToken(tokenResult.refreshToken);

      // Récupérer les informations de l'utilisateur
      const infos = await AuthSession.fetchUserInfoAsync(
        {
          accessToken: tokenResult.accessToken,
        },
        discoveryResult!
      );
      console.log(infos);
      setUserInfo(infos);
      setLastName(infos.last_name);
      setFirstName(infos.first_name);
      setAvatar(infos.avatar);
      const tmp = infos.first_name + " " + infos.last_name;
      setUserName(tmp); // Mettre à jour le userName ici

      // Mettre à jour le contexte utilisateur
      const newUser = {
        firstName: infos.first_name || "",
        lastName: infos.last_name || "",
        avatar: infos.avatar || "",
        idVR: infos.sub || "",
        id: infos.id || "", // Assure-toi d'avoir une ID d'utilisateur valide
        familyId: infos.familyId || "",
        familyMembers: infos.familyMembers || [],
        familyName: infos.familyName || "",
        shotgun: infos.shotgun || "",
        role: infos.role || "",
        favoris: infos.favoris || [],
        accessToken: tokenResult.accessToken, // Assure-toi de passer l'accessToken ici
      };

      setUser(newUser);
    }
  };

  useEffect(() => {
    if (accessToken) {
      // Mettre à jour le contexte utilisateur ou effectuer d'autres actions lorsque l'accessToken est défini
      console.log("Token updated, user authenticated.");
    }
  }, [accessToken]); // Déclenché chaque fois que l'accessToken change

  const [loading, setLoading] = useState(true); // Indicateur de chargement

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userName) return; // Ne pas exécuter la requête si userName est vide

      try {
        const response = await axios.post(
          "http://192.168.0.101:3000/api/user/findByUserName",
          {
            userName: userName,
          }
        );

        setUserData(response.data);

        // Mettre à jour le contexte utilisateur
        const newUser = {
          firstName: userInfo?.first_name || "",
          lastName: userInfo?.last_name || "",
          avatar: userInfo?.avatar || "",
          idVR: userInfo?.sub || "",
          id: response.data._id,
          familyId: response.data.family._id,
          familyMembers: response.data.family.members,
          familyName: response.data.family.name,
          shotgun: response.data.shotgun,
          role: response.data.role,
          favoris: response.data.favoris,
          accessToken: accessToken,
        };

        setUser(newUser);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userName, accessToken]);

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
    setAccessToken(undefined);
    setIdToken(undefined);
    setRefreshToken(undefined);
  };

  if (!discoveryResult) return <ActivityIndicator />;



  console.log("user :",user)

  return (
    <View style={styles.container}>
      {user.accessToken ? (
        <Home />
      ) : (
        <View style={{ flex: 1, width: "100%" }}>
          {/* Texte centré en haut */}
          <View style={styles.header}>
            <Text style={styles.welcome}>
              Bienvenue sur l'application du WEI 2025
            </Text>
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
