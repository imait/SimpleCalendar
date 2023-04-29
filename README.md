# SimpleCalendar: provides calendar tool for HTML form

The programme SimpleCalendar provides simple calendar tool, which assists to input the date string into HTML form.

## Usage

It is very simple. It needs only one text field and one clickable element with *onClick* attribute.

the function *open_calendar()* needs three parameters.

`open_calendar(*ID for this calendar*, *ID for the target text field*, event)`

### Exemple

    <script type="text/javascript" src="./calendar.js"></script>
    </head>
    
    <body>
    <input type="textfield" id="TEST" />
    <span onClick="open_calendar('CAL', 'TEST', event)">カレンダー</span>
    </body>

## Link

* [Demonstration page](http://imait.github.io/SimpleCalendar/ "SimpleCalendar Demo Page")

## Author

* IMAI Toshiyuki

Copyright (c) 2015 IMAI Toshiyuki

This software is released under the MIT License, see LICENSE.