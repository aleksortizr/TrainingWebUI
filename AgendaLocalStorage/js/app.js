$(function () {


    // Id para el contacto agregado
    var _id = 2;

    App = {
        showAll: function () {
            // 
            var _html;
            for (var i = 1, t = localStorage.length; i < t; i++) {
                var user = JSON.parse(localStorage.getItem(i));
                try {
                    _html += "<tr>" +
                        "<td>" + localStorage.key(i) + "</td>" +
                        "<td>" + user.nombre + "</td>" +
                        "<td>" + user.direccion + "</td>" +
                        "<td>" + user.cellphone + "</td>" +
                        "<td>" + user.email + "</td>" +
                        "<td><button class='btn btn-primary btn-xs' ><span class='glyphicon glyphicon-pencil'></span></button></td>" +
                        "<td><button class='btn btn-danger btn-xs' ><span class='glyphicon glyphicon-trash'></span></button></td>" +
                        "</tr>";
                } catch (e) {
                    console.log("Data no correspondiente");
                };
            }

            return _html;
        },
        save: function (item) {
            // Existe localStorage?
            var storage;
            try {
                if (localStorage.getItem) {
                    storage = localStorage;
                    //guardando como string 
                    storage.setItem(_id, item);

                    //incrementar id
                    _id++;
                }
            } catch (e) {
                storage = {};
                console.log("Su navegador no soporta local storage");
            }

        },
        showItem: function (id) {
        	var user = JSON.parse(localStorage.getItem(id));
            return "<tr>" +
	                "<td>" + id + "</td>" +
	                "<td>" + user.nombre + "</td>" +
	                "<td>" + user.direccion + "</td>" +
	                "<td>" + user.cellphone + "</td>" +
	                "<td>" + user.email + "</td>" +
	                "<td><button id='edit-"+id+"' class='btn btn-primary btn-xs' ><span class='glyphicon glyphicon-pencil'></span></button></td>" +
	                "<td><button id='del-"+id+"' class='btn btn-danger btn-xs' ><span class='glyphicon glyphicon-trash'></span></button></td>" +
	                "</tr>";             
        },
        destroy: function (id) {
            //Eliminar el item con el id indicado
             localStorage.removeItem(id);
        },
        clear: function () {
            // Este método elimina todo el espacio de almacenamiento. Todas las claves se eliminan.
            localStorage.clear();
        },
        edit: function (id, item) {
            if (localStorage.getItem(id)) {
                localStorage.setItem(_id, item);
            }
        }
    };

    //evento submit del formulario
    $('#frmAgregarContacto').on('submit', function (eEvento) {        
        //evitamos que el form se envie (para que no recargue la pagina)
        eEvento.preventDefault();

        var strName = $("#name").val();
        var strDireccion = $("#direccion").val();
        var strEmail = $("#email").val();
        var strTel = $("#cellphone").val();

        //creando el objeto
        var _newContact = {
            nombre: strName,
            direccion: strDireccion,
            cellphone: strTel,
            email: strEmail
        };

        _newContact = JSON.stringify(_newContact);
        // Guardamos el nuevo contacto
        App.save(_newContact);
        $('#tblTablaContactos > tbody:last').append(App.showItem(_id-1));

    });

    // evento para eliminar todo el storage
    $( "#deleteStorage" ).click(function() {
    	App.clear();
    	// Mostrar datos pregarcados
    	$('#tblTablaContactos > tbody').html("");	  	
	});

    

    	


});