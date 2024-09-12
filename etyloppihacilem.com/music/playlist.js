var playlist = []
var editing = 0
var md_isrc = document.getElementById("md_isrc")
var md_track = document.getElementById("md_track")
var md_album = document.getElementById("md_album")
var md_artist = document.getElementById("md_artist")
var md_date = document.getElementById("md_date")
var md_dzurl = document.getElementById("md_dzurl")
var md_cover = document.getElementById("md_cover")

md_isrc.addEventListener("change", (event) => {
    for (var i = 0; i < playlist.length; i++) {
        if (md_isrc.checked) {
            if (playlist[i].isrc == undefined) {
                editing++
                try {
                    requete(
                        "/track/" + playlist[i].id,
                        function (data, id) {
                            playlist[id].isrc = data.isrc
                            editing--
                        },
                        i
                    )
                } catch (e) {
                    console.log(e)
                    editing--
                }
            }
        } else {
            delete playlist[i].isrc
        }
    }
})

md_track.addEventListener("change", (event) => {
    for (var i = 0; i < playlist.length; i++) {
        if (md_track.checked) {
            if (playlist[i].track == undefined) {
                editing++
                try {
                    requete(
                        "/track/" + playlist[i].id,
                        function (data, id) {
                            playlist[id].track = data.title
                            editing--
                        },
                        i
                    )
                } catch (e) {
                    console.log(e)
                    editing--
                }
            }
        } else {
            delete playlist[i].track
        }
    }
})

md_album.addEventListener("change", (event) => {
    for (var i = 0; i < playlist.length; i++) {
        if (md_album.checked) {
            if (playlist[i].album == undefined) {
                editing++
                try {
                    requete(
                        "/track/" + playlist[i].id,
                        function (data, id) {
                            playlist[id].album = data.album.title
                            editing--
                        },
                        i
                    )
                } catch (e) {
                    console.log(e)
                    editing--
                }
            }
        } else {
            delete playlist[i].album
        }
    }
})

md_artist.addEventListener("change", (event) => {
    for (var i = 0; i < playlist.length; i++) {
        if (md_artist.checked) {
            if (playlist[i].artist == undefined) {
                editing++
                try {
                    requete(
                        "/track/" + playlist[i].id,
                        function (data, id) {
                            playlist[id].artist = data.artist.name
                            editing--
                        },
                        i
                    )
                } catch (e) {
                    console.log(e)
                    editing--
                }
            }
        } else {
            delete playlist[i].artist
        }
    }
})

md_date.addEventListener("change", (event) => {
    for (var i = 0; i < playlist.length; i++) {
        if (md_date.checked) {
            if (playlist[i].date == undefined) {
                editing++
                try {
                    requete(
                        "/track/" + playlist[i].id,
                        function (data, id) {
                            playlist[id].date = data.release_date
                            editing--
                        },
                        i
                    )
                } catch (e) {
                    console.log(e)
                    editing--
                }
            }
        } else {
            delete playlist[i].date
        }
    }
})

md_dzurl.addEventListener("change", (event) => {
    for (var i = 0; i < playlist.length; i++) {
        if (md_dzurl.checked) {
            if (playlist[i].deezer_url == undefined) {
                editing++
                try {
                    requete(
                        "/track/" + playlist[i].id,
                        function (data, id) {
                            playlist[id].deezer_url = data.link
                            editing--
                        },
                        i
                    )
                } catch (e) {
                    console.log(e)
                    editing--
                }
            }
        } else {
            delete playlist[i].deezer_url
        }
    }
})

md_cover.addEventListener("change", (event) => {
    for (var i = 0; i < playlist.length; i++) {
        if (md_cover.checked) {
            if (playlist[i].cover == undefined) {
                editing++
                try {
                    requete(
                        "/track/" + playlist[i].id,
                        function (data, id) {
                            playlist[id].cover_url = data.album["cover_" + cover_size.value]
                            editing--
                        },
                        i
                    )
                } catch (e) {
                    console.log(e)
                    editing--
                }
            }
        } else {
            delete playlist[i].cover_url
        }
    }
})

