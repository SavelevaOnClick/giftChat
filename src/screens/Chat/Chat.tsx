import {
  Icon,
  Image,
  ImageInput,
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
  ActionsProps,
  AvatarProps,
  Bubble,
  BubbleProps,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  MessageImage,
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
  const [img, setImg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);
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
              type: doc.data().type,
            })),
          );
        }
      });
    return unsubscribe;
  }, []);

  const createImageUri = useCallback(
    async img => {
      const imageName = img ? await Storage.setStorage(img) : null;
      const imageUrl = imageName ? await Storage.getUri(imageName) : '';
      return imageUrl;
    },
    [img],
  );

  const onSend = useCallback(
    (messages = []) => {
      setMessages(previousMessages => {
        return GiftedChat.append(previousMessages, {...messages, image: img});
      });

      const {_id, text, createdAt, user} = messages[0];
      setIsLoading(true);
      createImageUri(img).then(response => {
        setImg('');
        db().collection('chats').add({
          _id,
          text,
          createdAt,
          user,
          image: response,
        });
      });
      setImg('');
      setIsLoading(false);
    },
    [img],
  );

  const renderAvatar = useCallback((props: AvatarProps<IMessage>) => {
    const avatar = useMemo(
      () =>
        props?.currentMessage?.user.avatar
          ? {uri: props?.currentMessage.user.avatar}
          : assets.images.DEFAULT_AVATAR_WOMEN,
      [props.currentMessage?.user.avatar],
    );
    if (props.currentMessage?.user._id) {
      return (
        <View style={styles.avatar}>
          <Text>{props.currentMessage?.user.name}</Text>
          <Image source={avatar} style={styles.avatarImage} />
        </View>
      );
    }
  }, []);

  const userData = useMemo(
    () =>
      user && {
        _id: user.userEmail,
        name: user.userName || 'user',
        avatar: user.userAvatar || '',
      },
    [user],
  );

  const renderComposer = useCallback(
    (props: ComposerProps) => {
      useEffect(() => {
        if (emoji) {
          props &&
            props?.onTextChanged &&
            props.onTextChanged(props?.text ? props.text.concat(emoji) : emoji);
          setIsShow((prevValue: boolean) => !prevValue);
          setEmoji('');
        }
      }, [emoji]);

      const onPressEmoji = useCallback(() => {
        setIsShow(prevValue => !prevValue);
      }, [isShow]);

      return (
        <View style={[styles.chatInputMainContainer]}>
          <View style={styles.chatInputText}>
            <TouchableOpacity onPress={onPressEmoji}>
              <Icon name="smile" size={27} color={'#fff'} />
            </TouchableOpacity>
            <TextInput
              value={props.text}
              onChangeText={props.onTextChanged}
              style={styles.messageInput}
              placeholder={'write message...'}
              placeholderTextColor="#fff"
            />
          </View>
        </View>
      );
    },
    [setIsShow, emoji],
  );

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send {...props} alwaysShowSend={true} containerStyle={styles.sendButton}>
        <Icon name="mail2" size={24} color={'#fff'} />
      </Send>
    );
  }, []);

  const renderMessageImage = useCallback(
    (props: MessageImageProps<IMessage>) => {
      return (
        <MessageImage
          {...props}
          imageStyle={styles.renderImage}
          containerStyle={styles.renderImageContainer}
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
      if (props.currentMessage?.user._id) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: styles.bubbleLeft,
              right: styles.bubbleRight,
            }}
          />
        );
      }
    },
    [],
  );

  const renderActions = useCallback(
    (props: ActionsProps) => {
      return (
        <View {...(props.containerStyle = styles.loadingImageContainer)}>
          <ImageInput
            imageUri={isLoading ? '' : img}
            setImageUri={setImg}
            iconColor="#fff"
            imageStyles={styles.inputImage}
          />
        </View>
      );
    },
    [img, isLoading],
  );

  const renderInputToolBar = useCallback(
    (props: InputToolbarProps<IMessage>) => {
      return <InputToolbar {...props} containerStyle={styles.chatToolBar} />;
    },
    [],
  );

  return (
    <>
      <View style={styles.container}>
        <GiftedChat
          showAvatarForEveryMessage={true}
          messages={messages}
          onSend={onSend}
          showUserAvatar={true}
          user={userData}
          alignTop={true}
          scrollToBottom={true}
          renderAvatar={renderAvatar}
          renderSend={renderSend}
          renderComposer={renderComposer}
          renderBubble={renderBubble}
          renderActions={renderActions}
          renderMessageImage={renderMessageImage}
          messagesContainerStyle={styles.messagesContainer}
          bottomOffset={0}
          renderInputToolbar={renderInputToolBar}
        />
        {isShow ? (
          <View style={styles.emojiContainer}>
            <EmojiSelector
              onEmojiSelected={setEmoji}
              showSearchBar={false}
              showTabs={false}
              columns={8}
              showHistory={false}
              showSectionTitles={false}
              category={Categories.emotion}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};
export default Chat;
