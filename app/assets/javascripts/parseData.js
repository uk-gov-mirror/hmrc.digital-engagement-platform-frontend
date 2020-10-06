export function parseData(string) {
      var properties = string.split(', ');
      var parsedObject = {};
      properties.forEach((property) => {
        var tup = property.split(':');
        parsedObject[tup[0]] = tup[1]
      });
      return parsedObject
    }
  