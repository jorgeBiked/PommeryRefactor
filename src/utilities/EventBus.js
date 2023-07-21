export default class EventBus {
  static getInstance() {
    if (typeof EventBus.instance === 'object') {
      return EventBus.instance;
    }
    return new EventBus();
  }

  constructor() {
    if (typeof EventBus.instance === 'object') {
      return EventBus.instance;
    }
    EventBus.instance = this;
    this.eventListeners = {};
  }

  /**
   * Trigger an event through the app
   * @param eventName
   * @param data
   */
  triggerEvent(eventName, data) {
    let listeners = this.eventListeners[eventName];
    if (Array.isArray(listeners)) {
      listeners.map(listener => {
        if (typeof listener === 'function') {
          listener(data);
        }
      })
    }
  }

  /**
   * Add a listener to the event
   * @param eventName
   * @param listener
   */
  addListener(eventName, listener) {
    let listeners = this.eventListeners[eventName];
    if (Array.isArray(listeners)) {
      listeners.push(listener);
    } else {
      this.eventListeners[eventName] = [listener];
    }
  }

  /**
   * Remove the listener
   * @param listener
   */
  removeListener(listener) {
    Object.keys(this.eventListeners).map(eventName => {
      let listeners = this.eventListeners[eventName];
      console.log("listeners: ", listeners);
      console.log("listener: ", listener);
      this._remove(listeners, listener);
      if (listeners.length === 0) {
        delete this.eventListeners[eventName];
      }
    })
  }

  /**
   * Remove all listeners
   * @param array
   * @param item
   * @private
   */
  _remove(array, item) {
    if (!array) return;
    for (let i = 0, l = array.length; i < l; i++) {
      if (item === array[i]) array.splice(i, 1);
    }
  }
}