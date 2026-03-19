#include "pxt.h"
#if MICROBIT_CODAL
    #include <MicroBitPowerManager.h>
#endif

using namespace pxt;

namespace RibBit {

    //%
    bool isUsbPowered() {
        #if MICROBIT_CODAL
            MicroBitPowerSource source = uBit.power.getPowerSource();
            return source == PWR_USB_ONLY || source == PWR_USB_AND_BATT;
        #else
            return true;
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
