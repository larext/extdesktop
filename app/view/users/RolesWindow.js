Ext.define('Desktop.view.users.RolesWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Desktop.store.Roles',
        'Desktop.view.users.Roles',
        'Desktop.view.users.RolesTree',
        'Desktop.view.users.RolesController',
        'Ext.grid.plugin.RowEditing'
    ],

    id: 'division',

    init: function() {


    },

    createWindow: function() {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if (!win) {
            win = desktop.createWindow({
                id: this.id,
                title: 'Roles',
                width: 900,
                height: 480,
                border: false,
                iconCls: 'roles',
                animCollapse: false,
                constrainHeader: true,
                layout: {type:'hbox',align:'stretch'},
                items: [
                  {
                      xtype: 'roles-grid',flex:1
                  },
                  { xtype: 'splitter'},
                  {
                      xtype: 'roles-grid-tree',flex:1
                  }
                ]
            });
        }
        return win;
    }
});
