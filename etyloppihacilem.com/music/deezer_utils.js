function requete(req, callback, args = null) {
    DZ.api(req, function (res) {
        if (args == null) {
            callback(res)
        } else {
            callback(res, args)
        }
    })
}
function setCookie(key, value) {
    document.cookie =
        key +
        "=" +
        value +
        "; " +
        "expires=" +
        new Date(new Date().setMonth(new Date().getMonth() + 1)).toUTCString() +
        "; SameSite=Strict; "
}
function getCookie(key = undefined) {
    var cookies = document.cookie.split("; ")
    var toReturn = {}
    for (item of cookies) {
        var split = item.split("=")
        toReturn[split[0]] = split[1]
    }
    delete toReturn[""]
    if (key == undefined) {
        return toReturn
    }
    try {
        return toReturn[key]
    } catch (e) {
        console.log(e)
        return undefined
    }
}
function deleteCookie(key) {
    document.cookie = key + "=; " + "expires=" + new Date().toUTCString() + "; SameSite=Strict; "
}
