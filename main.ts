namespace RibBit {
    const IRQPin = DigitalPin.P8;
    export const RIBBIT_ADDRESS = 0x10;
    export const RIBBIT_RTC_ADDRESS = 0x68;

    export enum OnOff {
        //% block="off"
        Off = 0,
        //% block="on"
        On = 1
    }

    export enum Button {
        //% block="L1"
        L1 = 0,

        //% block="L2"
        L2 = 1,

        //% block="L3"
        L3 = 2,

        //% block="R1"
        R1 = 5,

        //% block="R2"
        R2 = 4,

        //% block="R3"
        R3 = 3
    }

    export enum IRQ {
        NONE = 0x00,
        BUTTON = 0x01,
        GPS = 0x02,
        MBUS = 0x04,
        CAMERA = 0x08,
        LORA = 0x10
    }

    export enum Command {
        INVALID = 0x00,
        POWER_ENABLE = 0x01,
        POWER_DISABLE = 0x02,
        RESET_DEVICE = 0x03
    }

    export enum Device {
        INVALID = 0x00,
        GPS = 0x01,
        MBUS = 0x02,
        CAMERA = 0x03,
        LORA = 0x04,
        SD = 0x05
    }

    export enum DayOfWeek {
        //% block="Monday"
        Monday    = 1,

        //% block="Tuesday"
        Tuesday   = 2,

        //% block="Wednesday"
        Wednesday = 3,

        //% block="Thursday"
        Thursday  = 4,

        //% block="Friday"
        Friday    = 5,

        //% block="Saturday"
        Saturday  = 6,

        //% block="Sunday"
        Sunday    = 7
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

    export function ribbit_mBus_en(state: boolean) {
        if (state)
            ribbit_cmd( Device.MBUS, Command.POWER_ENABLE )
        else
            ribbit_cmd( Device.MBUS, Command.POWER_DISABLE )
    }

    export function ribbit_cmd(device: Device, command: Command) {
        const payload = Buffer.create(2)
        payload.setUint8(0, command);
        payload.setUint8(1, device);
        pins.i2cWriteBuffer(RIBBIT_ADDRESS, payload)
    }

    export function bcdToDec(bcd: number): number {
        return ((bcd >> 4) * 10) + (bcd & 0x0F)
    }

    export function decToBcd(dec: number): number {
        return ((Math.idiv(dec, 10) << 4) | (dec % 10))
    }

    export function dayToString( day: number = 1 ): string {
        switch( day ) {
            case DayOfWeek.Monday:    return "Monday";
            case DayOfWeek.Tuesday:   return "Tuesday";
            case DayOfWeek.Wednesday: return "Wednesday";
            case DayOfWeek.Thursday:  return "Thursday";
            case DayOfWeek.Friday:    return "Friday";
            case DayOfWeek.Saturday:  return "Saturday";
            case DayOfWeek.Sunday:    return "Sunday";
        }
        return "???";
    }

    // Event Handlers
    export const buttonPressHandlers: Array<() => void> = [undefined, undefined, undefined, undefined, undefined, undefined];
    export const buttonReleaseHandlers: Array<() => void> = [undefined, undefined, undefined, undefined, undefined, undefined];
    export let buttonEventHandler: (button: Button, state: boolean) => void = () => {};

    // Internal States
    const _powerState        = [ true, true, false, false, false, true ];  // Offsets map to the Device enum
    const _oldButtonState    = [ false, false, false, false, false, false ]; // Offsets map to the Button enum
    export const buttonState = [ false, false, false, false, false, false ]; // Offsets map to the Button enum

    // Neopixel Configuration
    export const leds = neopixel.create(DigitalPin.P16, 6, NeoPixelMode.RGB);
    leds.setBrightness(64);
    leds.clear();
    leds.show();

    pins.setPull(IRQPin, PinPullMode.PullUp);
    control.inBackground(() => {
        while (true) {
            // Do we have any pending interrupts?
            if (pins.digitalReadPin(IRQPin) == 0) {
                const data = pins.i2cReadBuffer(RIBBIT_ADDRESS, 16);

                switch (data.getUint8(0)) {
                    case IRQ.BUTTON:
                        buttonState[0] = (data.getUint8(1) & 0x01) == 0x01; // L1
                        buttonState[1] = (data.getUint8(1) & 0x02) == 0x02; // L2
                        buttonState[2] = (data.getUint8(1) & 0x04) == 0x04; // L3
                        buttonState[3] = (data.getUint8(1) & 0x20) == 0x20; // R1
                        buttonState[4] = (data.getUint8(1) & 0x10) == 0x10; // R2
                        buttonState[5] = (data.getUint8(1) & 0x08) == 0x08; // R3

                        serial.writeLine( buttonState.join(", ") );
                        break;

                    case IRQ.GPS:
                        const length = data.getUint8(1);
                        const text = data.slice(2, length).toString();
                        serial.writeLine(`GPS ${length}: ${text}`);
                        break;

                    default:
                        serial.writeLine(`??  ${data.toHex()}`);
                }

                // Handle any pending events
                for( let i=0; i<buttonState.length; i++ ) {
                    if( buttonState[i] != _oldButtonState[i] ) {
                        buttonEventHandler( i, buttonState[i] );
                        if( buttonState[i] ) {
                            if ( buttonPressHandlers[i] != undefined )
                                buttonPressHandlers[i]()
                        } else {
                            if (buttonReleaseHandlers[i] != undefined)
                                buttonReleaseHandlers[i]();
                        }

                        _oldButtonState[i] = buttonState[i];
                    }
                }
            }

            basic.pause(10);
        }
    });
}

//% block="Rib:Bit Basics"
//% color="#3ecb21"
//% icon="\u26A0"
//% groups=[ "Buttons", "Lights", "Time", "Extra" ]
namespace RibBitBasics {

    //% blockId="button_type"
    //% block=" %button"
    //% button.defl=RibBit.Button.L1
    //% group="Buttons"
    export function buttonVar( button: RibBit.Button ): RibBit.Button {
        return button;
    }

    //% blockId="button_state"
    //% block=" %state"
    //% state.defl=RibBit.ButtonState.Pressed
    //% group="Buttons"
    export function buttonState( state: RibBit.ButtonState ): boolean {
        return state == RibBit.ButtonState.Pressed;
    }

    //% blockId="ribbit_on_button_pressed"
    //% block="when $button is pressed"
    //% group="Buttons"
    export function onButtonPress( button: RibBit.Button, cb: () => void ): void {
        RibBit.buttonPressHandlers[button] = cb;
    }

    //% blockId="ribbit_on_button_released"
    //% block="when $button is released"
    //% group="Buttons"
    export function onButtonRelease( button: RibBit.Button, cb: () => void ): void {
        RibBit.buttonReleaseHandlers[button] = cb;
    }

    //% blockId="ribbit_on_button_event"
    //% block="when any button changes state"
    //% draggableParameters="reporter"
    //% state.shadow="button_state"
    //% group="Buttons"
    //% advanced="true"
    export function onButtonEvent(cb: (button: RibBit.Button, state: boolean) => void ): void {
        RibBit.buttonEventHandler = cb;
    }

    //% blockId="ribbit_is_button_state"
    //% block="is %button currently $state"
    //% button.shadow=button_type
    //% group="Buttons"
    export function isButtonState( button: number, state: RibBit.ButtonState ): boolean {
        const b = button as RibBit.Button;
        return RibBit.buttonState[b] == (state == RibBit.ButtonState.Pressed ? true : false);
    }

    //% blockId="ribbit_set_led_color"
    //% block="set %button to %color"
    //% button.shadow=button_type
    //% group="Lights"
    export function setLedColor( button: number, color: NeoPixelColors ): void {
        const b = button as RibBit.Button;
        RibBit.leds.setPixelColor( button, color );
        RibBit.leds.show();
    }

    //% blockId="ribbit_set_all_led_color"
    //% block="set every light to %color"
    //% group="Lights"
    export function setAllLedColor( color: NeoPixelColors ): void {
        for( let i=0; i<6; i++ )
            RibBit.leds.setPixelColor( i, color );
        RibBit.leds.show();
    }

    //% blockId="ribbit_set_light_brightness"
    //% block="set light brightness to $brightness"
    //% brightness.min=0
    //% brightness.max=255
    //% group="Lights"
    export function setLedBrightness( brightness: number = 64 ): void {
        RibBit.leds.setBrightness( brightness );
        RibBit.leds.show();
    }

    //% blockId="ribbit_neopixel_strip"
    //% block="neopixel strip"
    //% group="Lights"
    //% advanced="true"
    export function neopixels(): neopixel.Strip {
        return RibBit.leds;
    }

    //% blockId="ribbit_get_time"
    //% block="the current time"
    //% group="Time"
    export function getTime(): string {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x00, NumberFormat.UInt8BE, true); // Seconds register
        let data = pins.i2cReadBuffer(RibBit.RIBBIT_RTC_ADDRESS, 3)

        let seconds = RibBit.bcdToDec(data[0]);
        let minutes = RibBit.bcdToDec(data[1]);
        let hours = RibBit.bcdToDec(data[2] & 0x3F);

        return `${"0" + (hours).toString().slice(-2)}:${"0" + minutes.toString().slice(-2)}:${"0" + seconds.toString().slice(-2)}`;
    }

    //% blockId="ribbit_get_date"
    //% block="the current date"
    //% group="Time"
    export function getDate(): string {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x04, NumberFormat.UInt8BE, true); // Date register
        let data = pins.i2cReadBuffer(RibBit.RIBBIT_RTC_ADDRESS, 3)

        let date = RibBit.bcdToDec(data[0]);
        let month = RibBit.bcdToDec(data[1]);
        let year = 2000 + RibBit.bcdToDec(data[2]);

        return `${year}-${month}-${date}`
    }

    //% blockId="ribbit_get_day_of_week"
    //% block="the current weekday"
    //% group="Time"
    export function getDayOfWeek(): string {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x03, NumberFormat.UInt8BE, true); // Days register
        let day = pins.i2cReadNumber(RibBit.RIBBIT_RTC_ADDRESS, NumberFormat.UInt8BE);

        return RibBit.dayToString(day & 0x07);
    }

    //% blockId="ribbit_the_hour"
    //% block="the hour"
    //% group="Time"
    //% advanced="true"
    export function getHour(): number {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x02, NumberFormat.UInt8BE, true); // Hours register
        return RibBit.bcdToDec(pins.i2cReadNumber(RibBit.RIBBIT_RTC_ADDRESS, NumberFormat.UInt8BE) & 0x3F);
    }

    //% blockId="ribbit_the_minute"
    //% block="the minute"
    //% group="Time"
    //% advanced="true"
    export function getMinute(): number {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x01, NumberFormat.UInt8BE, true); // Minutes register
        return RibBit.bcdToDec(pins.i2cReadNumber(RibBit.RIBBIT_RTC_ADDRESS, NumberFormat.UInt8BE));
    }

    //% blockId="ribbit_the_second"
    //% block="the second"
    //% group="Time"
    //% advanced="true"
    export function getSecond(): number {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x00, NumberFormat.UInt8BE, true); // Seconds register
        return RibBit.bcdToDec(pins.i2cReadNumber(RibBit.RIBBIT_RTC_ADDRESS, NumberFormat.UInt8BE));
    }

    //% blockId="ribbit_the_year"
    //% block="the year"
    //% group="Time"
    //% advanced="true"
    export function getYear(): number {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x06, NumberFormat.UInt8BE, true); // Years register
        return 2000 + RibBit.bcdToDec(pins.i2cReadNumber(RibBit.RIBBIT_RTC_ADDRESS, NumberFormat.UInt8BE));
    }

    //% blockId="ribbit_the_month"
    //% block="the month"
    //% group="Time"
    //% advanced="true"
    export function getMonth(): RibBit.Month {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x05, NumberFormat.UInt8BE, true); // Months register
        return RibBit.bcdToDec(pins.i2cReadNumber(RibBit.RIBBIT_RTC_ADDRESS, NumberFormat.UInt8BE));
    }

    //% blockId="ribbit_the_date"
    //% block="the date"
    //% group="Time"
    //% advanced="true"
    export function getDayOfMonth(): number {
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, 0x04, NumberFormat.UInt8BE, true); // Hours register
        return RibBit.bcdToDec(pins.i2cReadNumber(RibBit.RIBBIT_RTC_ADDRESS, NumberFormat.UInt8BE));
    }

    //% blockId="ribbit_month_var"
    //% block="$month"
    //% group="Time"
    export function monthVar( month: RibBit.Month = RibBit.Month.January ): RibBit.Month {
        return month;
    }

    //% blockId="ribbit_day_var"
    //% block="$day"
    //% group="Time"
    export function dayVar( day: RibBit.DayOfWeek = RibBit.DayOfWeek.Monday): RibBit.DayOfWeek {
        return day;
    }

    //% blockId="ribbit_set_time"
    //% block="Set the clock to $hour-$minute-$second (hh:mm:ss) \u26A0"
    //% group="Time"
    export function setTime( hour: number = 0, minute: number = 0, second: number = 0 ): void {
        let buf = Buffer.fromArray([
            0x00,
            RibBit.decToBcd(second),
            RibBit.decToBcd(minute),
            RibBit.decToBcd(hour) & 0x3F           // 24-hour mode
        ]);
        pins.i2cWriteBuffer(RibBit.RIBBIT_RTC_ADDRESS, buf)
    }

    //% blockId="ribbit_set_date"
    //% block="Set the date to $year-$month-$day (yy:mm:dd)"
    //% group="Time"
    //% year.min=2000
    //% month.shadow="ribbit_month_var"
    export function setDate( year: number = 2000, month: number = 1, day: number = 1 ): void {
        let buf = Buffer.fromArray([
            0x04,
            RibBit.decToBcd(day),
            RibBit.decToBcd(month),
            RibBit.decToBcd(year - 2000)
        ]);
        pins.i2cWriteBuffer(RibBit.RIBBIT_RTC_ADDRESS, buf);
    }

    //% blockId="ribbit_set_day_of_week"
    //% block="Set the day of the week to $day"
    //% group="Time"
    //% day.shadow="ribbit_day_var"
    export function setDayOfWeek( day: number = 1 ): void {
        let buf = Buffer.fromArray([
            0x03,
            RibBit.decToBcd(day)
        ]);
        pins.i2cWriteBuffer(RibBit.RIBBIT_RTC_ADDRESS, buf);
    }

    //% blockId="ribbit_read_temperature"
    //% block="read RTC temperature in °C"
    //% group="Extra"
    //% advanced="true"
    export function readTemperature(): number {
        const TEMP_MSB = 0x11
        const TEMP_LSB = 0x12

        // Tell the RTC we want to read from 0x11
        pins.i2cWriteNumber(RibBit.RIBBIT_RTC_ADDRESS, TEMP_MSB, NumberFormat.UInt8BE, true)

        // Read two bytes
        let buf = pins.i2cReadBuffer(RibBit.RIBBIT_RTC_ADDRESS, 2)

        let msb = buf[0]      // signed integer
        let lsb = buf[1]      // fractional part in bits 7–6

        // Convert MSB to signed number (8-bit two's complement)
        if (msb & 0x80) {
            msb = msb - 0x100
        }

        // Fractional part: each bit = 0.25°C
        let fraction = (lsb >> 6) * 0.25

        return msb + fraction
    }

}

