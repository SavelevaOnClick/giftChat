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
});