cover_size.addEventListener("change", (event) => {
    for (var i = 0; i < playlist.length; i++) {
        delete playlist[i].cover_url
        if (md_cover.checked) {
            editing++
            try {
                requete(
                    "/track/" + playlist[i].id,
                    function (data, id) {
                        playlist[id].cover_url = data.album["cover_" + cover_size.value]
                        editing--
                    },
                    i
                )
            } catch (e) {
                console.log(e)
                editing--
            }
        }
    }
})

function addToPlaylist(data) {
    var item = {}
    item.id = data.id
    if (md_isrc.checked) {
        item.isrc = data.isrc
    }
    if (md_track.checked) {
        item.track = data.title
    }
    if (md_album.checked) {
        item.album = data.album.title
    }
    if (md_artist.checked) {
        item.artist = data.artist.name
    }
    if (md_date.checked) {
        item.date = data.release_date
    }
    if (md_dzurl.checked) {
        item.deezer_url = data.link
    }
    if (md_cover.checked) {
        item.cover_url = data.album["cover_" + cover_size.value]
    }
    playlist.push(item)
}
function clearList() {
    // var elements = document.querySelectorAll(".element")
    // elements.forEach((element) => {
    //     element.remove()
    // })
    var pl_res = document.getElementById("results")
    var elements = pl_res.childNodes
    for (var i = elements.length; i > 0; i--) {
        elements[0].remove()
    }
}
function addElement(e) {
    document.getElementById("results").appendChild(e)
}
function pauseAll() {
    var elements = document.querySelectorAll(".playingStyle")
    elements.forEach((element) => {
        element.remove()
    })
    var elements = document.querySelectorAll("audio")
    elements.forEach((element) => {
        element.pause()
    })
    var elements = document.querySelectorAll(".playing")
    elements.forEach((element) => {
        element.setAttribute("class", "notplaying")
    })
}
function addSong(id, button) {
    // playlist.push({"id": id})
    button.innerText = "✓"
    button.setAttribute("class", "added")
    button.setAttribute("disabled", "true")
    var pl_res = document.getElementById("playlist_content")
    try {
        requete("/track/" + id, function (data) {
            pl_res.appendChild(generateMusicHtml(data, false))
            addToPlaylist(data)
        })
    } catch (e) {
        console.log(e)
    }
    document.getElementById("empty_message").style.display = "none"
}
function specialSearchArtist(event, url = "", nb = 0) {
    pauseAll()
    try {
        if (url == "") {
            search.value = event.target.innerText
            url = "/artist/" + event.target.deezer_id + "/top"
            pauseAll()
            clearList()
        }
        requete(url, function (data) {
            for (i of data.data) {
                addElement(generateMusicHtml(i))
            }
            if (data.next != undefined && nb < 5) {
                url = data.next
                specialSearchArtist(event, url.slice(22), nb + 1)
            }
        })
    } catch (e) {
        console.log(e)
    }
}
function specialSearchAlbum(event) {
    search.value = event.target.innerText
    pauseAll()
    try {
        requete("/album/" + event.target.deezer_id, function (data) {
            clearList()
            for (i of data.tracks.data) {
                addElement(generateMusicHtml(i))
            }
        })
    } catch (e) {
        console.log(e)
    }
}
function generateMusicHtml(data, select = true, nb = 0) {
    if (data.type != "track") {
        return false // TODO: change this
    }
    var element = document.createElement("div")
    if (select) {
        element.setAttribute("class", "element")
    } else {
        element.setAttribute("class", "element noselect")
    }
    element.track_id = data.id
    var cover = document.createElement("img")
    cover.setAttribute("class", "notplaying")
    cover.setAttribute("src", data.album.cover_medium)
    cover.setAttribute("alt", "cover")
    var titre = document.createElement("h1")
    titre.innerText = data.title
    var albArtiste = document.createElement("h2")
    var album = document.createElement("span")
    var artist = document.createElement("span")
    var sep = document.createElement("span")
    sep.innerText = " • "
    artist.innerText = data.artist.name
    artist.deezer_id = data.artist.id
    artist.deezer_type = "artist"
    artist.addEventListener("click", specialSearchArtist)
    album.innerText = data.album.title
    album.deezer_id = data.album.id
    album.deezer_type = "album"
    album.addEventListener("click", specialSearchAlbum)
    albArtiste.appendChild(artist)
    albArtiste.appendChild(sep)
    albArtiste.appendChild(album)
    var texte = document.createElement("div")
    if (select) {
        var button = document.createElement("button")
        button.track_id = data.id
        button.addEventListener("click", (event) => {
            if (event.target.getAttribute("class") != "added") {
                event.target.setAttribute("class", "processing")
                var rotate = document.createElement("div")
                rotate.setAttribute("class", "rotate")
                event.target.setAttribute("disabled", "true")
                event.target.innerText = ""
                rotate.innerText = "⚙︎"
                event.target.appendChild(rotate)
                addSong(event.target.track_id, event.target)
                // sendSong(event.target.getAttribute("id")) // TODO: change this
            }
        })
        button.innerText = "+"
    }
    var son = document.createElement("audio")
    son.setAttribute("src", data.preview)
    cover.addEventListener("click", function (event) {
        if (son.paused) {
            pauseAll()
            event.target.setAttribute("class", "playing")
            son.play()
            var gris = document.createElement("style")
            gris.innerText = ".notplaying {filter: grayscale(80%) brightness(0.7) contrast(70%);}"
            gris.setAttribute("class", "playingStyle")
            document.getElementById("body").appendChild(gris)
        } else {
            pauseAll()
            event.target.setAttribute("class", "notplaying")
        }
    })
    texte.appendChild(titre)
    texte.appendChild(albArtiste)
    element.appendChild(cover)
    element.appendChild(texte)
    if (select) {
        element.appendChild(button)
    }
    element.appendChild(son)
    return element
}
document.getElementById("search_field").addEventListener("submit", (event) => {
    event.preventDefault()
    pauseAll()
    var search = document.getElementById("search")
    try {
        if (search.value != "") {
            requete("/search/track/?q=" + search.value, function (data) {
                clearList()
                for (i of data.data) {
                    addElement(generateMusicHtml(i))
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
    return false
})
function clearPlaylist() {
    var pl_res = document.getElementById("playlist_content")
    var elements = pl_res.childNodes
    for (var i = elements.length; i > 0; i--) {
        elements[0].remove()
    }
}
function emptyPlaylist() {
    playlist = []
    updatePlaylist()
}
document.getElementById("empty").addEventListener("click", (event) => {
    emptyPlaylist()
    updatePlaylist()
})

function updatePlaylist() {
    clearPlaylist()
    var pl_res = document.getElementById("playlist_content")
    for (var i = 0; i < playlist.length; i++) {
        try {
            requete("/track/" + playlist[i].id, function (data) {
                pl_res.appendChild(generateMusicHtml(data, false))
            })
        } catch (e) {
            console.log(e)
        }
    }
    if (playlist.length == 0) {
        document.getElementById("empty_message").style.display = "block"
    } else {
        document.getElementById("empty_message").style.display = "none"
    }
    return false
}

/**
  Content download
  */
const JSONToFile = (obj, filename) => {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
        type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.json`
    a.click()
    URL.revokeObjectURL(url)
}

document.getElementById("save_button").addEventListener("click", (event) => {
    JSONToFile(playlist, "playlist") // .json is implied
})

/**
  Content upload
  */

function onChange(event) {
    var reader = new FileReader()
    reader.onload = onReaderLoad
    reader.readAsText(event.target.files[0])
}
var obj = []
function onReaderLoad(event) {
    obj = JSON.parse(event.target.result)
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].id == undefined) {
            delete obj[i]
            if (i > 0) i--
            continue
        }
    }
}
document.getElementById("load_file").addEventListener("change", onChange)
document.getElementById("load_button").addEventListener("click", (event) => {
    if (obj.length <= 0) {
        emptyPlaylist()
        return
    }
    md_isrc.checked = obj[0].isrc != undefined
    md_track.checked = obj[0].track != undefined
    md_album.checked = obj[0].album != undefined
    md_artist.checked = obj[0].artist != undefined
    md_date.checked = obj[0].date != undefined
    md_dzurl.checked = obj[0].deezer_url != undefined
    md_cover.checked = obj[0].cover_url != undefined
    playlist = obj
    updatePlaylist()
})
