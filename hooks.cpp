#include "pxt.h"

using namespace pxt;

namespace RibBit {

    //%
    bool isUsbPowered() {
        #if MICROBIT_CODAL
            #ifndef MICROBIT_PIN_VUSB
                #define MICROBIT_PIN_VUSB 34
            #endif
            static NRF52Pin vusbPin(ID_PIN_VUSB, MICROBIT_PIN_VUSB, PIN_CAPABILITY_DIGITAL);
            return vusbPin.getDigitalValue() == 1;
        #else
            return false;
        #endif
    }

}
