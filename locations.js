var fetchUrl = function () {
    const baseUrl = 'https://www.facebook.com/places/'
    const anchorElem = document.getElementsByTagName('a');
    var places = {};
    for (let i = 0; i < anchorElem.length; i++) {
        let link = anchorElem[i].href;
        let name = anchorElem[i].innerText;
        if (link.includes(baseUrl)) {
            let id = link.substring(link.length - 16, link.length - 1)
            let data = {
                "name": name,
                'url': link
            }
            places[id] = data;
        }

    }
    return places;
}

