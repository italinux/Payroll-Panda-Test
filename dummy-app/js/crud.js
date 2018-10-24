/*!
 * Simple Crud
 * Matteo Montanari - 19/07/2018
 * for PayRollPanda
 */

var crudApp = function () {

    this.userData = [{
        name: 'James Isaac Netron',
        email: 'neutron@example.com',
        city: 'Cambridge',
        rideInGroup: 'Always',
        daysOfTheWeek: 'Every day',
        registrationDay: '13/08/2018 <span>11:29AM</span>'
    }, {
        name: 'Carl Wheezer',
        email: 'carl@example.com',
        city: 'Berlin',
        rideInGroup: 'Sometimes',
        daysOfTheWeek: 'Week days',
        registrationDay: '19/04/2018 <span>00:29AM</span>',
    }, {
        name: 'Cindy Vortex',
        email: 'cindyvortex@example.com',
        city: 'Rome',
        rideInGroup: 'Never',
        daysOfTheWeek: 'Weekends',
        registrationDay: '13/08/2018 <span>06:20PM</span>',
    }, {
        name: 'Sheen Estevez',
        email: 'sheen@example.com',
        city: 'Tokyo',
        rideInGroup: 'Sometimes',
        daysOfTheWeek: 'Mon, Wen, Fri',
        registrationDay: '13/08/2018 <span>10:12AM</span>',
    }, ];


    // Update table according to data
    this.updateTable = function() {

        var dataTable = document.getElementById('table'),
            tableHead = document.getElementById('table-title');

        while (dataTable.firstChild) {
               dataTable.removeChild(dataTable.firstChild);
        }

        var td = [];

        var totInputs = Object.keys(this.userData[0]).length;

        dataTable.appendChild(tableHead);

        for (var i = 0; i < this.userData.length; i++) {

             var tr = document.createElement('div');
                 tr.setAttribute('class', 'row');

                 // create delete button
                 btnDelete = document.createElement('a');
                 btnDelete.setAttribute('id', i);
                 btnDelete.setAttribute('class', 'fa fa-trash-o fa-1x"');
                 btnDelete.setAttribute('onclick', 'crudApp.Delete('+i+')');

                for( var k = 0; k < (totInputs + 1); k++ ) {
                 td[k] = document.createElement('div');
                 td[k].setAttribute('class', 'col');
                 tr.appendChild(td[k]);
                }

                td[0].innerHTML = this.userData[i].name;
                td[1].innerHTML = this.userData[i].email;
                td[2].innerHTML = this.userData[i].city;
                td[3].innerHTML = this.userData[i].rideInGroup;
                td[4].innerHTML = this.userData[i].daysOfTheWeek;
                td[5].innerHTML = this.userData[i].registrationDay;

                td[6].appendChild(btnDelete);

            dataTable.appendChild(tr);
        }
    };

   /* - - - - - - - - - - - - - - - - - - - - - - -
    * Delete
    */
    this.Delete = function(id) {
        if (confirm("Are you sure you want to delete?")) {
            this.userData.splice(id, 1);
            this.updateTable();
            crudApp.Clear();
        }
    };

 
   /* - - - - - - - - - - - - - - - - - - - - - - -
    * Save new data
    */
    this.Save = function() {

        var i;

        // main inputs
        var objName = document.getElementById('name'),
           objEmail = document.getElementById('email'),
            objCity = document.getElementById('city');

        // ride in group
        var objRideInGroup = document.getElementsByName('ride-in-group');
        var rideInGroupValue;

        for (i = 0, length = objRideInGroup.length; i < length; i++) {
            if (objRideInGroup[i].checked) {

                rideInGroupValue = objRideInGroup[i].value;

                // only one radio can be logically checked
                break;
            }
        }

        // days of the week
        var objDaysOfTheWeek = document.getElementsByName('days-of-the-week[]');
        var daysOfTheWeek = [];

        for (i = 0, length = objDaysOfTheWeek.length; i < length; i++) {
            if (objDaysOfTheWeek[i].checked) {

                daysOfTheWeek.push(objDaysOfTheWeek[i].value);
            }
        }

        // Create Aliases (days of the week)
        var daysOfTheWeekValue = (daysOfTheWeek.length == 0 ) ? 'None' : daysOfTheWeek.join(', ');

            daysOfTheWeekValue = (daysOfTheWeek.join(' ') == 'Sun Sat') ? 'Weekends' : daysOfTheWeekValue;

            daysOfTheWeekValue = (daysOfTheWeek.join(' ') == 'Mon Tue Wed Thu Fri') ? 'Week days' : daysOfTheWeekValue;

            daysOfTheWeekValue = (daysOfTheWeek.join(' ') == 'Sun Mon Tue Wed Thu Fri Sat') ? 'Every day' : daysOfTheWeekValue;


        /* - - - - - - - - - - - - - - - - - - - - - - -
        * inputs validation
        */
        if (objName.value.trim() =='') {
            objName.classList.add("required");
        }
        if (objEmail.value.trim() =='') {
            objEmail.classList.add("required");
        }

        if (objName.value.trim() =='' || objName.value.trim() =='') {
            alert('Please complete Required fields');
        } else {

            var dataToAdd = {
                name: objName.value,
                email: objEmail.value,
                city: objCity.value,
                rideInGroup: rideInGroupValue,
                daysOfTheWeek: daysOfTheWeekValue,
                registrationDay: new Date(Date.now()).toLocaleString('en-GB', {hour12: true}).replace(/,/, '<span>').replace(/:\d+ /, '') + '</span>',
            };

            this.userData.push(dataToAdd);
            this.updateTable();
        }
    };

    /* - - - - - - - - - - - - - - - - - - - - - - -
    * Clear main inputs
    */
    this.Clear = function() {
            document.getElementById('name').value = '';
           document.getElementById('email').value = '';
            document.getElementById('city').value = '';
    };

    /* - - - - - - - - - - - - - - - - - - - - - - -
    * Initialise
    */
    this.init = function() {
        this.updateTable();

        var btnSave = document.getElementById('btn-save'),
          btnCancel = document.getElementById('btn-cancel');

        btnSave.onclick = function() {
            crudApp.Save();
            crudApp.Clear();
        };

        btnCancel.onclick = function() {
            crudApp.Clear();
        };
    };

};

var crudApp = new crudApp();

crudApp.init();
