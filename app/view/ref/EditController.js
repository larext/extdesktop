Ext.define('Desktop.view.ref.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.refseditor',
    afterRender: function(){
        this.getView().lookup('refsvalueSave').on('click', this.onSaveRefsValueForm, this);
        this.initLoad();
    },

    getForm: function(){
        return this.getView().lookup('cRefsForm').getForm();
    },

    onSaveRefsValueForm: function(){
        var form = this.getForm();
        params: {debug:1};
        if(form.isValid()){
            var values = form.getValues();
            var recId = this.getView().recId;
            var url  = '/app/api/refval/update/'+this.getView().recId;
            if(recId === 0) {
                url  = '/app/api/refval/add';
            }
            form.submit({
                scope: this, url:url,
                waitMsg:'Подождите, пожалуйста ... ',
                success: function(){
                    this.getView().close();

                }
            });
        };
        this.initLoad();
    },

    initLoad: function(){
        var form = this.getForm();
        var recId = this.getView().recId;
        if(recId > 0){
            this.onLoadForm(function(f, action){
                var values = form.getValues();
            }, this);
        };
        var ref_code = this.getView().ref_code;
        if(Ext.isDefined(ref_code)){
            form.setValues({ref_code: ref_code});
        }
    },
    onLoadForm: function(successCallback, scope){
        var form = this.getForm();
        form.load({
            url:'/app/api/refval/load/'+this.getView().recId,
            scope: scope,
            params: {debug:1},
            waitMsg:'Подождите, пожалуйста ... ',
            success: successCallback
        });
    }

});
