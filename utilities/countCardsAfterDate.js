const countCardsAfterDate = (
  history,
  card,
  inTimestamp,
  optionalOutTimestamp,
) => {
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
