var App = {
    init: function(){
        //cache localstorage
        this.storage = localStorage;
    },
    checkLocalStorage: function(){
        return !!localStorage.getItem;
    },
    render: function() {
        $.each(this.contacts, this.renderItem);
    },
    renderItem: function(index, item){
        var strHtml = "<tr>" +
                "<td>" + 1 + "</td>" +
                "<td>" + item.nombre + "</td>" +
                "<td>" + item.direccion + "</td>" +
                "<td>" + item.cellphone + "</td>" +
                "<td>" + item.email + "</td>" +
                "<td><button class='btn btn-primary btn-xs' ><span class='glyphicon glyphicon-pencil'></span></button></td>" +
                "<td><button class='btn btn-danger btn-xs' ><span class='glyphicon glyphicon-trash'></span></button></td>" +
                "</tr>";
        $('#tblTablaContactos > tbody').append(strHtml);
        //this.$table.append(this.templates.contact(item));
    },
    save: function (item) {
        //Agregamos el item nuevo al final del array            
        this.contacts.push(item);
        var contacts = JSON.stringify(this.contacts);
        this.storage.setItem('contacts', contacts);
        //this.renderItem(item);
    },
    fetch: function(){
        //Obtenemos la key: contacts
        this.contacts = JSON.parse(this.storage.getItem('contacts'));
        //Si no existe, contacts pasa a ser un array
        if(!this.contacts){
            this.contacts = [];
        }
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
    App.render();

    //evento submit del formulario
    $('#frmAgregarContacto').on('submit', agregarContacto);
     // evento para eliminar todo el storage
    $('#deleteStorage').on('click', App.clear);
      
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
    };
    



});