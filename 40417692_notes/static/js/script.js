// ====================================================================================================================
// SET08702 2018-9 TR2 001 - Web Technologies
// Joe L - 40417692
// Coursework Part 2 submission.
// Javascript document to run SQL database for my Notes application.
// ====================================================================================================================
// References:
// https://api.jquery.com/
// https://www.w3schools.com/jquery/
// https://www.w3schools.com/jquery/jquery_intro.asp
// This is a function that clones the horizontal line for an aesthetic look. I have tried to replicate a lined-paper effect.
function lineRepeat(line, count) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = line.cloneNode();
        line.parentNode.insertBefore(copy, line);
    }
}

// Calls the lineRepeat function.
lineRepeat(document.querySelector('.horizontalLine'), 60, true);

// Used to toggle the button to be black or white when turned on or off.
b = 1

// Each of the next four functions work very similarly. They all simply toggle the color of the button once pressed and insert a bold, italic or
// underline tag in the text that the user has written in. This does not work perfectly as the colour of the button can toggle even if the tag has
// not been pasted into the text.
// Reference: https://stackoverflow.com/questions/41056605/contenteditable-div-with-bold-option Code snippet: document.execCommand('bold');
function makeBold() {
    b += 1

    // If b is able to be divided by 2 then it is even, therefore the button should turn black.
    if (b % 2 == 0) {
        document.getElementById("button1").style.color = 'black';
        document.execCommand("bold", false, null);
        // If b is not able to be fully divided by 2 then b is odd, theroefore the button should be white.
    } else if (b % 2 == Math.round(b % 2)) {
        document.getElementById("button1").style.color = 'white';
    }
}

// Used to toggle the button to be black or white when turned on or off.
i = 1

function makeItalic() {
    i += 1
    if (i % 2 == 0) {
        document.getElementById("button2").style.color = 'black';
        document.execCommand("italic", false, null);
    } else if (i % 2 == Math.round(i % 2)) {
        document.getElementById("button2").style.color = 'white';
    }
}

// Used to toggle the button to be black or white when turned on or off.
u = 1

function makeUnderline() {
    u += 1
    if (u % 2 == 0) {
        document.getElementById("button3").style.color = 'black';
        document.execCommand("underline", false, null);
    } else if (u % 2 == Math.round(u % 2)) {
        document.getElementById("button3").style.color = 'white';
    }
}

// Used to toggle the button to be black or white when turned on or off.
l = 1

function makeList() {
    l += 1
    if (l % 2 == 0) {
        document.getElementById("button4").style.color = 'black';
        document.execCommand("insertUnorderedList", false, null);
    } else if (l % 2 == Math.round(l % 2)) {
        document.getElementById("button4").style.color = 'white';
    }
}

y = 1

// This function clones the "pad" div and shows it with a unique ID ready to be saved by the user.
// Reference: https://stackoverflow.com/questions/11985156/clone-div-and-change-id 
// Code snippet: 
//      var div = document.getElementById('div_id'),
//      clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
//      clone.id = "some_id";
//      document.body.appendChild(clone);
function clone() {

    var itm = document.getElementById("cloneNode");
    var help = document.getElementById("help");
    var cln = itm.cloneNode(true);

    // Hides all notes so that only the active note can be shown later.
    $('#newPad').children('div').each(function() {
        $(this).css("visibility", "hidden");
    })

    // Appends the title of the new note to the dropdown menu.
    $("#dropdownContent").append("<a onclick='showNote(\"newNote" + y + "\")'>newNote</a>");

    // Changes the id of the new note to "newNote(y)".
    cln.id = "newNote" + y;

    // Appends the new note to the newPad div, adds a title to it and then makes it visible using the showNote function.
    document.getElementById("newPad").appendChild(cln);
    var newItm = document.getElementById("newNote" + (y));
    $("#newNote" + y).attr("title", "");
    showNote("newNote" + y);

    // y is incrimented to give each note a unique id.
    y += 1;
}

