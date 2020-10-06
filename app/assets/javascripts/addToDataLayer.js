import * as parser from './parseData'

export function addToDataLayer (status, elToAdd) {
    w.dataLayer = w.dataLayer || [];
    var localData = d.querySelectorAll('[data-gtag]');
  
    var localObj = {
      'event': 'DOMContentLoaded',
      'Status': status,
      'ID' : el,
      'Session ID': new Date().getTime() + '.' + Math.random().toString(36).substring(5),
      'Hit TimeStamp': new Date().toUTCString()
    };
  
    Array.prototype.forEach.call(localData, function (elToAdd, i) {
      localObj = Object.assign(localObj, parser.parseData(elToAdd.getAttribute('data-gtag')))
    });
  
    w.dataLayer.push(localObj);
  }