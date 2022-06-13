import {StyleSheet} from '@components';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89CFF0',
    paddingBottom: 20,
  },
  avatar: {
    alignItems: 'center',
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 9,
  },
  chatInputMainContainer: {
    flex: 1,
  },
  chatInputText: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
  messageInput: {
    borderBottomColor: '#fff',
    flex: 1,
    borderBottomWidth: 2,
    marginRight: 10,
    paddingLeft: 10,
  },
  loadingImageContainer: {
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  renderImage: {
    width: 100,
    height: 100,
    borderRadius: 0,
  },
  renderImageContainer: {
    alignItems: 'center',
  },
  inputImage: {
    width: 50,
    height: 50,
  },
  bubbleLeft: {
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  bubbleRight: {
    backgroundColor: '#89CFF0',
    textAlign: 'center',
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatToolBar: {
    borderTopWidth: 0,
    paddingHorizontal: 16,
    marginBottom: -25,
    height: 70,
    backgroundColor: '#89CFF0',
    borderRadius: 19,
  },
  messagesContainer: {
    paddingBottom: 25,
    backgroundColor: '#fff',
    borderBottomRightRadius: 49,
    borderBottomLeftRadius: 49,
  },
});
