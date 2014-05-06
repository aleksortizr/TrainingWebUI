var App = {
    init: function(){
        //cache localstorage
        this.storage = localStorage;
    },
    checkLocalStorage: function(){
        return !!localStorage.getItem;
    },
    showAll: function () {
        // 
        var strHtml;
        for (var i = 1, t = localStorage.length; i < t; i++) {
            var user = JSON.parse(localStorage.getItem(i));
            try {
                strHtml += "<tr>" +
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

        return strHtml;
    },
    save: function (item) {
        //Agregamos el item nuevo al final del array            
        this.contacts.push(item);
        var contacts = JSON.stringify(this.contacts);
        this.storage.setItem('contacts', contacts);
    },
    fetch: function(){
        //Obtenemos la key: contacts
        this.contacts = JSON.parse(this.storage.getItem('contacts'));
        //Si no existe, contacts pasa a ser un array
        if(!this.contacts){
            this.contacts = [];
        }
    },
    showItem: function (id) {
    	/*var user = JSON.parse(localStorage.getItem(id));
        return "<tr>" +
                "<td>" + id + "</td>" +
                "<td>" + user.nombre + "</td>" +
                "<td>" + user.direccion + "</td>" +
                "<td>" + user.cellphone + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td><button id='edit-"+id+"' class='btn btn-primary btn-xs' ><span class='glyphicon glyphicon-pencil'></span></button></td>" +
                "<td><button id='del-"+id+"' class='btn btn-danger btn-xs' ><span class='glyphicon glyphicon-trash'></span></button></td>" +
                "</tr>"; */            
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

$(function () {

        if(!App.checkLocalStorage()){
            alert('Tu navegador no soporta local storage');
            location.href  = 'http://firefox.com';
            return;
        }

        App.init();
        App.fetch();

    // Id para el contacto agregado
    var _id = 1;


    //evento submit del formulario
    $('#frmAgregarContacto').on('submit', agregarContacto);
     // evento para eliminar todo el storage
    $('#deleteStorage').on('submit', App.clear());
      
    function agregarContacto(eEvento) {        
        //evitamos que el form se envie (para que no recargue la pagina)
        eEvento.preventDefault();

        var strName = $("#name").val();
        var strDireccion = $("#direccion").val();
        var strEmail = $("#email").val();
        var strTel = $("#cellphone").val();

        //creando el objeto
        var newContact = {
            nombre: strName,
            direccion: strDireccion,
            cellphone: strTel,
            email: strEmail
        };

        // Guardamos el nuevo contacto
        App.save(newContact);
        $('#tblTablaContactos > tbody:last').append(App.showItem(_id-1));

    };
    




});