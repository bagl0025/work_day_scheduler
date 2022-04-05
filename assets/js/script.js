var currentDay = moment().format("dddd, MMMM Do");
var currentTime = moment().hours(); //24 hour

$("#currentDay").text(currentDay);

// create scheduler rows
//maybe simplify current time - need to ad 9 etc
    for (var i = 0; i < 9; i++){
        var rowEl = $("<div>").addClass("row col-12");
        var timeEl = $("<div>").addClass("hour time-block col-1");
        if (i < 4) {
            timeEl.text(i + 9);
        }
        else {
            timeEl.text(i -3);
        }
        var apptEl = $("<div>").addClass("col-10");
            console.log(currentTime, i)
            if ((i + 9) < currentTime) {
                apptEl.addClass("past");
            }
            else if ((i + 9) === currentTime) {
                apptEl.addClass("present");
            }
            else {
                apptEl.addClass("future");
            }
        var saveBtnEl = $("<div>").addClass("saveBtn col-1");
        saveBtnEl.text = ("SAVE");
        rowEl.append(timeEl, apptEl, saveBtnEl);
        $(".container").append(rowEl);
    }