//% block="Rib:Bit LoRa Radio"
//% color="#7f1f00"
//% icon="\u26A0"
//% groups=[ "Group", "Send", "Recieve" ]
namespace RibBitRadio {
    //% block="switch LoRa radio $state \u26A0"
    export function switchLoRa(state: RibBit.OnOff = 1): void {
        return;
    }

    //% block="set LoRa group to $group \u26A0"
    export function setRadioGroup( group: number = 0 ): void {
        return;
    }

    //% block="LoRa group \u26A0"
    export function getRadioGroup(): number {
        return 0;
    }

    //% block "set LoRa power to $power \u26A0"
    //% power.min=0
    //% power.max=10
    //% group="Send"
    export function setRadioPower( power: number = 5 ): void {
        return;
    }

    //% block="LoRa send number $value \u26A0"
    //% group="Send"
    export function sendNumber( value: number = 0 ): void {
        return
    }

    //% block="LoRa send value $field = $value \u26A0"
    //% group="Send"
    //% value.shadow=math_number
    export function sendValue( field: string = "name", value: any = 0 ): void {
        return
    }

    //% block="LoRa send string $value \u26A0"
    //% group="Send"
    export function sendString( value: string = "" ): void {
        return
    }

    //% block="on LoRa number received \u26A0"
    //% draggableParameters="inline"
    //% group="Receive"
    export function onNumberReceived( cb: (value: number) => void ): void {
        return
    }

