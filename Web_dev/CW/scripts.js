function lineRepeat(line, count) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = line.cloneNode(); // Clones the horizontal lines
        line.parentNode.insertBefore(copy, line);
    }
}

function deleteNotes() {
    var x = confirm("Are you sure you want to delete this note?");
    if (x == true){
        document.getElementById('delNotes').value = ''
        document.getElementById('delTitle').value = ''
    } else {
        txt = "Canceled."
    }
}