Ext.application({
    name: 'Desktop',
    requires: [
        'Desktop.App',
        'Ext.layout.container.boxOverflow.Menu',
        'Desktop.view.login.Login',
    ],
    launch: function() {
        Ext.Ajax.setDefaultHeaders({
            'Content-Type': 'application/json'
        });

        Ext.Ajax.request({
            scope: this,            
            url: '/auth',
            method: 'GET',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                if(obj.csrf){
                    Ext.Ajax.setDefaultHeaders({
                        'X-CSRF-TOKEN':obj.csrf
                    });
                }

                if (obj && obj.success && obj.data) {
                    this.startApplication(obj.data);
                } else {
                    Ext.create({ xtype: 'login', startApplication: this.startApplication});
                }
            },
            failure: function(response, opts) {
                Ext.create({ xtype: 'login', startApplication: this.startApplication});
            }
        });
    },
    startApplication: function(data){
        Ext.getHead().down('title').setText(data.login);
        Ext.apply(Desktop, {
            data: data,
            dd: new Desktop.App(),
            getModule: function (module) {
                return this.dd.getModule(module);
            }
        });
    }
});
