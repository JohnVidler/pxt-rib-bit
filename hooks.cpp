#include "pxt.h"

using namespace pxt;

namespace RibBit {

    //%
    bool isUsbPowered() {
        #if MICROBIT_CODAL
            static NRF52Pin vusbPin(DEVICE_ID_IO_P0 + 34, 34, PIN_CAPABILITY_DIGITAL);
            return vusbPin.getDigitalValue() == 1;
        #else
            return false;
        #endif
    }

}
