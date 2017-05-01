class Requester {
  constructor() {}

  get(url, type) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: 'GET',
        contextType: type,
        success: function(data) {
          resolve(data);
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  }

  getFromOMDB(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          resolve(data);
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  }
}

const requester = new Requester();

export { requester };
