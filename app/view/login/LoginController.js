Ext.define('Desktop.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function() {
        var form = this.lookup('loginForm');
        form.getForm().submit({
            clientValidation: true,
            scope: this,
            url: '/login',
            success: function(form, action) {
                if(action.result && action.result.csrf){
                    Ext.Ajax.setDefaultHeaders({
                        'X-CSRF-TOKEN':action.result.csrf
                    });
                }
                this.onStartView(action.result.data);
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Ajax communication failed');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', action.result.msg);
                }
            }
        });
    },
    onFormEnter: function(field, e){
        if (e.getKey() === e.ENTER) {
            this.onLoginClick();
        }
    },

    afterRender: function(){
        new Ext.util.DelayedTask(function(){
            this.lookup('loginUser').focus();
            //.setActive(true, true);
        }, this).delay(250);

        this.lookup('loginUser').on('specialkey', this.onFormEnter, this);
        this.lookup('loginPassword').on('specialkey', this.onFormEnter, this);
    },

    onStartView: function(data){
        var callback = this.getView().startApplication;
        this.getView().destroy();
        Ext.callback(callback, this, [data]);
    }
});