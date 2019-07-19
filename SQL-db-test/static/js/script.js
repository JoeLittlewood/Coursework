function lineRepeat(line, count) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = line.cloneNode(); // Clones the horizontal lines
        line.parentNode.insertBefore(copy, line);
    }
}

b = 1
i = 1
u = 1
l = 1

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
    var itm = document.getElementById("cloneNode");
    var help = document.getElementById("help");
    var cln = itm.cloneNode(true);
    cln.id = "note" + (y += 1);

    document.getElementById("newPad").appendChild(cln);
    var newItm = document.getElementById("note" + (y));
    newItm.style.visibility = "visible";
    help.style.visibility = "hidden";
    console.log(y);
}

function delNotes() {
    var x = confirm("Are you sure you want to delete this note?");
    if (x == true) {
        if ((y - 1) == 0) {
            var itm = document.getElementById("cloneNode");
            var help = document.getElementById("help");
            document.getElementById("note" + y).outerHTML = "";
            itm.style.visibility = "hidden";
            help.style.visibility = "visible";
            y -= 1
        } else {
            document.getElementById("note" + y).outerHTML = "";
            y -= 1
        }
    } else {
        txt = "Canceled."
    }
    console.log(y);
}

// $.ajax({
//     url: "/get-notes",
//     type: "GET",
//     data: { noteid: selectedCard },

//     success: function(result) {
//         previewNotes();
//     }
// })
function displayNotes() {
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

                var html = '<div style="visibility: hidden;" class="pad" id="' + noteID + '">' +
                    '<div class="verticalLine"></div>' +
                    '<div class="textArea" contenteditable="true" placeholder="Write your note here!" id="' + noteID + '"' +
                    'spellcheck="true">' + content + '</div>' +
                    '<div class="spacer"></div>' +
                    '<div id="lineclone' + noteID + '" class="horizontalLine"></div>' +
                    '</div>'

                $("#newPad").append(html);
                // $("#" + noteID).css("visibility", "visible");
                lineRepeat(document.querySelector('#lineclone' + noteID), 60, true);
                $("#help").css("visibility", "hidden");

                $("#dropdownContent").append("<a onclick='showNote(" + noteID + ")'>" + title + "</a>");
                // newItm.style.visibility = "visible";



                // alert(title)
            })
        }
    })
}

function showNote(id) {
    $("#" + id).css("visibility", "visible");
}

displayNotes();