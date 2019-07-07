function lineRepeat(line, count) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = line.cloneNode(); // Clones the horizontal lines
        line.parentNode.insertBefore(copy, line);
    }
}

function delNotes() {
    var x = confirm("Are you sure you want to delete this note?");
    if (x == true){
        document.getElementById('deleteNotes').value = ''
        document.getElementById('deleteTitle').value = ''
    } else {
        txt = "Canceled."
    }
}
