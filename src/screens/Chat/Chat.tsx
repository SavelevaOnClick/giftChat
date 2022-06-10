import {
  Icon,
  Image,
  ImageInput,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from '@components';
import {
  useAppSelector,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from '@hooks';
import db from '@react-native-firebase/firestore';

import React from 'react';
import {TUserData} from '../../reducers/profile';
import {
  AvatarProps,
  Bubble,
  BubbleProps,
  ComposerProps,
  GiftedChat,
  IMessage,
  MessageImageProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import assets from '@assets';
import styles from './styles';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {Storage} from '../../services/firebase';

type TChatProps = {};

const Chat: React.FC<TChatProps> = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [imag, setImage] = useState<string>('');
  const [imageUri, setImageUri] = useState('');
  const [active, setActive] = useState<boolean>(false);
  const user: TUserData = useAppSelector(state => state.profileSlice.user);

  useEffect(() => {
    const unsubscribe = db()
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        if (snapshot) {
          setMessages(
            snapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
              image: doc.data().image,
            })),
          );
        }
      });
    return unsubscribe;
  }, []);

  const createImageUri = useCallback(async () => {
    const imageName = imag ? await Storage.setStorage(imag) : null;
    const img = imageName ? await Storage.getUri(imageName) : '';
    setImageUri(img);
    return;
  }, [imag]);

  useEffect(() => {
    if (imag) {
      createImageUri();
    }
  }, [imag]);

  const onSend = useCallback(
    (messages = []) => {
      setMessages(previousMessages => {
        return GiftedChat.append(previousMessages, [
          {...messages, image: imageUri},
        ]);
      });

      const {_id, text, createdAt, user} = messages[0];

      db().collection('chats').add({
        _id,
        text,
        createdAt,
        user,
        image: imageUri,
      });
      setImage('');
    },
    [imageUri],
  );

  const renderAvatar = useCallback((props: AvatarProps<IMessage>) => {
    const avatar = useMemo(
      () =>
        props.currentMessage?.user.avatar
          ? {uri: props.currentMessage?.user.avatar}
          : assets.images.DEFAULT_AVATAR_WOMEN,
      [props],
    );
    return (
      <View style={styles.avatar}>
        <Text>{props.currentMessage?.user.name}</Text>
        <Image source={avatar} style={styles.avatarImage} />
      </View>
    );
  }, []);

  const userData = useMemo(
    () => ({
      _id: user.userEmail,
      name: user.userName || 'user',
      avatar: user.userAvatar || '',
    }),
    [user],
  );

  const renderComposer = useCallback(
    (props: ComposerProps) => {
      const setEmogie = useCallback((emoji: string) => {
        props &&
          props?.text &&
          props?.onTextChanged &&
          props.onTextChanged(props.text.concat(emoji));
      }, []);

      const onPressEmoji = useCallback(
        () => setActive((prevValue: boolean) => !prevValue),
        [active],
      );

      return (
        <SafeAreaView style={styles.chatInputMainContainer}>
          <View style={styles.chatInputText}>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="smile" size={27} />
            </TouchableOpacity>
            <TextInput
              value={props.text}
              onChangeText={props.onTextChanged}
              style={styles.messageInput}
              keyboardType="default"
            />
          </View>
          {active ? (
            <EmojiSelector
              onEmojiSelected={setEmogie}
              showSearchBar={false}
              showTabs={false}
              showHistory={false}
              showSectionTitles={false}
              category={Categories.emotion}
            />
          ) : null}
        </SafeAreaView>
      );
    },
    [active],
  );
  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send
        {...props}
        alwaysShowSend={true}
        containerStyle={{justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="mail2" size={24} />
      </Send>
    );
  }, []);

  const renderMessageImage = useCallback(
    (props: MessageImageProps<IMessage>) => {
      return (
        <Image
          source={{uri: props.currentMessage?.image}}
          style={styles.renderImage}
        />
      );
    },
    [],
  );

  const renderBubble = useCallback(
    (
      props: Readonly<BubbleProps<IMessage>> &
        Readonly<{
          children?: React.ReactNode;
        }>,
    ) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: styles.bubbleContainer,
          }}
        />
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        wrapInSafeArea={true}
        onSend={messages => {
          onSend(messages);
        }}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        user={userData}
        renderAvatar={renderAvatar}
        renderSend={renderSend}
        renderComposer={renderComposer}
        renderBubble={renderBubble}
        renderActions={props => {
          return (
            <View {...(props.containerStyle = styles.loadingImageContainer)}>
              <ImageInput imageUri={imag || ''} setImageUri={setImage} />
            </View>
          );
        }}
        renderMessageImage={renderMessageImage}
      />
    </View>
  );
};
export default Chat;
