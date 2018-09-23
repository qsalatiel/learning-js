var myForm = document.getElementById("bookmarks")

//event listener
myForm.addEventListener("submit", savebookmark);

function savebookmark(e) {
    var bName = document.getElementById("bName").value;
    var bURL = document.getElementById("bURL").value;

    var bookmarkItem = {
        name: bName,
        url: bURL
    }

    if(localStorage.getItem("bookmarks") === null) {
        var bookmarks = [];
        bookmarks.push(bookmarkItem);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmarkItem);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    e.preventDefault();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarkResults = document.getElementById("bookmarkResults");

    
    for(i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML +=
            "<div class='box'>" +
            "<h3>" +name+ "</h3>" + 
            "<br><a href='"+url+"'> Visit the website </a>" +
            "</div> <br>";
    }
}