import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TouchableHighlight, Image, Dimensions, ScrollView} from "react-native";
import Svg, { Line, G, Path } from 'react-native-svg';

import Ionicons from "react-native-vector-icons/Feather";
import Chart from "./Chart";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  config = () => {
    const $this = this;
    return {
      chart: {
        backgroundColor: '#f3f3f3',
      },
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      xAxis: {
        visible: false,
      },
      plotOptions: {
        series: {
          color: '#aab8be',
          lineWidth: 1.5,
          marker: {
            enabled: false
          },
        },
        line: {
          marker: {
            enabled: false
          },
          states: {
            select: {
              lineWidth: 1.5
            }
          },
          events: {
            click: function() {
              this.setState(this.state === 'select' ? '' : 'select');
            }
          }
        }
      },
      yAxis: {
        visible: false
      },
      tooltip: { enabled: false },
      scrollbar: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Random data',
        data: (function() {
          let data = [];
          data = [
            0,
            0,
            0,
            0,
            0.0000050048828125,
            0.0000137939453125,
            0.000049560546875,
            0.00008740234375,
            0.00015966796875,
            0.000262451171875,
            0.0003975830078125,
            0.0005687255859375,
            0.0007802734375,
            0.001037353515625,
            0.0013468017578125,
            0.00172119140625,
            0.0021756591796875,
            0.0027232666015625,
            0.0033880615234375,
            0.004206787109375,
            0.0052380371093750005,
            0.006586181640625,
            0.008400146484375001,
            0.010904296875,
            0.0144892578125,
            0.0196798095703125,
            0.049684204101562504,
            0.0886883544921875,
            0.11185363769531251,
            0.134164306640625,
            0.137352294921875,
            0.1160369873046875,
            0.08516308593750001,
            0.0539765625,
            0.014997436523437501,
            -0.015882568359375,
            -0.0387554931640625,
            -0.06125732421875,
            -0.0745780029296875,
            -0.07479357910156251,
            -0.0725338134765625,
            -0.0418538818359375,
            0.08582861328125001,
            0.397717529296875,
            0.8136408691406251,
            1.2295617980957032,
            0.9944150390625001,
            0.2824605712890625,
            -0.38949267578125,
            -0.597251220703125,
            -0.425675537109375,
            -0.1537947998046875,
            -0.0500914306640625,
            -0.0111041259765625,
            0.0027451171875,
            0.0071739501953125,
            0.008443359375,
            0.0094327392578125,
            0.012530517578125,
            0.0176046142578125,
            0.0300162353515625,
            0.0433489990234375,
            0.056962646484375004,
            0.0704832763671875,
            0.0770511474609375,
            0.0898175048828125,
            0.10311853027343751,
            0.117046142578125,
            0.1312630615234375,
            0.1529300537109375,
            0.167607177734375,
            0.1899068603515625,
            0.2124422607421875,
            0.235044677734375,
            0.2575535888671875,
            0.2724073486328125,
            0.286978271484375,
            0.3007579345703125,
            0.3067425537109375,
            0.3106370849609375,
            0.303756103515625,
            0.2897236328125,
            0.25916931152343753,
            0.2200599365234375,
            0.1728209228515625,
            0.133416259765625,
            0.086224853515625,
            0.05493408203125,
            0.02409423828125,
            0.00922607421875,
            -0.0043409423828125,
            -0.0097349853515625,
            -0.013127685546875,
            -0.01423095703125,
            -0.013834716796875,
            -0.012556030273437501,
            -0.010675048828125,
            -0.00835888671875,
            -0.0057305908203125,
            -0.0000562744140625,
            0,
            0,
            0,
            0,
            0.0000050048828125,
            0.0000137939453125,
            0.000049560546875,
            0.00008740234375,
            0.00015966796875,
            0.000262451171875,
            0.0003975830078125,
            0.0005687255859375,
            0.0007802734375,
            0.001037353515625,
            0.0013468017578125,
            0.00172119140625,
            0.0021756591796875,
            0.0027232666015625,
            0.0033880615234375,
            0.004206787109375,
            0.0052380371093750005,
            0.006586181640625,
            0.008400146484375001,
            0.010904296875,
            0.0144892578125,
            0.0196798095703125,
            0.049684204101562504,
            0.0886883544921875,
            0.11185363769531251,
            0.134164306640625,
            0.137352294921875,
            0.1160369873046875,
            0.08516308593750001,
            0.0539765625,
            0.014997436523437501,
            -0.015882568359375,
            -0.0387554931640625,
            -0.06125732421875,
            -0.0745780029296875,
            -0.07479357910156251,
            -0.0725338134765625,
            -0.0418538818359375,
            0.08582861328125001,
            0.397717529296875,
            0.8136408691406251,
            1.2295617980957032,
            0.9944150390625001,
            0.2824605712890625,
            -0.38949267578125,
            -0.597251220703125,
            -0.425675537109375,
            -0.1537947998046875,
            -0.0500914306640625,
            -0.0111041259765625,
            0.0027451171875,
            0.0071739501953125,
            0.008443359375,
            0.0094327392578125,
            0.012530517578125,
            0.0176046142578125,
            0.0300162353515625,
            0.0433489990234375,
            0.056962646484375004,
            0.0704832763671875,
            0.0770511474609375,
            0.0898175048828125,
            0.10311853027343751,
            0.117046142578125,
            0.1312630615234375,
            0.1529300537109375,
            0.167607177734375,
            0.1899068603515625,
            0.2124422607421875,
            0.235044677734375,
            0.2575535888671875,
            0.2724073486328125,
            0.286978271484375,
            0.3007579345703125,
            0.3067425537109375,
            0.3106370849609375,
            0.303756103515625,
            0.2897236328125,
            0.25916931152343753,
            0.2200599365234375,
            0.1728209228515625,
            0.133416259765625,
            0.086224853515625,
            0.05493408203125,
            0.02409423828125,
            0.00922607421875,
            -0.0043409423828125,
            -0.0097349853515625,
            -0.013127685546875,
            -0.01423095703125,
            -0.013834716796875,
            -0.012556030273437501,
            -0.010675048828125,
            -0.00835888671875,
            -0.0057305908203125,
            -0.0000562744140625,
            0,
            0,
            0,
            0,
            0.0000050048828125,
            0.0000137939453125,
            0.000049560546875,
            0.00008740234375,
            0.00015966796875,
            0.000262451171875,
            0.0003975830078125,
            0.0005687255859375,
            0.0007802734375,
            0.001037353515625,
            0.0013468017578125,
            0.00172119140625,
            0.0021756591796875,
            0.0027232666015625,
            0.0033880615234375,
            0.004206787109375,
            0.0052380371093750005,
            0.006586181640625,
            0.008400146484375001,
            0.010904296875,
            0.0144892578125,
            0.0196798095703125,
            0.049684204101562504,
            0.0886883544921875,
            0.11185363769531251,
            0.134164306640625,
            0.137352294921875,
            0.1160369873046875,
            0.08516308593750001,
            0.0539765625,
            0.014997436523437501,
            -0.015882568359375,
            -0.0387554931640625,
            -0.06125732421875,
            -0.0745780029296875,
            -0.07479357910156251,
            -0.0725338134765625,
            -0.0418538818359375,
            0.08582861328125001,
            0.397717529296875,
            0.8136408691406251,
            1.2295617980957032,
            0.9944150390625001,
            0.2824605712890625,
            -0.38949267578125,
            -0.597251220703125,
            -0.425675537109375,
            -0.1537947998046875,
            -0.0500914306640625,
            -0.0111041259765625,
            0.0027451171875,
            0.0071739501953125,
            0.008443359375,
            0.0094327392578125,
            0.012530517578125,
            0.0176046142578125,
            0.0300162353515625,
            0.0433489990234375,
            0.056962646484375004,
            0.0704832763671875,
            0.0770511474609375,
            0.0898175048828125,
            0.10311853027343751,
            0.117046142578125,
            0.1312630615234375,
            0.1529300537109375,
            0.167607177734375,
            0.1899068603515625,
            0.2124422607421875,
            0.235044677734375,
            0.2575535888671875,
            0.2724073486328125,
            0.286978271484375,
            0.3007579345703125,
            0.3067425537109375,
            0.3106370849609375,
            0.303756103515625,
            0.2897236328125,
            0.25916931152343753,
            0.2200599365234375,
            0.1728209228515625,
            0.133416259765625,
            0.086224853515625,
            0.05493408203125,
            0.02409423828125,
            0.00922607421875,
            -0.0043409423828125,
            -0.0097349853515625,
            -0.013127685546875,
            -0.01423095703125,
            -0.013834716796875,
            -0.012556030273437501,
            -0.010675048828125,
            -0.00835888671875,
            -0.0057305908203125,
            -0.0000562744140625,
            0,
            0,
            0,
            0,
            0.0000050048828125,
            0.0000137939453125,
            0.000049560546875,
            0.00008740234375,
            0.00015966796875,
            0.000262451171875,
            0.0003975830078125,
            0.0005687255859375,
            0.0007802734375,
            0.001037353515625,
            0.0013468017578125,
            0.00172119140625,
            0.0021756591796875,
            0.0027232666015625,
            0.0033880615234375,
            0.004206787109375,
            0.0052380371093750005,
            0.006586181640625,
            0.008400146484375001,
            0.010904296875,
            0.0144892578125,
            0.0196798095703125,
            0.049684204101562504,
            0.0886883544921875,
            0.11185363769531251,
            0.134164306640625,
            0.137352294921875,
            0.1160369873046875,
            0.08516308593750001,
            0.0539765625,
            0.014997436523437501,
            -0.015882568359375,
            -0.0387554931640625,
            -0.06125732421875,
            -0.0745780029296875,
            -0.07479357910156251,
            -0.0725338134765625,
            -0.0418538818359375,
            0.08582861328125001,
            0.397717529296875,
            0.8136408691406251,
            1.2295617980957032,
            0.9944150390625001,
            0.2824605712890625,
            -0.38949267578125,
            -0.597251220703125,
            -0.425675537109375,
            -0.1537947998046875,
            -0.0500914306640625,
            -0.0111041259765625,
            0.0027451171875,
            0.0071739501953125,
            0.008443359375,
            0.0094327392578125,
            0.012530517578125,
            0.0176046142578125,
            0.0300162353515625,
            0.0433489990234375,
            0.056962646484375004,
            0.0704832763671875,
            0.0770511474609375,
            0.0898175048828125,
            0.10311853027343751,
            0.117046142578125,
            0.1312630615234375,
            0.1529300537109375,
            0.167607177734375,
            0.1899068603515625,
            0.2124422607421875,
            0.235044677734375,
            0.2575535888671875,
            0.2724073486328125,
            0.286978271484375,
            0.3007579345703125,
            0.3067425537109375,
            0.3106370849609375,
            0.303756103515625,
            0.2897236328125,
            0.25916931152343753,
            0.2200599365234375,
            0.1728209228515625,
            0.133416259765625,
            0.086224853515625,
            0.05493408203125,
            0.02409423828125,
            0.00922607421875,
            -0.0043409423828125,
            -0.0097349853515625,
            -0.013127685546875,
            -0.01423095703125,
            -0.013834716796875,
            -0.012556030273437501,
            -0.010675048828125,
            -0.00835888671875,
            -0.0057305908203125,
            -0.0000562744140625,
            0,
            0,
            0,
            0,
            0.0000050048828125,
            0.0000137939453125,
            0.000049560546875,
            0.00008740234375,
            0.00015966796875,
            0.000262451171875,
            0.0003975830078125,
            0.0005687255859375,
            0.0007802734375,
            0.001037353515625,
            0.0013468017578125,
            0.00172119140625,
            0.0021756591796875,
            0.0027232666015625,
            0.0033880615234375,
            0.004206787109375,
            0.0052380371093750005,
            0.006586181640625,
            0.008400146484375001,
            0.010904296875,
            0.0144892578125,
            0.0196798095703125,
            0.049684204101562504,
            0.0886883544921875,
            0.11185363769531251,
            0.134164306640625,
            0.137352294921875,
            0.1160369873046875,
            0.08516308593750001,
            0.0539765625,
            0.014997436523437501,
            -0.015882568359375,
            -0.0387554931640625,
            -0.06125732421875,
            -0.0745780029296875,
            -0.07479357910156251,
            -0.0725338134765625,
            -0.0418538818359375,
            0.08582861328125001,
            0.397717529296875,
            0.8136408691406251,
            1.2295617980957032,
            0.9944150390625001,
            0.2824605712890625,
            -0.38949267578125,
            -0.597251220703125,
            -0.425675537109375,
            -0.1537947998046875,
            -0.0500914306640625,
            -0.0111041259765625,
            0.0027451171875,
            0.0071739501953125,
            0.008443359375,
            0.0094327392578125,
            0.012530517578125,
            0.0176046142578125,
            0.0300162353515625,
            0.0433489990234375,
            0.056962646484375004,
            0.0704832763671875,
            0.0770511474609375,
            0.0898175048828125,
            0.10311853027343751,
            0.117046142578125,
            0.1312630615234375,
            0.1529300537109375,
            0.167607177734375,
            0.1899068603515625,
            0.2124422607421875,
            0.235044677734375,
            0.2575535888671875,
            0.2724073486328125,
            0.286978271484375,
            0.3007579345703125,
            0.3067425537109375,
            0.3106370849609375,
            0.303756103515625,
            0.2897236328125,
            0.25916931152343753,
            0.2200599365234375,
            0.1728209228515625,
            0.133416259765625,
            0.086224853515625,
            0.05493408203125,
            0.02409423828125,
            0.00922607421875,
            -0.0043409423828125,
            -0.0097349853515625,
            -0.013127685546875,
            -0.01423095703125,
            -0.013834716796875,
            -0.012556030273437501,
            -0.010675048828125,
            -0.00835888671875,
            -0.0057305908203125,
            -0.0000562744140625
          ];
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <View style={[styles.topSection, styles.navigationBar]}>

            <TouchableHighlight onPress={() => this.props.navigation.navigate('DrawerOpen')} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
              <Svg height="24" width="24">
                <Line fill="none" stroke="#f3f3f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="12" x2="21" y2="12"/>
                <Line fill="none" stroke="#f3f3f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="10.208" y1="6" x2="21" y2="6"/>
                <Line fill="none" stroke="#f3f3f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="18" x2="13.791" y2="18"/>
              </Svg>
            </TouchableHighlight>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Ionicons name={"edit-2"} size={22} color="#f3f3f3" />
            </TouchableOpacity>
          </View>


          <View style={styles.imageContainer}>
            <View style={styles.imgCircleContainer}>
              <Image style={styles.userImg} source={require('../Images/Naseebullah.jpg')} resizeMode="contain"/>
              <View style={styles.imgOverlay} />
            </View>

            <Text style={styles.profileName}>Naseebullah Ahmadi{'\n'}
              <Text style={styles.profession}>Fullstack Developer</Text>
            </Text>

            <View style={styles.socialIcons}>
              <View style={styles.facebook}><Ionicons name={"facebook"} size={18} color="rgba(243, 243, 243, 0.8)" /></View>
              <View style={styles.twitter}><Ionicons name={"twitter"} size={18} color="rgba(243, 243, 243, 0.8)" /></View>
              <View style={styles.instagram}><Ionicons name={"instagram"} size={18} color="rgba(243, 243, 243, 0.8)" /></View>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>

          <View style={{flexDirection: 'column', marginBottom: 20, position: 'relative'}}>
            <Ionicons name={"feather"} size={18} color="#aab8be" style={{paddingLeft: 20}} />
            <View style={styles.profileDetails}>
              <View style={styles.profileDetailsLeft}>
                <Text style={styles.profileTextField}>
                  <Text style={styles.fieldValue}>Naseebullah Ahmadi</Text>
                  {'\n'}
                  <Text style={styles.fieldTitle}>
                    <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                    <Text style={{paddingLeft: 10}}>Name</Text>
                  </Text>
                </Text>

                <Text style={styles.profileTextField}>
                  <Text style={styles.fieldValue}>FullStack Developer</Text>
                  {'\n'}
                  <Text style={styles.fieldTitle}>
                    <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                    <Text style={{paddingLeft: 10}}>Profession</Text>
                  </Text>
                </Text>

                <Text style={styles.profileTextField}>
                  <Text style={styles.fieldValue}>20</Text>
                  {'\n'}
                  <Text style={styles.fieldTitle}>
                    <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                    <Text style={{paddingLeft: 10}}>Age</Text>
                  </Text>
                </Text>

              </View>
              <View style={styles.profileDetailsRight}>
                <Text style={styles.profileTextField}>
                  <Text style={styles.fieldValue}>122 Atherstone Court</Text>
                  {'\n'}
                  <Text style={styles.fieldTitle}>
                    <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                    <Text style={{paddingLeft: 10}}>Address</Text>
                  </Text>
                </Text>

                <Text style={styles.profileTextField}>
                  <Text style={styles.fieldValue}>02/06/1997</Text>
                  {'\n'}
                  <Text style={styles.fieldTitle}>
                    <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                    <Text style={{paddingLeft: 10}}>Date Of Birth</Text>
                  </Text>
                </Text>

                <Text style={styles.profileTextField}>
                  <Text style={styles.fieldValue}>02072861214</Text>
                  {'\n'}
                  <Text style={styles.fieldTitle}>
                    <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                    <Text style={{paddingLeft: 10}}>Contact Number</Text>
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.bar} />
          </View>

          <View style={{marginBottom: 20, position: 'relative'}}>
            <Ionicons name={"clipboard"} size={18} color="#aab8be" style={{paddingLeft: 20}} />
            <View style={styles.healthContainer}>
              <View>
                <Text style={styles.healthTitle}>Temperature</Text>
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={"thermometer"} size={18} color="#aab8be" style={{marginRight: 3, alignSelf: 'center'}} />
                  <Text style={{fontSize: 30, color: '#aab8be'}}>36.7°</Text>
                </View>
              </View>
              <View>
                <Text style={styles.healthTitle}>Calories Burned</Text>
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={"droplet"} size={18} color="#aab8be" style={{marginRight: 3}} />
                  <Text style={{fontSize: 30, color: '#aab8be'}}>537
                    <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(144, 154, 174, 0.5)'}}>cal</Text>
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.healthTitle}>Heart Rate</Text>
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={"heart"} size={18} color="#aab8be" style={{marginRight: 3}} />
                  <Text style={{fontSize: 30, color: '#aab8be'}}>87
                    <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(144, 154, 174, 0.5)'}}>bpm</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.bar} />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{margin: 5}}>
              <Ionicons name={"activity"} size={18} color="#aab8be" style={{paddingLeft: 10}} />
              <View style={[styles.healthContainer, styles.infoSection, {padding: 0}]}>
                <Chart type={"day"} height={100} width={(Dimensions.get('window').width / 2) - 30} config={this.config()} component={"Statistics"}/>
              </View>
            </View>

            <View style={{margin: 5}}>
              <Ionicons name={"heart"} size={18} color="#aab8be" style={{paddingLeft: 10}} />
              <View style={[styles.healthContainer, styles.infoSection, {padding: 0}]}>
                <Chart type={"day"} height={100} width={(Dimensions.get('window').width / 2) - 30} config={this.config()} component={"Statistics"}/>
              </View>
            </View>
          </View>

        </View>



        <TouchableHighlight style={styles.profileBtn}>
          <Ionicons name={"user-plus"} size={20} color="#f3f3f3" />
        </TouchableHighlight>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f3f3f3',
    justifyContent: 'flex-start',
  },
  topSection: {
    flexDirection: 'column',
    backgroundColor: 'rgba(188,202,208, 1)',
    padding:10,
    paddingBottom: 50,
    position: 'relative',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  imageContainer: {
    alignItems: 'center'
  },
  imgCircleContainer: {
    position: 'relative',
    borderRadius: 80,
    height: 110,
    width: 110,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 40,
    justifyContent: 'center',
    marginBottom: 10
  },
  userImg: {
    borderRadius: 300,
    height: 100,
    width: 100,
  },
  imgOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(246,246,246, 0.8)',
    opacity: 0.5,
    borderRadius: 300,
    height: 100,
    width: 100,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  profession: {
    fontSize: 15,
    fontWeight: '200',
    color: 'rgba(243, 243, 243, 0.8)'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  facebook: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15
  },
  twitter: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15
  },
  instagram: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15
  },
  profileBtn: {
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: (Dimensions.get('window').height / 2) - 65,
    backgroundColor: '#E67D8F',
    elevation: 10,
    marginTop: 30,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    width: 150,
    padding: 15,
    maxWidth: 150,
    borderRadius: 100 / 2
  },
  infoSection: {
    flexDirection: 'column',
    paddingTop: 40,
    padding:10,
    paddingBottom: 50,
    position: 'relative',
    backgroundColor: '#f3f3f3'
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    //backgroundColor: 'white'
  },
  profileDetailsLeft: {
    flexDirection: 'column',
  },
  profileDetailsRight: {
    flexDirection: 'column',
  },
  profileTextField: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  fieldTitle: {
    fontSize: 12,
    color: 'rgba(188,202,208, 0.9)'
  },
  fieldValue: {
    fontSize: 14,
    color: '#aab8be'
  },
  healthContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  healthTitle: {
    fontSize: 14,
    color: '#aab8be',
    textAlign: 'center'
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: 100,
    height: 2,
    backgroundColor: 'rgba(188,202,208, 0.15)'
  }
});
