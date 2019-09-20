Ext.define('Desktop.view.users.EditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userseditor',
    afterRender: function(){
        this.getView().lookup('projectSave').on('click', this.onSaveForm, this);
        this.initLoad();
    },

    getForm: function(){
        return this.getView().lookup('projectForm').getForm();
    },

    onSaveForm: function(){
        var form = this.getForm();
        if(form.isValid()){
            var values = form.getValues();
            var recId = this.getView().recId;
            var url  = '/app/api/users/update/'+this.getView().recId;
            if(recId === 0) {
                url  = '/app/api/users/add';
            }
            form.submit({
                scope: this, url:url,
                waitMsg:'Подождите, пожалуйста ... ',
                success: function(){
                    this.getView().close();
                }
            });
        }
    },

    initLoad: function(){
        var form = this.getForm();
        var recId = this.getView().recId;
        form.baseParams['id'] = recId;
        if(recId > 0){
            this.onLoadForm(function(f, action){
                var values = form.getValues();

            }, this);

        }
    },
    onLoadForm: function(successCallback, scope){
        var form = this.getForm();
        //form.baseParams['action'] = 'load';
        form.load({
            url:'/app/api/users/load/'+this.getView().recId,
            scope: scope,
            waitMsg:'Подождите, пожалуйста ... ',
            success: successCallback
        });
    }





});
