import { height, width } from "../../Utils/Scale";

export default {
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    callContainer: {
      flex: 1,
      position: "absolute",
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
    },
    welcome: {
      fontSize: 30,
      textAlign: "center",
      paddingTop: 40,
      color: '#000'

    },
    input: {
      height: 50,
      borderWidth: 1,
      marginTop: 50,
      textAlign: "center",
    },
    button: {
      position: "absolute",
      left: 10,
      bottom: '12%',
      paddingVertical: 10,
      width: '50%',
      paddingVertical: 0
    },
    localVideo: {
      flex: 1,
      width: 150,
      height: 200,
      position: "absolute",
      right: 10,
      bottom: 10,
    },
    remoteGrid: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    remoteVideo: {
      marginTop: 50,
      width: width,
      height: height/2,
    },
    optionsContainer: {
      position: "absolute",
      left: 0,
      bottom: 0,
      right: 0,
      paddingVertical: 10,
      backgroundColor: "lightgrey",
      flexDirection: "row",
      alignItems: "center",
    },
    optionButton: {
      width: 46,
      height: 46,
      marginHorizontal: 10,
      borderRadius: 23,
      backgroundColor: "lightgrey",
      justifyContent: "center",
      alignItems: "center",
    },
  };