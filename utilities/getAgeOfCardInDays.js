const DAY_IN_MILLISECONDS = 86400000;

const getAgeOfCardInDays = (timeStampCreated, optionalClampAgeInDays) => {
  if (optionalClampAgeInDays) {
    return Math.min(
      Math.round(
        (new Date(new Date().setHours(0, 0, 0, 0)).getTime() -
          new Date(new Date(timeStampCreated).setHours(0, 0, 0, 0)).getTime()) /
          DAY_IN_MILLISECONDS,
      ),
      optionalClampAgeInDays,
    );
  } else {
    return Math.round(
      (new Date(new Date().setHours(0, 0, 0, 0)).getTime() -
        new Date(new Date(timeStampCreated).setHours(0, 0, 0, 0)).getTime()) /
        DAY_IN_MILLISECONDS,
    );
  }
};

export default getAgeOfCardInDays;
