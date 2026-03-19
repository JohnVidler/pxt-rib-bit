#pragma once;

#include "pxt.h"

using namespace pxt;

namespace ribbit {

  bool isUsbPowered() {
    #if MICROBIT_CODAL
      static NRF52Pin vusbPin(MICROBIT_PIN_VUSB);
      return vusbPin.getDigitalValue() == 1;
    #else
      return false;
    #endif
  }

}
