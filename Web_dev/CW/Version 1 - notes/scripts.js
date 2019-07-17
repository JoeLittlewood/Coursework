function lineRepeat(line, count) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = line.cloneNode(); // Clones the horizontal lines
        line.parentNode.insertBefore(copy, line);
    }
}

// function to delete delNotes.
function delNotes() {
    var x = confirm("Are you sure you want to delete this note?");
    if (x == true){
        document.getElementById('deleteNotes').value = ''
        document.getElementById('deleteTitle').value = ''
    } else {
        txt = "Canceled."
    }
}

// function to save notes.
function saveNotes() {
    confirm("Would you like to save this note?");
}

// function to download the note.
function downloadNote() {
    confirm("This button will let you download this note");
}