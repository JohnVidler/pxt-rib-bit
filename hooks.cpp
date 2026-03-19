#include "pxt.h"
#include "MicroBitPowerManager.h"

using namespace pxt;

namespace RibBit {

    //%
    bool isUsbPowered() {
        MicroBitPowerSource source = uBit.power.getPowerSource();
        #if MICROBIT_CODAL
            return source == PWR_USB_ONLY || source == PWR_USB_AND_BATT;
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
