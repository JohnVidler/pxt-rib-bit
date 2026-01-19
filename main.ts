namespace RibBit {

    export enum OnOff {
        //% block="off"
        Off = 0,
        //% block="on"
        On = 1
    }
}

//% block="Rib:Bit Camera"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[]
namespace RibBitCamera {
    //% block="switch camera $state"
    export function switchCamera(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return
    }
}

//% block="Rib:Bit LoRa Radio"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[ "Group", "Send", "Recieve" ]
namespace RibBitRadio {
    //% block="switch LoRa radio $state"
    export function switchLoRa(state: RibBit.OnOff = 1): void {
        return;
    }

    //% block="set LoRa group to $group"
    export function setRadioGroup( group: number = 0 ): void {
        return;
    }

    //% block="LoRa group"
    export function getRadioGroup(): number {
        return 0;
    }

    //% block "set LoRa power to $power"
    //% power.min=0
    //% power.max=10
    //% group="Send"
    export function setRadioPower( power: number = 5 ): void {
        return;
    }

    //% block="LoRa send number $value"
    //% group="Send"
    export function sendNumber( value: number = 0 ): void {
        return
    }

    //% block="LoRa send value $field = $value"
    //% group="Send"
    export function sendValue( field: string = "name", value: any = 0 ): void {
        return
    }

    //% block="LoRa send string $value"
    //% group="Send"
    export function sendString( value: string = "" ): void {
        return
    }

    //% block="on LoRa number received"
    //% draggableParameters="inline"
    //% group="Receive"
    export function onNumberReceived( cb: (value: number) => {} ): void {
        return
    }

    //% block="on LoRa value received"
    //% draggableParameters="inline"
    //% group="Receive"
    export function onValueReceived(cb: (field: string, value: any) => {}): void {
        return
    }

    //% block="on LoRa string received"
    //% draggableParameters="inline"
    //% group="Receive"
    export function onStringReceived(cb: (value: string) => {}): void {
        return
    }
}

//% block="Rib:Bit GPS"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[ "Time Functions","Spatial Functions" ]
namespace RibBitGPS {
    //% block="switch gps $state"
    export function switchGPS(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return
    }

    //% block="is GPS on?"
    //% advanced="true"
    export function isGPSOn(): boolean {
        return false;
    }

    //% block="on a position update"
    //% group="Spatial Functions"
    export function on2DPositionUpdate( cb: () => {} ): void {
        return
    }

    //% block="accuracy"
    //% group="Spatial Functions"
    export function getAccuracy(): number {
        return 10;
    }

    //% block="latitude"
    //% group="Spatial Functions"
    export function getLatitude(): number {
        return 0;
    }

    //% block="longitude"
    //% group="Spatial Functions"
    export function getLongitude(): number {
        return 0;
    }

    //% block="altitude"
    //% group="Spatial Functions"
    export function getAltitude(): number {
        return 0;
    }

    //% block="on a time update"
    //% group="Time Functions"
    export function onTimeUpdate( cb: () => {} ): void {
        return
    }

    //% block="the current time"
    //% group="Time Functions"
    export function getTime(): string {
        return "hh:mm:ss";
    }

    //% block="the current date"
    //% group="Time Functions"
    export function getDate(): string {
        return "YYYY:MM:DD";
    }

    //% block="the hour"
    //% group="Time Functions"
    //% advanced="true"
    export function getHour(): number {
        return 0;
    }

    //% block="the minute"
    //% group="Time Functions"
    //% advanced="true"
    export function getMinute(): number {
        return 0;
    }

    //% block="the second"
    //% group="Time Functions"
    //% advanced="true"
    export function getSecond(): number {
        return 0;
    }
}

//% block="Rib:Bit MicroBus"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[]
namespace RibBitMBus {
    //% block="switch microbus $state"
    export function switchMBus(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return
    }
}

//% block="Rib:Bit Storage"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[]
namespace RibBitSD {
    //% block="switch microSD card $state"
    export function switchSD(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return
    }
}