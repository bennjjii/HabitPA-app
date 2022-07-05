const countCardsAfterDate = (
  history,
  card,
  inTimestamp,
  optionalOutTimestamp,
  enableLogging,
) => {
  if (enableLogging) {
    console.log('history', history);
    console.log('card', card);
    console.log('inTimeStamp', inTimestamp);
    console.log('optionalOutTimestamp', optionalOutTimestamp);
  }
  return history
    .filter(instance => {
      if (optionalOutTimestamp) {
        return (
          instance.timestamp.getTime() > inTimestamp.getTime() &&
          instance.timestamp.getTime() < optionalOutTimestamp.getTime()
        );
      } else {
        return instance.timestamp.getTime() > inTimestamp.getTime();
      }
    })
    .filter(instance => card.uuid === instance.uuid).length;
};

export default countCardsAfterDate;
