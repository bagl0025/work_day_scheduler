var currentDay = moment().format("dddd, MMMM Do");
var currentTime = moment().hours(); //24 hour
var apptArray = {};

$("#currentDay").text(currentDay);

// create scheduler rows and time block
for (var i = 8; i < 18; i++){
    var rowEl = $("<div>").addClass("row col-12");
    var timeEl = $("<div>").addClass("hour time-block col-2 col-lg-1 d-flex justify-content-center");
    // convert 24hr time to 12 hour time
    if (i > 12) {
        timeEl.text(i - 12 + "PM");
    }
    else {
        timeEl.text(i + "AM");
    }

    // create middle col to hold appt text
    var apptEl = $("<div id='timeBlock-" + i + "' ></div>");
    apptEl.attr("contentEditable", "true");

    if ((i) < currentTime) {
        apptEl.addClass("past col-8 col-lg-10 col-md-8");
    }
    else if ((i) === currentTime) {
        apptEl.addClass("present col-8 col-lg-10 col-md-8");
    }
    else {
        apptEl.addClass("future col-8 col-lg-10 col-md-8");
    }

    // create save buttton
    var saveBtnEl = $("<div id='saveRow-" + i + "' ></div>")
        .addClass("saveBtn col-2 col-lg-1 fa-solid fa-floppy-disk fa-fw fa-2xl d-flex justify-content-center");
    rowEl.append(timeEl, apptEl, saveBtnEl);
    $(".container").append(rowEl);    
}

// load appointments after page refresh
var loadAppts = function() {
    apptArray = JSON.parse(localStorage.getItem("appointments"));
    if (apptArray === null || !apptArray) {
        var scores = {};
    }
    else {
        for (var i = 8; i < 18; i++) {
            // skip null entries
            if(apptArray[i]) {
                $("#timeBlock-"+i).text(apptArray[i][1]);
            }
            else {
                i++;
            }
        }
    }
};

// save content to array and then localstorage
$("[id*='saveRow-']").on("click", function(event) {
    var apptTime = event.target.id.split("-")[1];
    var apptInfo = document.getElementById("timeBlock-" + apptTime).innerHTML;
    apptArray[apptTime]=["timeBlock-" + apptTime, apptInfo];

    // popup save message
    localStorage.setItem("appointments", JSON.stringify(apptArray));
    var lText = "Appointment Added to ";
    var rText = "<span style='color:red'>localStorage</span>";
    $("#saveSuccess").append(lText, rText, " ✔");
    
    var clearSaveMsg = setInterval(function() {
        $("#saveSuccess").empty();
    }, 3000);
});

loadAppts();

// refresh page every 15 minutes to update colors
// this may not be the best way
setTimeout(function() {
    location.reload();
}, (1000 * 60 * 15));
