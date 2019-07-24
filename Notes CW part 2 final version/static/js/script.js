function lineRepeat(line, count) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = line.cloneNode(); // Clones the horizontal lines
        line.parentNode.insertBefore(copy, line);
    }
}

lineRepeat(document.querySelector('.horizontalLine'), 60, true);

b = 1

function makeBold() {
    b += 1
    if (b % 2 == 0) {
        document.getElementById("button1").style.color = 'black';
        console.log('Bold')
    } else if (b % 2 == Math.round(b % 2)) {
        console.log('Non-bold')
        document.getElementById("button1").style.color = 'white';
    }
    document.execCommand("bold", false, null)
}

i = 1

function makeItalic() {
    i += 1
    if (i % 2 == 0) {
        document.getElementById("button2").style.color = 'black';
        console.log('Italic')
    } else if (i % 2 == Math.round(i % 2)) {
        console.log('Non-italic')
        document.getElementById("button2").style.color = 'white';
    }
    document.execCommand("italic", false, null)
}

u = 1

function makeUnderline() {
    u += 1
    if (u % 2 == 0) {
        document.getElementById("button3").style.color = 'black';
        console.log('Underline')
    } else if (u % 2 == Math.round(u % 2)) {
        console.log('No-underline')
        document.getElementById("button3").style.color = 'white';
    }
    document.execCommand("underline", false, null)
}

l = 1

function makeList() {
    l += 1
    if (l % 2 == 0) {
        document.getElementById("button4").style.color = 'black';
        console.log('List')
    } else if (l % 2 == Math.round(l % 2)) {
        console.log('No-list')
        document.getElementById("button4").style.color = 'white';
    }
    document.execCommand("insertUnorderedList", false, null)
}

y = 0

function clone() {
    y += 1;
    $('#newPad').children('div').each(function() {
        $(this).css("visibility", "hidden");
    })

    $("#dropdownContent").append("<a onclick='showNote(\"newNote" + y + "\")'>newNote</a>");
    var itm = document.getElementById("cloneNode");
    var help = document.getElementById("help");
    var cln = itm.cloneNode(true);
    cln.id = "newNote" + y;

    document.getElementById("newPad").appendChild(cln);
    var newItm = document.getElementById("newNote" + (y));
    $("#newNote" + y).attr("title", "");
    showNote("newNote" + y);
}

function delNotes() {
    var x = confirm("Are you sure you want to delete this note?");
    if (x == true) {
        idToDelete = -1;
        $('#newPad').children('div').each(function() {
            if ($(this).css("visibility") == "visible") {
                idToDelete = $(this).attr("id");
            }
        })
        $.ajax({
            url: "/del-note",
            type: "POST",
            data: {
                noteid: idToDelete
            },

            success: function(result) {
                displayNotes();
            }
        })
        $("#title").html("");
    } else {
        txt = "Canceled."
    }
    console.log(y);
}

function displayNotes(noteID) {
    $.ajax({
        url: "/get-notes",
        type: "GET",
        success: function(result) {
            $("#newPad").html("");
            $("#dropdownContent").html("");
            result.forEach(Element => {
                var noteID = Element.noteid;
                var title = Element.title;
                var content = Element.content;

                var html = '<div class="pad" id="' + noteID + '" title="' + title + '">' +
                    '<div class="verticalLine"></div>' +
                    '<div class="spacer"></div>' +
                    '<div class="textArea" contenteditable="true" placeholder="Write your note here!" id="' + noteID + '"' +
                    'spellcheck="true">' + content + '</div>' +
                    '<div id="lineclone' + noteID + '" class="horizontalLine"></div>' +
                    '</div>'

                $("#newPad").append(html);
                lineRepeat(document.querySelector('#lineclone' + noteID), 60, true);

                $("#dropdownContent").append("<a onclick='showNote(" + noteID + ")'>" + title + "</a>");
                $("#title").html("");
            })
        }
    })
}

function showNote(id) {
    $("#help").css("visibility", "hidden");
    $('#newPad').children('div').each(function() {
        $(this).css("visibility", "hidden");
    })

    $("#" + id).css("visibility", "visible");
    $("#title").html($("#" + id).attr("title"));
}

function saveNote() {
    var idToSave = -1;
    $('#newPad').children('div').each(function() {
        if ($(this).css("visibility") == "visible") {
            idToSave = $(this).attr("id");
        }
    })
    if ($.isNumeric(idToSave)) {
        $.ajax({
            url: "/edit-note",
            type: "POST",
            data: {
                noteid: idToSave,
                title: $("#title").html(),
                content: $("#" + idToSave).children('.textArea').html()
            },

            success: function(result) {
                displayNotes();
            }
        })
    } else {
        $.ajax({
            url: "/new-note",
            type: "POST",
            data: {
                title: $("#title").html(),
                content: $("#" + idToSave).children('.textArea').html()
            },

            success: function(result) {
                displayNotes();
            }
        })
    }
}

function downloadNote(idToDownload, filename) {
    idToDownload = -1;
    $('#newPad').children('div').each(function() {
        if ($(this).css("visibility") == "visible") {
            idToDownload = $(this).attr("id");
        }
    })
    var filename = $("#title").html() + '.html';
    if (idToDownload != -1) {
        downloadInnerHtml(filename, idToDownload, "text/html");
    }
}

function downloadInnerHtml(filename, idToDownload, mimeType) {
    var elHtml = document.getElementById(idToDownload).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

displayNotes();