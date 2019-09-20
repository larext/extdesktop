Ext.define('Desktop.view.users.UsersWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Desktop.store.Users',
        'Desktop.store.Departments',
        'Desktop.view.users.Users',
        'Desktop.view.users.UsersController'
    ],

    id:'users',

    init : function(){
        this.launcher = {
            text: 'Users', iconCls:'users',
            menu: {
                items: [
                    {text:'Users', iconCls:'users'},
                    {text:'Roles', iconCls:'roles'},
                ]
            }
        };

        this.shortcut = {name: 'Users', text: 'Users', iconCls: 'users-shortcut'};

        this.quickStart = {name: 'Users', iconCls: 'users'};
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
            win = desktop.createWindow({
                id: this.id,
                title:'Users',
                width:900,
                height:480,
                border: false,
                iconCls: 'users',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: {
                    xtype:'users-grid'
                }
            });
        }
        return win;
    }
});