    //% block="on LoRa value received \u26A0"
    //% draggableParameters="inline"
    //% group="Receive"
    export function onValueReceived(cb: (field: string, value: any) => void): void {
        return
    }

    //% block="on LoRa string received \u26A0"
    //% draggableParameters="inline"
    //% group="Receive"
    export function onStringReceived(cb: (value: string) => void): void {
        return
    }
}

//% block="Rib:Bit GPS"
//% color="#0dcfae"
//% icon="\u26A0"
//% groups=[ "Time Functions","Spatial Functions" ]
namespace RibBitGPS {
    //% block="switch gps $state \u26A0"
    export function switchGPS(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return
    }

    //% block="is GPS on? \u26A0"
    //% advanced="true"
    export function isGPSOn(): boolean {
        return false;
    }

    //% block="on a position update \u26A0"
    //% group="Spatial Functions"
    export function on2DPositionUpdate( cb: () => void ): void {
        return
    }

    //% block="accuracy \u26A0"
    //% group="Spatial Functions"
    export function getAccuracy(): number {
        return 10;
    }

    //% block="latitude \u26A0"
    //% group="Spatial Functions"
    export function getLatitude(): number {
        return 0;
    }

    //% block="longitude \u26A0"
    //% group="Spatial Functions"
    export function getLongitude(): number {
        return 0;
    }

