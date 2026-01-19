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

//% block="Rib:Bit Radio"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[]
namespace RibBitRadio {
    //% block="switch LoRa radio $state"
    export function switchLoRa(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return
    }
}

//% block="Rib:Bit GPS"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=["Time Functions","Spatial Functions"]
namespace RibBitGPS {
    //% block="switch gps $state"
    export function switchGPS(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return
    }

    //% block="on a position update"
    //% draggableParameters="reporter"
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

    //% block="the current time"
    //% group="Time Functions"
    export function getTime(): string {
        return "hh:mm:ss";
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