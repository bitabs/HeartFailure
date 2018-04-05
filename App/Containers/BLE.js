import React, { Component } from 'react';

// predefined component from react
import {
  NativeEventEmitter, NativeAppEventEmitter,
  NativeModules, Platform, AppState, Text,
  PermissionsAndroid, TouchableOpacity
} from 'react-native';


// to convert char to byte array
import { stringToBytes } from 'convert-string';

// the library for BLE connection
import BleManager from "react-native-ble-manager";


// some constant variables
const

  // We need the BleManager from the native module for BLE connection
  BleManagerModule = NativeModules.BleManager,

  // We need emitters to attach them to the app
  bleManagerEmitter = new NativeEventEmitter(BleManagerModule),

  // the mac id of the OpenBCI board
  RFDuinoID = "CF:92:02:BC:0D:CE"
;

/**
 * This component will pair with the board via BLE and try get
 * data from BLE board
 * ==============================================================
 */
export default class BLE extends Component {
  constructor(props) {
    super(props);

    /**
     * The component needs to know whether we are scanning or not. Keep a record
     * of visible devices, and the current app state.
     * @type {{scanning: boolean, peripherals: Map, appState: string}}
     */
    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: ''
    };


    // deals with devices that are discovered
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

    // deals with scanning. I.e. initiate scanning or stop it
    this.handleStopScan = this.handleStopScan.bind(this);

    // deals with the characteristics from BLE
    BLE.handleUpdateValueForCharacteristic = BLE.handleUpdateValueForCharacteristic.bind(this);

    // deals with disconnecting certain device
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);

    // handles the app state
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {

    // first we need to ensure that the scanning happens only after the app is in foreground state
    AppState.addEventListener('change', this.handleAppStateChange);

    // launch the package and ensure that it has been launched and ready
    BleManager.start({showAlert: false}).catch(e => console.error("module initialised"));

    // when a device has been discovered, call the method
    this.handlerDiscover = bleManagerEmitter.addListener (
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral
    );

    // when the scan has stopped, call the method
    this.handlerStop = bleManagerEmitter.addListener (
      'BleManagerStopScan',
      this.handleStopScan
    );

    // when a device has been disconnected, call the method
    this.handlerDisconnect = bleManagerEmitter.addListener (
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectedPeripheral
    );

    // when the device emits BLE characteristics, call the method
    this.handlerUpdate = bleManagerEmitter.addListener (
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic
    );

    // in android, we have to specify to allow BLE
    this.platformPermissionRequest();

    // initiate the scanning for devices
    this.startScan();

    /**
     * Before using BLE, we first have to scan, and then call .connect();
     * and pass the mac id of our board. Once connected, the second phase of BLE
     * is to get our boards services. If services are returned, the next phase will
     * be to get the characteristics. But before doing that, we need to tell the device
     * to notify of any new data.
     */
    BleManager.connect(RFDuinoID).then(() => {
      return BleManager.retrieveServices(RFDuinoID)
    }).then(() => {
      return BleManager.startNotification(
        RFDuinoID,
        '00002220-0000-1000-8000-00805F9B34FB',
        '00002221-0000-1000-8000-00805F9B34FB'
      );
    }).then(() => {
      return NativeAppEventEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic', data => {}
        )
    }).catch(e => console.log(e));
  }

  /**
   * In android platform, we have to notify our device to allow the
   * app and search for BLE devices for connection
   * ==============================================================
   */
  platformPermissionRequest = () => {

    // we are in android platform with v.23 and above
    if (Platform.OS === 'android' && Platform.Version >= 23) {

      // to give permission, we need PermissionsAndroid package
      const { PERMISSIONS } = PermissionsAndroid;

      // we first have to modify our android program to allow ACCESS_COARSE_LOCATION
      PermissionsAndroid.check(PERMISSIONS.ACCESS_COARSE_LOCATION).then(result => !result
        ? PermissionsAndroid.requestPermission(
          PERMISSIONS.ACCESS_COARSE_LOCATION
        ).then((result) => {}): null
      );
    }
  };

  /**
   * When the device is connected, we have to tell the app that is
   * active or inactive so that no other devices can join
   * ==============================================================
   * @param nextAppState
   */
  handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {});
    }
    this.setState({appState: nextAppState});
  };

  /**
   * When this component is unmounted, it is crucial to remove all
   * the listeners as it will affect the app performance
   * ==============================================================
   */
  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  /**
   * To disconnect from a particular device, call this method. It
   * will disconnect and update the state object so that the entire
   * component knows that the device is no longer connected
   * ==============================================================
   * @param data
   */
  handleDisconnectedPeripheral = data => {

    // get the list of devices
    let peripherals = this.state.peripherals;

    // get the particular device
    let peripheral = peripherals.get(data.peripheral);

    // if it exists
    if (peripheral) {

      // disconnect it
      peripheral.connected = false;

      // remove it
      peripherals.set(RFDuinoID, peripheral);

      // and push the modified object back to state
      this.setState({peripherals});
    }
  };

  /**
   * This method will print out the characters that the device is
   * trying to emit
   * ==============================================================
   * @param data
   */
  static handleUpdateValueForCharacteristic = data => ({
    peripheral      : data['peripheral'],
    characteristic  : data['characteristic'],
    value           : data['value']
  });

  /**
   * This method stop scanning
   * ==============================================================
   */
  handleStopScan = () => this.setState({ scanning: false });

  /**
   * This method will start scanning
   * ==============================================================
   */
  startScan = () => {

    // first let us check that we arne't already scanning
    if (!this.state.scanning) {

      // let us clear the device list
      this.setState({peripherals: new Map()});

      // initiate the scan and only return max of 3 discovered devices
      BleManager.scan([], 3, true).then(() => this.setState({
        scanning: true
      }));
    }
  };

  /**
   * Return the devices that are connected
   * ==============================================================
   */
  retrieveConnected = () => BleManager.getConnectedPeripherals([]).then((results) => {

    // fetch the device list
    let {peripherals} = this.state;

    for (let i = 0; i < results.length; i++) {
      // get the device
      let peripheral = results[i];

      // set the connection to true
      peripheral.connected = true;

      // put it into list of devices
      peripherals.set(RFDuinoID, peripheral);

      // push that to the state
      this.setState({ peripherals });
    }
  });

  /**
   * Handles devices that are connected
   * ==============================================================
   * @param peripheral
   */
  handleDiscoverPeripheral = peripheral => {

    // get the list of devices
    let {peripherals} = this.state;

    // if the device doesn't contain our board
    if (!peripherals.has(RFDuinoID)) {

      // then add it to the list of devices
      peripherals.set(RFDuinoID, peripheral);

      // and push it back to state
      this.setState({ peripherals })
    }
  };

  /**
   * This method will communicate to the board by passing a
   * series of commands
   * ==============================================================
   */
  write = () => {

    // 'b' => special command for starting data transferal
    const BCommand = stringToBytes('b');
    BleManager.write(
      RFDuinoID,
      '00002220-0000-1000-8000-00805F9B34FB',
      '00002222-0000-1000-8000-00805F9B34FB',
      BCommand
    ).catch(e => console.error("Error on write(): ", e));
  };

  /**
   * Return the entire component when it is mounted and ready
   * ==============================================================
   * @return {XML}
   */
  render() {
    return (
      <TouchableOpacity onPress={() => this.write()}>
        <Text>CLick me</Text>
      </TouchableOpacity>
    );
  }
}