    //% block="altitude \u26A0"
    //% group="Spatial Functions"
    export function getAltitude(): number {
        return 0;
    }

    //% block="on a time update \u26A0"
    //% group="Time Functions"
    export function onTimeUpdate( cb: () => void ): void {
        return
    }

    //% block="the current time \u26A0"
    //% group="Time Functions"
    export function getTime(): string {
        return "hh:mm:ss";
    }

    //% block="the current date \u26A0"
    //% group="Time Functions"
    export function getDate(): string {
        return "YYYY:MM:DD";
    }

    //% block="the hour \u26A0"
    //% group="Time Functions"
    //% advanced="true"
    export function getHour(): number {
        return 0;
    }

    //% block="the minute \u26A0"
    //% group="Time Functions"
    //% advanced="true"
    export function getMinute(): number {
        return 0;
    }

    //% block="the second \u26A0"
    //% group="Time Functions"
    //% advanced="true"
    export function getSecond(): number {
        return 0;
    }

    //% block="save GPS time \u26A0"
    //% group="Time Functions"
    export function saveGPSTime(): void {
        return;
    }
}

//% block="Rib:Bit MicroBus"
//% color="#7b7ff2"
//% icon="\u26A0"
//% groups=[ "Serial Port", "Pin Functions" ]
namespace RibBitMBus {
    //% block="switch microbus $state \u26A0"
    export function switchMBus(state: RibBit.OnOff = RibBit.OnOff.On): void {
        RibBit.ribbit_mBus_en( state == RibBit.OnOff.On );
    }

