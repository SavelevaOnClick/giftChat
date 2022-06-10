import {StyleSheet} from '@components';

export default StyleSheet.create({
  avatar: {
    alignItems: 'center',
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 9,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 16,
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
    borderBottomColor: 'grey',
    flex: 1,
    borderBottomWidth: 1,
  },
  loadingImageContainer: {
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  renderImage: {
    width: 100,
    height: 100,
  },
  bubbleContainer: {
    backgroundColor: '#f0f0f0',
  },
});
