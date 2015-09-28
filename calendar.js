// -*- coding: utf-8-unix; mode: javascript -*-

// SimpleCalendar: provides calendar tool for HTML form
// 
// The programme SimpleCalendar provides simple calendar tool, which assists 
// to input the date string into HTML form.
// 
// Author: 2015 IMAI Toshiyuki
// 
// Copyright (c) 2015 IMAI Toshiyuki
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

function open_calendar(myid, targetid, event) {
    var chk = document.getElementById(myid);
    if (chk) {return;}

    if (window.createPopup) {
	var pointX = event.offsetX;
	var pointY = event.offsetY;
    } else {
	var pointX = event.layerX;
	var pointY = event.layerY;
    }

    var css = 'background: #FAFAFA; position: absolute; ';
    css += 'top: ' + pointY + 'px; left: ' + pointX + 'px; ';

    var target = document.getElementById(targetid);
    var sc = new SimpleCalendar(myid, targetid, target.value);
    var cal = sc.getCalendarElement();

    var container = document.createElement('div');
    container.setAttribute('id', myid);
    container.setAttribute('style', css);
    container.appendChild(cal);
    target.parentNode.insertBefore(container, target.nextSibling);
}

function replace_calendar(myid, targetid, datestring) {
    var container = document.getElementById(myid);
    if (!container) {return};

    var oldCal = document.getElementById('CALENDAR_' + myid);

    var sc = new SimpleCalendar(myid, targetid, datestring);
    var cal = sc.getCalendarElement();

    container.replaceChild(cal, oldCal);
}

function delete_calendar(myid) {
    var cal = document.getElementById(myid);
    cal.parentNode.removeChild(cal);
}

function set_value(targetid, value) {
    var target = document.getElementById(targetid);
    target.value = value
}

// class SimpleCalendar

function SimpleCalendar(myid, targetid, datestring) {
    this.id = myid;
    this.target = targetid;
    this.datestring = datestring;

    if (datestring == undefined) {
	datestring = new Date();
	datestring = datestring.getFullYear() + '/' + 
	    ('00' + (datestring.getMonth() + 1)).slice(-2) + '/' + 
	    ('00' + datestring.getDate()).slice(-2);
    }
    datestring = datestring.replace('-', '/');

    if (datestring.match(/^\d{4}\/\d{1,2}$/)) {
	datestring += '/01';
    }

    if (datestring.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
	d = datestring.split('/');
	dt = new Date(d[0], d[1] - 1, d[2]);
    } else {
	dt = new Date();
    }

    this.datetime = dt;
    this.calendarElement = undefined;
}

SimpleCalendar.prototype.id;
SimpleCalendar.prototype.target;
SimpleCalendar.prototype.datestring;
SimpleCalendar.prototype.datetime;
SimpleCalendar.prototype.calendarElement;
SimpleCalendar.prototype.days = new Array('日', '月', '火', '水', '木', '金', '土');


SimpleCalendar.prototype.getCalendarElement = function() {
    if (this.calendarElement == undefined) {
	this.createCalendar()
    }
    return this.calendarElement;
}

SimpleCalendar.prototype.getYearMonthString = function(offset) {
    if (offset == undefined) {
	offset = 0;
    }
    offset += 1
    return this.datetime.getFullYear() + '-' + ('00' + (this.datetime.getMonth() + offset)).slice(-2);
}

SimpleCalendar.prototype.createCalendar = function() {
    this.calendarElement = document.createElement('div');
    this.calendarElement.setAttribute('id', 'CALENDAR_' + this.id);

    var caption = document.createElement('div');
    caption.setAttribute('style', 'padding: 2px 1px 1px;')
    var text = document.createTextNode(this.getYearMonthString());
    caption.appendChild(text);
    this.calendarElement.appendChild(caption);

    var ctrl = document.createElement('span');
    ctrl.setAttribute('style', 'display: block; float: right;');
    caption.appendChild(ctrl);

    var text = document.createTextNode('<');
    var elem = document.createElement('span');
    elem.appendChild(text);    
    elem.setAttribute('onClick', 'replace_calendar(\'' + this.id + '\', \'' +
		      this.target + '\', \'' + 
		      this.getYearMonthString(-1) + '\')');
    elem.setAttribute('style', 'cursor: pointer;')
    ctrl.appendChild(elem);

    var text = document.createTextNode(' ');
    ctrl.appendChild(text);

    today = new Date();
    thisMonth = today.getFullYear() + '-' + 
	('00' + (today.getMonth() + 1)).slice(-2)

    var text = document.createTextNode('□');
    var elem = document.createElement('span');
    elem.appendChild(text);    
    elem.setAttribute('onClick', 'replace_calendar(\'' + this.id + '\', \'' +
		      this.target + '\', \'' + 
		      thisMonth + '\')');
    elem.setAttribute('style', 'cursor: pointer;')
    ctrl.appendChild(elem);

    var text = document.createTextNode(' ');
    ctrl.appendChild(text);

    var text = document.createTextNode('>');
    var elem = document.createElement('span');
    elem.appendChild(text);    
    elem.setAttribute('onClick', 'replace_calendar(\'' + this.id + '\', \'' +
		      this.target + '\', \'' + 
		      this.getYearMonthString(1) + '\')');
    elem.setAttribute('style', 'cursor: pointer;')
    ctrl.appendChild(elem);

    var text = document.createTextNode(' ');
    ctrl.appendChild(text);

    var text = document.createTextNode('×');
    var elem = document.createElement('span');
    elem.appendChild(text);
    elem.setAttribute('onClick', 'delete_calendar(\'' + this.id + '\')');
    elem.setAttribute('style', 'cursor: pointer;')
    ctrl.appendChild(elem);

    var css = 'font-size: small; border: 0; border-collapse: collapse;';
    var table = document.createElement('table');
    table.setAttribute('style', css)

    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    for (var i = 0; i < this.days.length; i++) {
	var th = document.createElement('th');
	th.setAttribute('style', 
			'border: 0; background: #ccc; padding: 4px 5px;');
	var text = document.createTextNode(this.days[i]);
	th.appendChild(text);
	tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    dt = new Date(this.datetime.getFullYear(), 
		  this.datetime.getMonth(),
		  1)
    dt.setDate(dt.getDate() - dt.getDay());

    while(dt.getFullYear() + ('00' + dt.getMonth()).slice(-2) <=
	  this.datetime.getFullYear() + 
	  ('00' + this.datetime.getMonth()).slice(-2)) {
	var tbody = document.createElement('tbody');
	var tr = document.createElement('tr');
	for (var i = 0; i < 7; i++) {
	    var td = document.createElement('td');
	    var func = 'set_value(\'' + this.target + '\', \'' + 
		dt.getFullYear() + '/' + 
		('00' + (dt.getMonth() + 1)).slice(-2) + '/' + 
		('00' + dt.getDate()).slice(-2) + '\')'
	    td.setAttribute('onClick', func);
	    var sty = 'cursor: pointer; border: 0; padding: 4px 5px; '
	    sty += 'text-align: right;'
	    if (this.datetime.getMonth() != dt.getMonth()) {
		sty += 'background: #DDD;';
	    }
	    if (dt.getDay() == 0) {
		sty += 'color: red;';
	    } else if (dt.getDay() == 6) {
		sty += 'color: blue;';
	    }
	    td.setAttribute('style', sty);
	    var text = document.createTextNode(dt.getDate());
	    td.appendChild(text);
	    tr.appendChild(td);
	    dt.setDate(dt.getDate() + 1);
	}
	tbody.appendChild(tr);
	table.appendChild(tbody);
    }
    this.calendarElement.appendChild(table);
}

