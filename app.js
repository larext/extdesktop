/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'Desktop',

    //-------------------------------------------------------------------------
    // Most customizations should be made to Desktop.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    requires: [
        'Desktop.App',
        'Ext.layout.container.boxOverflow.Menu',
        'Desktop.view.login.Login',
    ],
    launch: function() {
        Ext.Ajax.request({
            scope: this,            
            url: '/larext/auth',
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