var App = {
    init: function($table){
        this.$table = $table;
        //bind methods to object
        this.bindAll();
        //cache localstorage
        this.storage = localStorage;
        //render handlebars templates
        this.compileTemplates();
    },
    bindAll: function(){
        this.clear = this.clear.bind(this);
        this.renderItem = this.renderItem.bind(this);
        //this.editElement = this.editElement.bind(this);
    },
    checkLocalStorage: function(){
        return !!localStorage.getItem;
    },
    compileTemplates: function(){
        this.templates = {
            'contact': Handlebars.compile($('#items-template').html())
        };
    },
    render: function() {
        $.each(this.contacts, this.renderItem);
    },
    renderItem: function(index, item){
        this.$table.append(this.templates.contact(item));
    },
    save: function (item) {
        //Agregamos el item nuevo al final del array            
        this.contacts.push(item);
        var contacts = JSON.stringify(this.contacts);
        this.storage.setItem('contacts', contacts);
        this.renderItem(null, item);
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

    var table = $('#tblTablaContactos > tbody');

    App.init(table);
    App.fetch();
    App.render();


    //evento submit del formulario
    $('#frmAgregarContacto').on('submit', agregarContacto);
    $("#deleteStorage").on('click', App.clear);


    function agregarContacto(eEvento) {        
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
        // Guardamos el nuevo contacto
        App.save(_newContact);
    }
    



});