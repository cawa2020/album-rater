import axios from "axios";

export function getSongsBySearch(search) {
    return _request(`search?q=${search}`, "GET")
}

export function getAlbumById(albumId) {
    return _request('album/' + albumId, "GET")
}

async function _request(path, method, body) {
    let headers = { "x-rapidapi-key": "5fc08ef08fmshf9cdb119b8e5e75p1cdd1bjsn8d758ad1be8a" };
    if (body) {
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }

    return axios({
        method: method,
        url: "https://thingproxy.freeboard.io/fetch/https://api.deezer.com/" + path,
        data: body,
        headers: headers
    }).then((res) => res.data)
}
