import React, { Component } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  AppState,
} from 'react-native';
import { stringToBytes } from 'convert-string';


import { Buffer } from 'buffer';
// let noble = require('react-native-ble');

//
// const CytonBLE =  require('openbci-cyton-ble').CytonBLE;
// const OpenBCIUtilities = require('openbci-utilities');
// const {constants, debug, utilities} = OpenBCIUtilities;
// console.log(constants);
// const verbose = true;
//
// const Cyton = new CytonBLE({
//   // debug: true,
//   sendCounts: true,
//   verbose: verbose,
//   nobleScanOnPowerOn: false,
//   nobleAutoStart: true
// });

import BleManager from "react-native-ble-manager";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const RFDuinoID = "CF:92:02:BC:0D:CE";

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

    BleManager.connect(`${RFDuinoID}`).then(() => console.log("connected") ).catch( e => console.log( e ));


    setTimeout(() => {
      BleManager.retrieveServices(RFDuinoID).then(peripheral => {
        console.log(peripheral);
        let { serviceUUID , characteristicUUID } = '00002220-0000-1000-8000-00805F9B34FB';

        setTimeout(() => {
          BleManager.startNotification(RFDuinoID, "2220", "2221").then(() => {
            console.log('Started notification on ' + RFDuinoID);
            setTimeout(() => {
              const data = stringToBytes('b');
              BleManager.read(RFDuinoID, "2220", "2223", data).then(() => {

              });
            }, 500);
          }).catch((error) => console.log('Notification error', error));
        }, 200)
      })
    }, 900) // <== 1

    // this.printCyton();
    // AppState.addEventListener('change', this.handleAppStateChange);
    //
    // BleManager.start({showAlert: false});
    //
    // this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    // this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    // this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    // this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', BLE.handleUpdateValueForCharacteristic );
    // if (Platform.OS === 'android' && Platform.Version >= 23) {
    //   PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
    //     if (result) {
    //       console.log("Permission is OK");
    //     } else {
    //       PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
    //         if (result) {
    //           console.log("User accept");
    //         } else {
    //           console.log("User refuse");
    //         }
    //       });
    //     }
    //   });
    // }
    //
    // const duino = "CF:92:02:BC:0D:CE";
    //
    // this.startScan();
    //
    // BleManager.connect(`${duino}`).then(() => {
    //   console.log('RFDuino is connected');
    //   this.setState({isConnected: true});
    //   return BleManager.retrieveServices(`${duino}`);
    // }).then(() => {
    //   console.log('retrieveServices');
    //   return BleManager.startNotification(
    //     `${duino}`,
    //     '2220', '2221');
    //
    //   // BleManager.retrieveServices(`${duino}`).then((p) => {
    //   //   console.log('Peripheral info:', p);
    //   //   BleManager.startNotification(`${duino}`, '2220', '2221')
    //   //     .then(() => {
    //   //       // Success code
    //   //       console.log('Notification started');
    //   //     })
    //   //     .catch((error) => {
    //   //       // Failure code
    //   //       console.log(error);
    //   //     });
    //   // }).then(() => {
    //   //
    //   //   console.log("inside just about to call write()");
    //   //
    //   // });
    // }).then(() => {
    //
    // }).catch((error) => { console.log("connect(): ", error, duino)});
  }
  // componentDidMount() {
  //
  //   // noble.on('stateChange', function(state) {
  //   //   if (state === 'poweredOn') {
  //   //     //
  //   //     // Once the BLE radio has been powered on, it is possible
  //   //     // to begin scanning for services. Pass an empty array to
  //   //     // scan for all services (uses more time and power).
  //   //     //
  //   //     console.log('scanning...');
  //   //     noble.startScanning(['0000222000001000800000805f9b34fb'], false);
  //   //   }
  //   //   else {
  //   //     noble.stopScanning();
  //   //   }
  //   // })
  //   //
  //   // noble.on('discover', function(peripheral) {
  //   //   console.log(peripheral);
  //   //   // we found a peripheral, stop scanning
  //   //   noble.stopScanning();
  //   //
  //   //   console.log("scanning stopped")
  //   //
  //   //
  //   //   peripheral.connect(err => {
  //   //     console.log(err);
  //   //     peripheral.discoverServices(['0000222000001000800000805f9b34fb'], function(err, services) {
  //   //       console.log({error: err, service: services});
  //   //       services.forEach(service => {
  //   //
  //   //         service.discoverCharacteristics([], function(err, characteristics) {
  //   //
  //   //           characteristics.forEach(function(characteristic) {
  //   //             console.log({characteristics: characteristic})
  //   //           });
  //   //
  //   //         })
  //   //       });
  //   //     });
  //   //   })
  //   //
  //   // });
  //   // Cyton.once(constants.OBCIEmitterRFduino, (peripheral) => {
  //   //
  //   //   // Cyton.once('ready', () => {
  //   //   //   if (accel) {
  //   //   //     ganglion.accelStart()
  //   //   //       .then(() => {
  //   //   //         return ganglion.streamStart();
  //   //   //       })
  //   //   //       .catch(errorFunc);
  //   //   //   } else if (impedance) {
  //   //   //     ganglion.impedanceStart().catch(errorFunc);
  //   //   //   } else {
  //   //   //     ganglion.streamStart().catch(errorFunc);
  //   //   //   }
  //   //   // });
  //   //
  //   //   Cyton.searchStop()
  //   //     .then(() => {
  //   //       console.log(`search stopped`);
  //   //       console.log("Peripheral: ", peripheral);
  //   //       Cyton.connect(peripheral) // Port name is a serial port name, see `.listPorts()`
  //   //         .then(() => {
  //   //           Cyton.on('ready',() => {
  //   //             Cyton.streamStart();
  //   //             Cyton.on('sample',(sample) => {
  //   //               /** Work with sample */
  //   //               for (let i = 0; i < Cyton.numberOfChannels(); i++) {
  //   //                 console.log("Channel " + (i + 1) + ": " + sample.channelData[i].toFixed(8) + " Volts.");
  //   //                 // prints to the console
  //   //                 //  "Channel 1: 0.00001987 Volts."
  //   //                 //  "Channel 2: 0.00002255 Volts."
  //   //                 //  ...
  //   //                 //  "Channel 8: -0.00001875 Volts."
  //   //               }
  //   //             });
  //   //           });
  //   //         });
  //   //     })
  //   //     .catch(e => console.log(e));
  //   //
  //   // });
  //   // Cyton.once(constants.OBCIEmitterBlePoweredUp, () => Cyton.searchStart().catch(e => console.log(e)));
  //   // if (Cyton.isNobleReady()) {
  //   //   console.log(`noble is ready so starting scan`);
  //   //   Cyton.removeListener(constants.OBCIEmitterBlePoweredUp, () => Cyton.searchStart().catch(e => console.log(e)));
  //   //   Cyton.searchStart().catch(e => console.log(e))
  //   // } else {
  //   //   console.log(`noble is NOT ready so waiting starting scan`);
  //   // }
  // }


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
  }

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

  /**
   * @description Output passed bytes on the console as a hexdump, if enabled
   * @param prefix - label to show to the left of bytes
   * @param data - bytes to output, a buffer or string
   * @private
   */
  debugBytes = (prefix, data) => {
    if (typeof data === 'string') data = new Buffer(data);

    console.log('Debug bytes:');

    for (let j = 0; j < data.length;) {
      let hexPart = '';
      let ascPart = '';
      for (let end = Math.min(data.length, j + 16); j < end; ++j) {
        let byt = data[j];

        let hex = ('0' + byt.toString(16)).slice(-2);
        hexPart += (((j & 0xf) === 0x8) ? '  ' : ' '); // puts an extra space 8 bytes in
        hexPart += hex;

        let asc = (byt >= 0x20 && byt < 0x7f) ? String.fromCharCode(byt) : '.';
        ascPart += asc;
      }

      // pad to fixed width for alignment
      hexPart = (hexPart + '                                                   ').substring(0, 3 * 17);

      console.log(prefix + ' ' + hexPart + '|' + ascPart + '|');
    }
  }




































  printCyton = () => {
    //console.log({constants, debug, utilities});
  };

  //
  // INFINITE = () => {
  //   let num = 0;
  //
  //   setInterval(function () {
  //     this.startScan();
  //     num = (num + 1) % 4;
  //   }.bind(this), 9000);
  //
  // };
  //
  // handleAppStateChange(nextAppState) {
  //   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
  //     console.log('App has come to the foreground!')
  //     BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
  //       console.log('Connected peripherals: ' + peripheralsArray.length);
  //     });
  //   }
  //   this.setState({appState: nextAppState});
  // }
  //
  // componentWillUnmount() {
  //   this.handlerDiscover.remove();
  //   this.handlerStop.remove();
  //   this.handlerDisconnect.remove();
  //   this.handlerUpdate.remove();
  // }
  //
  // handleDisconnectedPeripheral(data) {
  //   let peripherals = this.state.peripherals;
  //   let peripheral = peripherals.get(data.peripheral);
  //   if (peripheral) {
  //     peripheral.connected = false;
  //     peripherals.set(RFDuinoID, peripheral);
  //     this.setState({peripherals});
  //   }
  //   console.log('Disconnected from ' + data.peripheral);
  // }
  //
  // static handleUpdateValueForCharacteristic(data) {
  //   console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  // }
  //
  // handleStopScan() {
  //   console.log('Scan is stopped');
  //   this.setState({ scanning: false });
  // }
  //
  // startScan() {
  //   if (!this.state.scanning) {
  //     this.setState({peripherals: new Map()});
  //     BleManager.scan([], 3, true).then((results) => {
  //       console.log('Scanning...');
  //       this.setState({scanning:true});
  //     });
  //   }
  // }
  //
  // retrieveConnected= () => {
  //   BleManager.getConnectedPeripherals([]).then((results) => {
  //     console.log(results);
  //     let peripherals = this.state.peripherals;
  //     for (let i = 0; i < results.length; i++) {
  //       let peripheral = results[i];
  //       peripheral.connected = true;
  //       peripherals.set(RFDuinoID, peripheral);
  //       this.setState({ peripherals });
  //     }
  //   });
  // }
  //
  // handleDiscoverPeripheral(peripheral){
  //   let peripherals = this.state.peripherals;
  //   if (!peripherals.has(RFDuinoID)){
  //     console.log('Got ble peripheral', peripheral);
  //     peripherals.set(RFDuinoID, peripheral);
  //     this.setState({ peripherals })
  //   }
  // }

  render() {
    return null;
  }
}
