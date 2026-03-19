#include "pxt.h"
#include "MicroBitPowerManager.h"

using namespace pxt;

namespace RibBit {

    //%
    bool isUsbPowered() {
        MicroBitPowerSource source = uBit.power.getPowerSource();
        #if MICROBIT_CODAL
            return (source == MicroBitPowerSource.PWR_USB_ONLY || source == MicroBitPowerSource.PWR_USB_AND_BATT);
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
