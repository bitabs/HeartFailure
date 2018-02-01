import React, { Component } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  AppState,
} from 'react-native';

const _ = require('lodash');

import { Buffer } from 'buffer';

const CytonBLE = require('../../OpenBCI_NodeJS_Cyton_BLE').CytonBLE;
const OpenBCIUtilities = require('openbci-utilities');
const {constants, utilities, debug} = OpenBCIUtilities;
const verbose = true;

const Cyton = new CytonBLE({
  // debug: true,
  sendCounts: true,
  verbose: verbose,
  nobleScanOnPowerOn: false,
  nobleAutoStart: true
});

const _options = {
  debug: false,
  nobleAutoStart: true,
  nobleScanOnPowerOn: true,
  sendCounts: false,
  verbose: false
};

import BleManager from "react-native-ble-manager";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class BLE extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: '',


      // cyton
      cytonBLEPeripheralArray: [],
      _rfduinoService: null,
      isStreaming: false,
      _sendCharacteristic: null
    };
    // this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    // this.handleStopScan = this.handleStopScan.bind(this);
    // BLE.handleUpdateValueForCharacteristic = BLE.handleUpdateValueForCharacteristic.bind(this);
    // this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    // this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  // componentDidMount() {
  //   this.printCyton();
  //   AppState.addEventListener('change', this.handleAppStateChange);
  //
  //   BleManager.start({showAlert: false});
  //
  //   this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
  //   this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
  //   this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
  //   this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', BLE.handleUpdateValueForCharacteristic );
  //   if (Platform.OS === 'android' && Platform.Version >= 23) {
  //     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
  //       if (result) {
  //         console.log("Permission is OK");
  //       } else {
  //         PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
  //           if (result) {
  //             console.log("User accept");
  //           } else {
  //             console.log("User refuse");
  //           }
  //         });
  //       }
  //     });
  //   }
  //
  //   const duino = "CF:92:02:BC:0D:CE";
  //
  //   this.startScan();
  //
  //   BleManager.connect(`${duino}`).then(() => {
  //     console.log('RFDuino is connected');
  //     this.setState({isConnected: true});
  //     return BleManager.retrieveServices(`${duino}`);
  //   }).then(() => {
  //     console.log('retrieveServices');
  //     return BleManager.startNotification(
  //       `${duino}`,
  //       '2220', '2221');
  //
  //     // BleManager.retrieveServices(`${duino}`).then((p) => {
  //     //   console.log('Peripheral info:', p);
  //     //   BleManager.startNotification(`${duino}`, '2220', '2221')
  //     //     .then(() => {
  //     //       // Success code
  //     //       console.log('Notification started');
  //     //     })
  //     //     .catch((error) => {
  //     //       // Failure code
  //     //       console.log(error);
  //     //     });
  //     // }).then(() => {
  //     //
  //     //   console.log("inside just about to call write()");
  //     //
  //     // });
  //   }).then(() => {
  //
  //   }).catch((error) => { console.log("connect(): ", error, duino)});
  // }





  componentDidMount() {
    this.printCyton();
    Cyton.once(constants.OBCIEmitterRFduino, (p) => {

      Cyton.searchStop().then(() => {
        Cyton.connect(p) // Port name is a serial port name, see `.listPorts()`
          .then(() => {
            Cyton.on('ready',() => {
              Cyton.streamStart().then(() => {
                Cyton.on('sample',(sample) => {
                  /** Work with sample */
                  for (let i = 0; i < Cyton.numberOfChannels(); i++) {
                    console.log("Channel " + (i + 1) + ": " + sample.channelData[i].toFixed(8) + " Volts.");
                    // prints to the console
                    //  "Channel 1: 0.00001987 Volts."
                  }
                });
              })
            });
          });
      }).catch(e => console.log(e));
    });

    Cyton.once(constants.OBCIEmitterBlePoweredUp, () => {
      Cyton.searchStart().catch(e => console.log(e))
    });


    if (Cyton.isNobleReady()) {
      console.log(`noble is ready so starting scan`);
      Cyton.removeListener(constants.OBCIEmitterBlePoweredUp, () => {
        Cyton.searchStart().catch(e => console.log(e));
      });
    } else {
      console.log(`noble is NOT ready so waiting starting scan`);
    }

  }



































































  printCyton = () => {
    console.log(constants);
  };


  INFINITE = () => {
    var num = 0;

    setInterval(function () {
      this.startScan();
      num = (num + 1) % 4;
    }.bind(this), 9000);

  };

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
      peripherals.set(peripheral.id, peripheral);
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

  startScan() {
    if (!this.state.scanning) {
      this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        this.setState({scanning:true});
      });
    }
  }

  retrieveConnected(){
    BleManager.getConnectedPeripherals([]).then((results) => {
      console.log(results);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }
    });
  }

  handleDiscoverPeripheral(peripheral){
    var peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)){
      console.log('Got ble peripheral', peripheral);
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals })
    }
  }

  render() {
    return null;
  }
}