    //% block="mikroBUS serial write line $text \u26A0"
    //% group="Serial Port"
    export function serialWriteLine(text: string): void {
        return serialWriteString( `${text}\n` );
    }

    //% block="mikroBUS serial write value $field = $value \u26A0"
    //% group="Serial Port"
    //% value.shadow=math_number
    export function serialWriteValue(field: string, value:any): void {
        return;
    }

    //% block="mikroBUS serial write number $value \u26A0"
    //% group="Serial Port"
    export function serialWriteNumber( value: number = 0 ): void {
        return;
    }

    //% block="mikroBUS serial write string $text \u26A0"
    //% group="Serial Port"
    export function serialWriteString( text: string ): void {
        return;
    }

    //% block="mikroBUS serial write numbers $values \u26A0"
    //% group="Serial Port"
    export function serialWriteNumbers( values: Array<number> ): void {
        return serialWriteString( `${values.join(", ")}\n` );
    }

    //% block="mikroBUS serial read line \u26A0"
    //% group="Serial Port"
    export function serialReadLine(): string {
        return "";
    }

    //% block="mikroBUS serial read until $delimiter \u26A0"
    //% group="Serial Port"
    export function serialReadUntil( delimiter: string ): string {
        return "";
    }

    //% block="mikroBUS serial read string \u26A0"
    //% group="Serial Port"
    export function serialReadString(): string {
        return "";
    }

