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

function makeBold () {
    b += 1
    if (b % 2 == 0) {
        document.getElementById("button1").style.color = 'black';
        console.log('Bold')
    } else if (b % 2 == Math.round(b % 2)) {
        console.log('Non-bold')
        document.getElementById("button1").style.color = 'white';
    }
    document.execCommand("bold",false,null)
}

function makeItalic () {
    i += 1
    if (i % 2 == 0) {
        document.getElementById("button2").style.color = 'black';
        console.log('Italic')
    } else if (i % 2 == Math.round(i % 2)) {
        console.log('Non-italic')
        document.getElementById("button2").style.color = 'white';
    }
    document.execCommand("italic",false,null)
}

function makeUnderline () {
    u += 1
    if (u % 2 == 0) {
        document.getElementById("button3").style.color = 'black';
        console.log('Underline')
    } else if (u % 2 == Math.round(u % 2)) {
        console.log('No-underline')
        document.getElementById("button3").style.color = 'white';
    }
    document.execCommand("underline",false,null)
}

function makeList () {
    l += 1
    if (l % 2 == 0) {
        document.getElementById("button4").style.color = 'black';
        console.log('List')
    } else if (l % 2 == Math.round(l % 2)) {
        console.log('No-list')
        document.getElementById("button4").style.color = 'white';
    }
    document.execCommand("insertUnorderedList",false,null)
}

function clone() {
    console.log("Hello")
    var itm = document.getElementById("cloneNode");
    var cln = itm.cloneNode(true);

    document.getElementById("newPad").appendChild(cln);
}

function deleteNote(textArea)
{
    document.getElementByClassName("textArea").innerHTML = "";
}