// This function will ask if you are sure you would like to delete the note, then the note will be removed from the database.
function delNotes() {

    // Makes sure user has not made an error by clicking the bin.
    var x = confirm("Are you sure you want to delete this note?");

    if (x == true) {

        idToDelete = -1;

        // Finds which note is active by finding which one has the visibility attribute set to "visible" and then gets it's id.
        $('#newPad').children('div').each(function() {
            if ($(this).css("visibility") == "visible") {
                idToDelete = $(this).attr("id");
            }
        })

        // a.jax is used to post the information to the database. This is then picked up in the app.js file where the item
        // is removed from the database.
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

        // Becasue the title is separate from the pad, this is then cleared.
        $("#title").html("");

        // Shows help message when all notes are hidden.
        if ($("#newPad").html().length > 1) {
            $("#help").css("visibility", "visible");
        }
    }
}

// This function will display the active note.
function displayNotes(noteID) {

    $.ajax({
        url: "/get-notes",
        type: "GET",
        success: function(result) {

            $("#newPad").html(""); // The newPad div is cleared first to remove any deleted notes.
            $("#dropdownContent").html(""); // The dropdown content is cleared also to remove any deleted notes.

            result.forEach(Element => {
                var noteID = Element.noteid;
                var title = Element.title;
                var content = Element.content;

                var html = '<div class="pad" id="' + noteID + '" title="' + title + '"><div class="verticalLine"></div><div class="spacer"></div>' +
                    '<div class="textArea" contenteditable="true" placeholder="Write your note here!" id="' + noteID + '"spellcheck="true">' + content +
                    '</div><div id="lineclone' + noteID + '" class="horizontalLine"></div></div>'

                // The new html that is written above is appended to the newPad div, which remains hidden until showNote() is ran.
                $("#newPad").append(html);
                lineRepeat(document.querySelector('#lineclone' + noteID), 60, true);
                $("#dropdownContent").append("<a onclick='showNote(" + noteID + ")'>" + title + "</a>"); // Titles are appended to the dropdown content menu.
                $("#title").html(""); // The title is cleared as this is separate from the pads.
            })
        }
    })
}

// When a note is shown, all other notes are hidden and the note that has been selected is set to visible.
function showNote(id) {

    // The help message is hidden as it is no longer needed.
    $("#help").css("visibility", "hidden");

    // All notes are hidden.
    $('#newPad').children('div').each(function() {
        $(this).css("visibility", "hidden");
    })

    // The note that has been selected is set to visible.
    $("#" + id).css("visibility", "visible");
    $("#title").html($("#" + id).attr("title"));
}

// This function saves the selected note to the database.
function saveNote() {

    var idToSave = -1;

    // The id is taken from the note that is selected.
    $('#newPad').children('div').each(function() {
        if ($(this).css("visibility") == "visible") {
            idToSave = $(this).attr("id");
        }
    })

    // If the id is only numeric, this means it is an old note that has previously been saved and will need to be updated.
    if ($.isNumeric(idToSave)) {
        // a.jax sends the data to app.js to update the current note.
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
            // If the id of the note is not all numeric, then it is a new note and will need to be added to the database.
    } else {
        // a.jax sends the data to app.js to create a new note.
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

// This function calls the downloadInnerHtml function that downloads the note as a html file. This preserves the formatting.
// Reference:
// https://stackoverflow.com/questions/22084698/how-to-export-source-content-within-div-to-text-html-file
// Code snippet:
//   function downloadInnerHtml(filename, elId, mimeType) {
//     var elHtml = document.getElementById(elId).innerHTML;
//     var link = document.createElement('a');
//     mimeType = mimeType || 'text/plain';

//     link.setAttribute('download', filename);
//     link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
//     link.click(); 
// }

function downloadNote(idToDownload, filename) {

    // Downloaded filename is changed to title of current note.
    var filename = $("#title").html() + '.html';
    idToDownload = -1;

    // As before, the id is set for the current active note.
    $('#newPad').children('div').each(function() {
        if ($(this).css("visibility") == "visible") {
            idToDownload = $(this).attr("id");
        }
    })


    if (idToDownload != -1) {
        // Download function is called.
        downloadInnerHtml(filename, idToDownload, "text/html");
    }
}

// This function downloads the file.
function downloadInnerHtml(filename, idToDownload, mimeType) {
    var text = document.getElementById(idToDownload).innerHTML;
    var doc = document.createElement('a');
    mimeType = mimeType || 'text/plain'; // Multi-purpose Internet Mail Extensions type. Saves as plain text.

    doc.setAttribute('download', filename);
    doc.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(text));
    doc.click();
}

displayNotes();