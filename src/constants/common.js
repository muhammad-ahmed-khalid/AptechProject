import { TouchableWithoutFeedback } from 'react-native';

export const innerContainer = {
    optionsWrapper: {
      paddingVertical: 10,
    },
    optionsContainer: {
      width: 140,
      borderRadius: 15,
      marginTop: 30,
      marginLeft: -20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
  
      elevation: 7,
    },
    optionWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
    },
  };
  export const triggerStyles = {
    triggerText: {
      color: 'red',
    },
    triggerOuterWrapper: {
      flex: 1,
    },
    triggerWrapper: {
      paddingVertical: 5,
      justifyContent: 'center',
      color: 'red',
      flexDirection: 'row',
      flex: 1,
    },
    TriggerTouchableComponent: TouchableWithoutFeedback,
    triggerTouchable: {
      activeOpacity: 10,
      backgroundColor: 'grey',
      style: {
        backgroundColor: 'grey',
        flex: 1,
      },
    },
  };
