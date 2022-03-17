
// LIB

(function (funcName, baseObj) {
	"use strict";
	/**
	 * @package libs
	 * @name domInit
	 */
	funcName = funcName || "domInit";
	baseObj = baseObj || window;
	var readyList = [];
	var readyFired = false;
	var readyEventHandlersInstalled = false;

	/**
	 * Call this when document is ready
	 * SINGLTON
	 */
	function ready() {
		if (!readyFired) {
			readyFired = true;
			for (var i = 0; i < readyList.length; i++) {

				readyList[i].fn.call(window, readyList[i].ctx);
			}
			readyList = [];
		}
	}

	function readyStateChange() {
		if (document.readyState === "complete") {
			ready();
		}
	}

	// This is the one public interface
	// domInit(fn, context);
	// the context argument is optional - if present, it will be passed
	// as an argument to the callback
	baseObj[funcName] = function (callback, context) {
		if (typeof callback !== "function") {
			throw new TypeError("callback for domInit(fn) must be a function");
		}
		// if ready has already fired, then just schedule the callback
		// to fire asynchronously, but right away
		if (readyFired) {
			setTimeout(function () { callback(context); }, 1);
			return;
		} else {
			// add the function and context to the list
			readyList.push({ fn: callback, ctx: context });
		}
		// if document already ready to go, schedule the ready function to run
		// IE only safe when readyState is "complete", others safe when readyState is "interactive"
		if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
			setTimeout(ready, 1);
		} else if (!readyEventHandlersInstalled) {
			// otherwise if we don't have event handlers installed, install them
			if (document.addEventListener) {
				// first choice is DOMContentLoaded event
				document.addEventListener("DOMContentLoaded", ready, false);
				// backup is window load event
				window.addEventListener("load", ready, false);
			} else {
				// must be IE
				document.attachEvent("onreadystatechange", readyStateChange);
				window.attachEvent("onload", ready);
			}
			readyEventHandlersInstalled = true;
		}
	}
})("domInit", window);




// CODE
domInit(Populator)

function Populator() {
	const addButton = document.getElementById('btn-add')
	addButton.addEventListener('click', addButtonAction)

	const udd = usersDatabase()
	const usersTable = document.getElementById('users-table')
	usersTable.children[1].innerHTML = `
	${udd.map(user => `
		<tr id="user-${user.id}">
			<td>${user.id}</td>
			<td>${user.createdDate}</td>
			<td>${user.status}</td>
			<td>${user.lastName}</td>
			<td>${user.firstName}</td>
			<td>${user.userName}</td>
			<td>${user.registrationNumber}</td>
			<td>X</td>
			
	</tr>`)}
	`
}

function addButtonAction() {
	console.log('Toggle AddUser Modal')
}

function usersDatabase(data, method = 'display') {
	const users = [{
		id: "123456789",
		createdDate: "2021-01-06T00:00:00.000Z",
		status: "En validation",
		firstName: "Mohamed",
		lastName: "Taha",
		userName: "mtaha",
		registrationNumber: "2584",
	},{
		id: "987654321",
		createdDate: "2021-07-25T00:00:00.000Z",
		status: "Validé",
		firstName: "Hamid",
		lastName: "Orrich",
		userName: "horrich",
		registrationNumber: "1594",
	},
	{
		id: "852963741",
		createdDate: "2021-09-15T00:00:00.000Z",
		status: "Rejeté",
		firstName: "Rachid",
		lastName: "Mahidi",
		userName: "rmahidi",
		registrationNumber: "3576",
	}]

	switch (method) {
		case 'add':
			users.push(userEntity(data))
			return users
			break;
	
		default:
			return users
	}

}

const generateId = () => Math.floor(123456789 + Math.random() * 987654321)
const generateRN = () => Math.floor(3576 + Math.random() * 2584)

const userEntity = (data) => {
	let userData = new Map([
		['id', data.id || String(generateId())],
		['createdDate', data.createdDate],
		['status', data.status],
		['firstName', data.firstName],
		['lastName', data.lastName],
		['userName', data.userName],
		['registrationNumber', data.registrationNumber || String(generateRN())],
	])
	return Object.fromEntries(userData)
}