/*
dates.sort(compareAsc) sorts ++ Desc sorts --
format -- lightFormat
isMatch - isSame
addMonth -- subMonth
firstDayOfMonth
unixtime // uuid
*/
// todo :
1; //make the modal open and close --- close on date select
2; //selected date has toggle class selected
3; //make the right and left nav change months ( add - sub months)
4; //when date selected save the month ofthe date selected
5; // when date selected, button inner text's change to selected date
6; //load up where the date selected on reopen
//================================================================
import {
	format,
	parse,
	addMonths,
	subMonths,
	getUnixTime,
	fromUnixTime,
	eachDayOfInterval,
	startOfMonth,
	startOfWeek,
	endOfMonth,
	endOfWeek,
	isSameMonth,
	isEqual,
	isSameDay,
} from "date-fns";

//! selectors
const datePickerButton = document.querySelector(".date-picker-button");
const datePickerTable = document.querySelector(".date-picker");
const prevMthBtn = document.querySelector(".prev-month-button");
const nextMthBtn = document.querySelector(".next-month-button");
//const selectedDate = document.querySelector(".selected");
const datePickerTitle = document.querySelector(".current-month");
const dateTable = document.querySelector(".date-picker-grid-dates");

//?event listeners

datePickerButton.addEventListener("click", () => {
	datePickerTable.classList.toggle("show");
	const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);

	renderDatePicker(selectedDate);
});
renderDate(new Date());

//*functions

function renderDate(date) {
	datePickerButton.innerText = format(date, "MMMM do, yyyy");
	//datePickerButton.dataset.selectedDate = date.v5(selectedDate)
	datePickerButton.dataset.selectedDate = getUnixTime(date);
	//renderDate(selectedDate);
	//renderDate(new Date());
}

function renderDatePicker(selectedDate) {
	datePickerTitle.innerText = format(currentDate, "MMMM - yyyy");
	//*! need to reference month buttons here
	//monthsBtns(selectedDate);
	renderDates(selectedDate);
}

let currentDate = new Date();
nextMthBtn.addEventListener("click", () => {
	currentDate = addMonths(currentDate, 1);
	console.log("clicked next");
	renderDatePicker(currentDate);
	//renderDate(currentDate);
	renderDates(currentDate);
});

prevMthBtn.addEventListener("click", () => {
	currentDate = subMonths(currentDate, 1);
	console.log("clicked previous");
	//renderDate(currentDate);
	renderDates(currentDate);
	renderDatePicker(currentDate);
});

function renderDates(selectedDate) {
	dateTable.innerHTML = "";
	const startInterval = startOfWeek(startOfMonth(selectedDate));
	const endInterval = endOfWeek(endOfMonth(selectedDate));
	const tableOfDates = eachDayOfInterval({
		start: startInterval,
		end: endInterval,
	});
	//=================================  date grid creation
	const dateSelected = fromUnixTime(datePickerButton.dataset.selectedDate);
	tableOfDates.forEach((date) => {
		//========= create button that'll hold the day dates
		const newDateElement = document.createElement("button");
		newDateElement.classList.add("date");
		newDateElement.innerText = date.getDate();
		dateTable.appendChild(newDateElement);

		//========= check if !sameMonth and give the selected class
		if (!isSameMonth(date, selectedDate)) {
			newDateElement.classList.add("date-picker-other-month-date");
		}
		//console.log(selectedDate, date);
		/*if (isEqual(currentDate, date)) {
			newDateElement.classList.add("selected");
			console.log(selectedDate, date);
		}*/
		console.log(dateSelected, date);
		if (
			format(date, "MMMM do, yyyy") === format(dateSelected, "MMMM do, yyyy")
		) {
			newDateElement.classList.add("selected");
		}
		//========= event listener for each date to close on selection
		newDateElement.addEventListener("click", () => {
			datePickerTable.classList.remove("show");
			renderDate(date);
		});
	});
}

//*! code graveyard
/*
function renderDates(selectedDate) {
	dateTable.innerHTML = "";
	const startDate = startOfWeek(startOfMonth(selectedDate));
	const endDate = endOfWeek(endOfMonth(selectedDate));
	const tableDates = eachDayOfInterval({ start: startDate, end: endDate });

	tableDates.forEach((date) => {
		const dateBtnElement = document.createElement("button");
		dateBtnElement.classList.add("date");
		dateBtnElement.innerText = date.getDate();
		dateTable.appendChild(dateBtnElement);
		//dateBtnElement.dataset.fullDate = format(date, "MMMM do, yyyy");
		if (!isSameMonth(date, selectedDate)) {
			dateBtnElement.classList.add("date-picker-other-month-date");
		}
		//*! this fucking part
		if (isSameDay(selectedDate, date)) {
			dateBtnElement.classList.add("selected");
		}

		//export the rest toits own function
		dateBtnElement.addEventListener("click", () => {
			renderDate(date);
			datePickerTable.classList.remove("show");
		});
	});
}

/*
function monthsBtns(selectedDate) {
	// needs to be fixed
	nextMthBtn.addEventListener(
		"click",
		() => {
			renderDatePicker(addMonths(selectedDate, 1));
		},
		{ once: true }
	);
	console.log("clicked next");
	prevMthBtn.addEventListener(
		"click",
		() => {
			renderDatePicker(subMonths(selectedDate, 1));
		},
		{ once: true }
	);
	console.log("clicked previous");
}*/
/*
document.addEventListener("click", (e) => {
	if (!e.target.matches(".date")) return;
	{
		datePickerTable.classList.remove("show");
		//renderDate(date);
		const selectedDate = parse(
			e.target.dataset.fullDate,
			"MMMM do, yyyy",
			new Date()
		);
		updateDateBtnText(selectedDate);
	}
});

function updateDateBtnText(date) {
	datePickerButton.innerText = format(date, "MMMM do, yyyy");
}
*/
/*
function renderDates(selectedDate) {
	dateTable.innerHtml = "";
	const startInterval = startOfWeek(startOfMonth(selectedDate));
	const endInterval = endOfWeek(endOfMonth(selectedDate));
	const tableDates = eachDayOfInterval({
		start: startInterval,
		end: endInterval,
	});
	console.log(selectedDate);

	tableDates.forEach((date) => {
		const newDateElement = document.createElement("button");
		newDateElement.classList.add("date");
		newDateElement.innerText = date.getDate();

		if (!isSameMonth(date, selectedDate)) {
			newDateElement.classList.add("date-picker-other-month-date");
		}
		if (isSameDay(currentDate, selectedDate)) {
			newDateElement.classList.add("selected");
		}
		//console.log(selectedDate);
		newDateElement.addEventListener("click", () => {
			datePickerTable.classList.remove("show");
			renderDate(date);
		});
		dateTable.appendChild(newDateElement);
	});
}
*/
//=====================
