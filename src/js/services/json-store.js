class JsonStore {
    get(id, inputCallback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.myjson.com/bins/' + id, true);
        const callback = (data) => {
            data = JSON.parse(data);
            inputCallback(data);
        };
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.send();
    }
}


module.exports = JsonStore;