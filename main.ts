namespace RibBit {

    export enum OnOff {
        //% block="off"
        Off = 0,
        //% block="on"
        On = 1
    }

    export enum Button {
        L1 = 0,
        L2 = 1,
        L3 = 2,
        R3 = 3,
        R2 = 4,
        R1 = 5
    }

    export enum ButtonState {
        //% block="released"
        Released = 0,

        //% block="pressed"
        Pressed = 1
    }

    export enum Month {
        //% block="January"
        January = 1,

        //% block="February"
        February = 2,

        //% block="March"
        March = 3,

        //% block="April"
        April = 4,

        //% block="May"
        May = 5,

        //% block="June"
        June = 6,

        //% block="July"
        July = 7,

        //% block="August"
        August = 8,

        //% block="September"
        September = 9,

        //% block="October"
        October = 10,

        //% block="November"
        November = 11,

        //% block="December"
        December = 12
    }

}

//% block="Rib:Bit Basics"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[ "Buttons", "Lights", "Time" ]
namespace RibBitBasics {

    //% block="when $button is pressed"
    //% group="Buttons"
    export function onButtonPress( button: RibBit.Button, cb: () => {} ): void {
        return;
    }

    //% block="when $button is released"
    //% group="Buttons"
    export function onButtonRelease( button: RibBit.Button, cb: () => {} ): void {
        return;
    }

    //% block="when any button is pressed"
    //% group="Buttons"
    //% advanced="true"
    export function onButtonPressEvent( cb: (button: RibBit.Button ) => {} ): void {
        return;
    }

    //% block="when any button is released"
    //% group="Buttons"
    //% advanced="true"
    export function onButtonReleaseEvent( cb: (button: RibBit.Button) => {} ): void {
        return;
    }

    //% block="is %button currently $state"
    //% group="Buttons"
    export function isButtonState( button: RibBit.Button, state: RibBit.ButtonState ): boolean {
        return false;
    }

    //% block="set $button to $color"
    //% group="Lights"
    export function setLedColor( button: RibBit.Button, color: NeoPixelColors ): void {
        return;
    }

    //% block="set light brightness to $brightness"
    //% brightness.min=0
    //% brightness.max=255
    //% group="Lights"
    export function setLedBrightness( brightness: number = 64 ): void {
        return;
    }

    //% block="neopixel strip"
    //% group="Lights"
    //% advanced="true"
    export function neopixels(): neopixel.Strip {
        return null;
    }

    //% block="the current time"
    //% group="Time"
    export function getTime(): string {
        return "hh:mm:ss";
    }

    //% block="the current date"
    //% group="Time"
    export function getDate(): string {
        return "YYYY:MM:DD";
    }

    //% block="the hour"
    //% group="Time"
    //% advanced="true"
    export function getHour(): number {
        return 0;
    }

    //% block="the minute"
    //% group="Time"
    //% advanced="true"
    export function getMinute(): number {
        return 0;
    }

    //% block="the second"
    //% group="Time"
    //% advanced="true"
    export function getSecond(): number {
        return 0;
    }

    //% block="the year"
    //% group="Time"
    //% advanced="true"
    export function getYear(): number {
        return 0;
    }

    //% block="the month"
    //% group="Time"
    //% advanced="true"
    export function getMonth(): RibBit.Month {
        return RibBit.Month.January;
    }

    //% block="the year"
    //% group="Time"
    //% advanced="true"
    export function getDay(): number {
        return 0;
    }

    //% block="$month"
    //% group="Time"
    //% advanced="true"
    export function month( month: RibBit.Month = RibBit.Month.January ): RibBit.Month {
        return month;
    }

    //% block="Set the clock to $hour:$minute:$second (hh:mm:ss)"
    //% group="Time"
    export function setTime( hour: number = 0, minute: number = 0, second: number = 0 ): void {
        return;
    }

    //% block="Set the date to $year:$month:$day (yyyy:mm:dd)"
    //% group="Time"
    //% draggableParameters="reporter"
    //% month.shadow="month"
    //% day.min=1
    //% year.defl 2000
    export function setDate( year: number = 2000, month: RibBit.Month = RibBit.Month.January, day: number = 1 ): void {
        return;
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
    //% value.shadow=math_number
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

    //% block="save GPS time"
    //% group="Time Functions"
    export function saveGPSTime(): void {
        return;
    }
}

//% block="Rib:Bit MicroBus"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[ "Serial Port", "Pin Functions" ]
namespace RibBitMBus {
    //% block="switch microbus $state"
    export function switchMBus(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return;
    }

    //% block="mikroBUS serial write line $text"
    //% group="Serial Port"
    export function serialWriteLine(text: string): void {
        return serialWriteString( `${text}\n` );
    }

    //% block="mikroBUS serial write value $field = $value"
    //% group="Serial Port"
    //% value.shadow=math_number
    export function serialWriteValue(field: string, value:any): void {
        return;
    }

    //% block="mikroBUS serial write number $value"
    //% group="Serial Port"
    export function serialWriteNumber( value: number = 0 ): void {
        return;
    }

    //% block="mikroBUS serial write string $text"
    //% group="Serial Port"
    export function serialWriteString( text: string ): void {
        return;
    }

    //% block="mikroBUS serial write numbers $values"
    //% group="Serial Port"
    export function serialWriteNumbers( values: Array<number> ): void {
        return serialWriteString( `${values.join(", ")}\n` );
    }

    //% block="mikroBUS serial read line"
    //% group="Serial Port"
    export function serialReadLine(): string {
        return "";
    }

    //% block="mikroBUS serial read until $delimiter"
    //% group="Serial Port"
    export function serialReadUntil( delimiter: string ): string {
        return "";
    }

    //% block="mikroBUS serial read string"
    //% group="Serial Port"
    export function serialReadString(): string {
        return "";
    }

    //% block="set mikroBUS serial baud to $baud"
    //% group="Serial Port"
    //% advanced="true"
    export function serialSetBaud( baud: number = 9600 ): void {
        return;
    }

    //% block="on mikroBUS string received"
    //% draggableParameters="inline"
    //% group="Serial Port"
    //% advanced="true"
    export function onStringReceived(cb: (text: string) => {}): void {
        return
    }

    //% block="on mikroBUS $delimiter received"
    //% draggableParameters="inline"
    //% group="Serial Port"
    //% advanced="true"
    export function onDelimiterReceived(cb: (text: string) => {}, delimiter: string = "\n"): void {
        return
    }

    //% block="mikroBUS serial bytes available"
    //% group="Serial Port"
    export function getBytesAvailable(): number {
        return 0;
    }

    //% block="set mikroBUS PWM pin to $value"
    //% value.min=0
    //% value.max=255
    //% group="Pin Functions"
    export function setPWMPin(value: number = 128): void {
        return;
    }

    //% block="mikroBUS analog pin value"
    //% group="Pin Functions"
    export function analogRead(): number {
        return pins.analogReadPin(AnalogPin.P2);
    }

    //% block="mikroBUS analog pin set value to $value"
    //% group="Pin Functions"
    export function analogWrite(value: number = 0): void {
        return;
    }

    //% block="set select line to $state"
    //% group="Pin Functions"
    //% advanced="true"
    export function spiSelectMBus(state: boolean): void {
        return;
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

    export function logData(  ): void {
        return;
    }
}