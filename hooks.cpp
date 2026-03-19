#include "pxt.h"

using namespace pxt;

namespace RibBit {

    //%
    bool isUsbPowered() {
        #if MICROBIT_CODAL
            return uBit.power.isUSBConnected();
        #else
            return false;
        #endif
    }

    //%
    bool isCODAL() {
        #if MICROBIT_CODAL
            return true;
        #else
            return false;
        #endif
    }

}
