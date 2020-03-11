// Custom Http Module
function customHttp() {
    return {
        get(url, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.addEventListener("load", () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });

                xhr.addEventListener("error", () => {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                });

                xhr.send();
            } catch (error) {
                cb(error);
            }
        },

        post(url, body, headers, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                xhr.addEventListener("load", () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });

                xhr.addEventListener("error", () => {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                });

                if (headers) {
                    Object.entries(headers).forEach(([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    });
                }

                xhr.send(JSON.stringify(body));
            } catch (error) {
                cb(error);
            }
        }
    };
}
// Init http module
const http = customHttp();

const newService = (function() {
    const apiKey = "0d44fc89bd7846be9b87743835c33bd4";
    const apiUrl = "http://newsapi.org/v2";

    return {
        topHeadlines(country = "ua", cb) {
            http.get(
                `${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`,
                cb
            );
        },
        everything(query, cb) {
            http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb);
        }
    };
})();

//  init selects
document.addEventListener("DOMContentLoaded", function() {
    M.AutoInit();
    loadNews();
});

//load news function
function loadNews() {
    newService.topHeadlines('ua', onGetResponse);
}

//Function on get response from server
function onGetResponse(err, res) {
    console.log(res.articles);
}

//Function render news
function renderNews() {

}