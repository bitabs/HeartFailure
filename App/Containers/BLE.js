import React, { Component } from 'react';
import {
  NativeEventEmitter,
  NativeAppEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  AppState, TouchableOpacity, Text,
} from 'react-native';
import { stringToBytes } from 'convert-string';

import { Buffer } from 'buffer';
import BleManager from "react-native-ble-manager";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const RFDuinoID = "CF:92:02:BC:0D:CE";
const SUUID   = "00002220-0000-1000-8000-00805f9b34fb";
const CUUID   = "00002221-0000-1000-8000-00805f9b34fb";
const WCUUID  = "00002222-0000-1000-8000-00805f9b34fb";
export default class BLE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: ''
    };
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    BLE.handleUpdateValueForCharacteristic = BLE.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false}).then(() => console.log("module initialised"));


    this.handlerDiscover = bleManagerEmitter.addListener (
      'BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral
    );

    this.handlerStop = bleManagerEmitter.addListener (
      'BleManagerStopScan', this.handleStopScan
    );

    this.handlerDisconnect = bleManagerEmitter.addListener (
      'BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral
    );

    this.handlerUpdate = bleManagerEmitter.addListener (
      'BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic
    );

    this.platformPermissionRequest();

    this.startScan();

    //this.connect();

    BleManager.connect(RFDuinoID).then(() => {
      console.log("connected");
      return BleManager.retrieveServices(RFDuinoID)
    }).then(() => {
      console.log("retrieveServices");
      return BleManager.startNotification(RFDuinoID, '00002220-0000-1000-8000-00805F9B34FB', '00002221-0000-1000-8000-00805F9B34FB');
    }).then(() => {
      return NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', data => {
        console.log("BLE Update Value: ", data.value);
      })
    }).catch(e => console.log(e));
  }

  platformPermissionRequest = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        if (result) {
          console.log("Permission is OK");
        } else {
          PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(RFDuinoID, peripheral);
      this.setState({peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  static handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan = () => {
    if (!this.state.scanning) {

      this.setState({
        peripherals: new Map()
      });

      BleManager.scan([], 3, true).then(() => {
        console.log('Scanning...');
        this.setState({scanning:true});
      });
    }
  };

  retrieveConnected(){
    BleManager.getConnectedPeripherals([]).then((results) => {
      console.log(results);
      let peripherals = this.state.peripherals;
      for (let i = 0; i < results.length; i++) {
        let peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(RFDuinoID, peripheral);
        this.setState({ peripherals });
      }
    });
  }

  handleDiscoverPeripheral(peripheral){
    let peripherals = this.state.peripherals;
    if (!peripherals.has(RFDuinoID)){
      console.log('Got ble peripheral', peripheral);
      peripherals.set(RFDuinoID, peripheral);
      this.setState({ peripherals })
    }
  }

  connect = () => {
    // BleManager.connect(RFDuinoID).then(() => {
    //   console.log("connected");
    //   return BleManager.retrieveServices(RFDuinoID)
    // }).then(() => {
    //   console.log("retrieveServices");
    //   return BleManager.startNotification(RFDuinoID, "00002220-0000-1000-8000-00805f9b34fb", "00002221-0000-1000-8000-00805f9b34fb");
    // }).then(() => {
    //   return NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', data => {
    //     console.log("BLE Update Value: ", data.value);
    //   })
    // }).catch(e => console.log(e));

    // BleManager.connect(RFDuinoID).then(() => {
    //   setTimeout(() => {
    //     BleManager.retrieveServices(RFDuinoID).then(peripheral => {
    //       console.log("peripheral ", peripheral);
    //       setTimeout(() => {
    //         BleManager.startNotification(RFDuinoID, '2220', '2221').then(() => {
    //           console.log('Started notification on ' + RFDuinoID);
    //           NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (d) => console.log("data: ", d.value));
    //         }).catch((error) => console.log('Notification error', error));
    //       }, 200);
    //     }).then(() => {
    //       BleManager.write(RFDuinoID, '2220', '2222', stringToBytes('b')).then(() => console.log('write successful!')).catch(e => console.log("Error on write(): ", e));
    //     });
    //   }, 900);
    // }).catch( e => console.log( "Error, could not connect(): ", e ));

  };

  write = () => {
    const BCommand = stringToBytes('b');
    BleManager.write(RFDuinoID, '00002220-0000-1000-8000-00805F9B34FB', '00002222-0000-1000-8000-00805F9B34FB', BCommand).then(() => {
      console.log('write(): ', BCommand)
    }).catch(e => console.log("Error on write(): ", e));
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.write()}>
        <Text>CLick me</Text>
      </TouchableOpacity>
    );
  }
}
