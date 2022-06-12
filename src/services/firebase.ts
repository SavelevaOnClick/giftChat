import farebase, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';

export class authh {
  static async signIn(body: {
    email: string;
    password: string;
  }): Promise<FirebaseAuthTypes.UserCredential> {
    return await farebase().signInWithEmailAndPassword(
      body.email,
      body.password,
    );
  }

  static async getToken(): Promise<string | undefined> {
    return await farebase().currentUser?.getIdToken();
  }

  static async updateUser(
    user: FirebaseAuthTypes.User,
    body: FirebaseAuthTypes.UpdateProfile,
  ): Promise<void> {
    const avatarName = body.photoURL
      ? await Storage.setStorage(body.photoURL)
      : null;
    const uriAvatar = avatarName ? await Storage.getUri(avatarName) : null;
    const updateData = Object.assign(
      {},
      body.displayName ? {displayName: body.displayName} : null,
      uriAvatar ? {photoURL: uriAvatar} : null,
    );
    await user.updateProfile(updateData);
  }

  static async signUp(body: {
    email: string;
    password: string;
    displayName?: string;
    photoURL?: string;
  }): Promise<FirebaseAuthTypes.User> {
    const {user} = await farebase().createUserWithEmailAndPassword(
      body.email,
      body.password,
    );
    const {displayName, photoURL} = body;
    (displayName || photoURL) &&
      (await authh.updateUser(user, {displayName, photoURL}));

    return user;
  }
}

export class Storage {
  static async setStorage(uri: string): Promise<string> {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    await storage().ref(fileName).putFile(uri);
    return fileName;
  }

  static async getUri(fileName: string): Promise<string> {
    const url = await storage().ref(fileName).getDownloadURL();
    return url;
  }
}
