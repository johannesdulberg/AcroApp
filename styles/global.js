import { StyleSheet } from 'react-native';

export const primaryColor="#fb5839"
export const secondaryColor="#f1a990"
export const thirdColor="#eebda6"
export const backgroundColor="#eae6d2"

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  titleTextM: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width:"70%"
  },
  titleTextD: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width:"10%"
  },
  titleTextX: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width:"40%"
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:backgroundColor
  },
  input:{
    borderRadius:5,
    borderColor:"gray",
    borderWidth:2,
    marginBottom:7,
    paddingHorizontal:5,
    paddingVertical:5,
    height:30,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    alignSelf:"center",
    width:"90%",
  },
  button:{
    color:primaryColor,
    borderRadius:5,
    borderColor:primaryColor,
    marginTop:20,
    borderWidth:2,
    paddingTop:12,
    paddingHorizontal:5,
    paddingVertical:5,
    height:50,
    
    alignItems:"center",
    alignSelf:"center",
    width:"35%",
  },
  buttonText:{
    color:primaryColor,
    fontSize:19,
    fontWeight: 'bold',
  },
  buttonTextSmall:{
    fontSize:15,
    
  },
  buttonSmall:{
    borderRadius:5,
    borderColor:"gray",
    borderWidth:2,
    marginBottom:7,
    paddingHorizontal:5,
    paddingVertical:5,
    height:30,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    alignSelf:"center",
    width:"90%",
  },
  detailContainer:{
    backgroundColor:backgroundColor,
    flex:1,



  },
  videoContainer:{
    backgroundColor:backgroundColor,
    alignItems:"center",



  },
  videoWindow:{
    height:180,
    width:"100%",
    marginBottom:15,
  },
  detailTextHeader: {
    marginTop:5,
    marginLeft:10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  detailText: {
    marginTop:5,
    marginLeft:10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },



});