    //% block="set mikroBUS serial baud to $baud \u26A0"
    //% group="Serial Port"
    //% advanced="true"
    export function serialSetBaud( baud: number = 9600 ): void {
        return;
    }

    //% block="on mikroBUS string received \u26A0"
    //% draggableParameters="inline"
    //% group="Serial Port"
    //% advanced="true"
    export function onStringReceived(cb: (text: string) => void): void {
        return
    }

    //% block="on mikroBUS $delimiter received \u26A0"
    //% draggableParameters="inline"
    //% group="Serial Port"
    //% advanced="true"
    export function onDelimiterReceived(cb: (text: string) => void, delimiter: string = "\n"): void {
        return
    }

    //% block="mikroBUS serial bytes available \u26A0"
    //% group="Serial Port"
    export function getBytesAvailable(): number {
        return 0;
    }

    //% block="set mikroBUS PWM pin to $value \u26A0"
    //% value.min=0
    //% value.max=255
    //% group="Pin Functions"
    export function setPWMPin(value: number = 128): void {
        return;
    }

    //% block="mikroBUS analog pin value \u26A0"
    //% group="Pin Functions"
    export function analogRead(): number {
        return pins.analogReadPin(AnalogPin.P2);
    }

    //% block="mikroBUS analog pin set value to $value \u26A0"
    //% group="Pin Functions"
    export function analogWrite(value: number = 0): void {
        return;
    }

    //% block="set select line to $state \u26A0"
    //% group="Pin Functions"
    //% advanced="true"
    export function spiSelectMBus(state: boolean): void {
        return;
    }
}

//% block="Rib:Bit Storage"
//% color="#c47122"
//% icon="\u26A0"
//% groups=[ "Files", "Data" ]
namespace RibBitSD {
    //% block="switch microSD card $state \u26A0"
    export function switchSD(state: RibBit.OnOff = RibBit.OnOff.On): void {
        return
    }

    //% block="create a new log called $name \u26A0"
    //% group="Files"
    export function setLogName( name: string = "newlog" ): void {
        return;
    }

    //% block="uSD card present \u26A0"
    //% advanced="true"
    export function isSDPresent(): boolean {
        return false;
    }

    //% block="log data $data \u26A0"
    //% group="Data"
    export function logData( data: any ): void {
        return;
    }
}