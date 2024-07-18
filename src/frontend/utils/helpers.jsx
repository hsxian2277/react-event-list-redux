// Validate input fields
export const validateInput = (event) => {
  // Checking if all fields exist
  if (!Object.getOwnPropertyNames(event).includes('eventName') ||
      !Object.getOwnPropertyNames(event).includes('startDate') ||
      !Object.getOwnPropertyNames(event).includes('endDate')) {
    return false;
  }

  // Checking if all fields has value
  for (const prop in event) {
    if (!event[prop]) {
      return false;
    }
  }

  return true;
};
