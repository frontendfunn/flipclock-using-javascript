function generateTimeInfo() {
  const dateObj = new Date();
  const hrs = dateObj.getHours();
  const min = dateObj.getMinutes();
  const sec = dateObj.getSeconds();
  return {
    hours: {
      firstDigit: parseInt(hrs / 10),
      lastDigit: parseInt(hrs % 10),
    },
    minutes: {
      firstDigit: parseInt(min / 10),
      lastDigit: parseInt(min % 10),
    },
    seconds: {
      firstDigit: parseInt(sec / 10),
      lastDigit: parseInt(sec % 10),
    },
  };
}

$(document).ready(function () {
  $(".flip-clock").each(function (_, flipClock) {
    // generate handles for each flip element and its child elements
    const hoursFirst = createHandles($(flipClock).find(".hours-first"));
    const hoursLast = createHandles($(flipClock).find(".hours-last"));
    const minutesFirst = createHandles($(flipClock).find(".minutes-first"));
    const minutesLast = createHandles($(flipClock).find(".minutes-last"));
    const secondsFirst = createHandles($(flipClock).find(".seconds-first"));
    const secondsLast = createHandles($(flipClock).find(".seconds-last"));
    const intialTime = generateTimeInfo();
    setInitialValues(minutesFirst, intialTime.minutes.firstDigit);
    setInitialValues(minutesLast, intialTime.minutes.lastDigit);
    setInitialValues(secondsFirst, intialTime.seconds.firstDigit);
    setInitialValues(secondsLast, intialTime.seconds.lastDigit);
    setInitialValues(hoursFirst, intialTime.hours.firstDigit);
    setInitialValues(hoursLast, intialTime.hours.lastDigit);

    setInterval(() => {
      const time = generateTimeInfo();
      flipDigit(secondsLast, time.seconds.lastDigit);
      flipDigit(secondsFirst, time.seconds.firstDigit);
      flipDigit(minutesLast, time.minutes.lastDigit);
      flipDigit(minutesFirst, time.minutes.firstDigit);
      // flipDigit(hoursLast, time.hours.lastDigit);
      // flipDigit(hoursFirst, time.hours.firstDigit);
    }, 1000);
  });

  function setInitialValues(flipElement, initialValue) {
    const {
      flipperTop,
      flipperBottom,
      flipperDisplayBottom,
      flipperDisplayTop,
      flipHiddenInput,
    } = flipElement;
    flipperTop.text(initialValue);
    flipperBottom.text(initialValue);
    flipperDisplayBottom.text(initialValue);
    flipperDisplayTop.text(initialValue);
    flipHiddenInput.val(initialValue);
  }

  function createHandles(flipElement) {
    const flipperTop = flipElement.find(".flipper-top");
    const flipperBottom = flipElement.find(".flipper-bottom");
    const flipperDisplayTop = flipElement.find(".flip-display-top");
    const flipperDisplayBottom = flipElement.find(".flip-display-bottom");
    const flipHiddenInput = flipElement.find("[type='hidden']");
    return {
      flipElement,
      flipperTop,
      flipperBottom,
      flipperDisplayBottom,
      flipperDisplayTop,
      flipHiddenInput,
    };
  }

  function flipDigit(flipHandles, digitValue) {
    const {
      flipElement,
      flipperTop,
      flipperBottom,
      flipperDisplayBottom,
      flipperDisplayTop,
      flipHiddenInput,
    } = flipHandles;

    const setPreviousValue = (value) => {
      flipperTop.text(value);
      flipperDisplayBottom.text(value);
    };
    const setAfterValue = (value) => {
      flipperDisplayTop.text(value);
      flipperBottom.text(value);
    };

    if (parseInt(flipHiddenInput.val()) !== digitValue) {
      setPreviousValue(flipHiddenInput.val());
      flipHiddenInput.val(digitValue).trigger("valueChanged");
    }

    flipHiddenInput.one("valueChanged", () => {
      setAfterValue(flipHiddenInput.val());
      flipElement.addClass("play");
    });

    flipperBottom.one("animationend", () => {
      setAfterValue(flipHiddenInput.val());
      setPreviousValue(flipHiddenInput.val());
      flipElement.removeClass("play");
    });
  }
});
