import {StyleSheet} from '@components';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  range: {
    marginBottom: 10,
  },
  errorContainer: {
    marginTop: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 9,
  },
  errorDescription: {
    textAlign: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  descriptionLoader: {
    fontSize: 34,
  },
});
