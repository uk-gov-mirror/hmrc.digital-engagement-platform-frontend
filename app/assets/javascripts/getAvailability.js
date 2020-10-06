export function getAvailability(nuanceText) {
    var availability;

    if (nuanceText === "Advisers are available to chat.") {
      availability = 'Ready';
    } else if (nuanceText === "All of our advisers are busy at the moment. Keep checking this page until the 'speak to an adviser' link becomes available.") {
      availability = 'Busy';
    } else if (nuanceText === "You are in a webchat.") {
      availability = 'In Progress';
    } else if (nuanceText === "Our webchat is now closed.") {
      availability = 'Offline';
    } else if (nuanceText === "You are in a webchat. If you cannot access it, you may have another chat window open.") {
      availability = 'In Chat';
    } else {
      availability = 'Not Responding';
    }

    return availability;
  }