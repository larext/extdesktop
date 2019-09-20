/*
 * Developer: Azamat Musaev
 * Date: 05.03.2019
 */

Ext.define('Desktop.view.ref.RefsWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Desktop.store.Refs',
        'Desktop.store.RefsValue',
        'Desktop.view.ref.Refs',
        'Desktop.view.ref.RefsValue',
        'Ext.grid.plugin.RowEditing',
        'Desktop.view.ref.RefsController',
        'Desktop.view.ref.RefsValueController',
        'Desktop.view.ref.Edit',
        'Desktop.view.ref.EditController'
    ],

    id: 'refs',

    init: function() {
        this.launcher = {
            text: 'Refs',
            iconCls: 'refs'
        };

        this.shortcut = {
            name: 'Refs',
            text: 'System Refs',
            iconCls: 'refs-shortcut'
        };

    },

    createWindow: function() {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if (!win) {
            win = desktop.createWindow({
                id: this.id,
                title: 'Refs',
                width: 1150,
                height: 570,
                border: false,
                iconCls: 'refs',
                animCollapse: false,
                constrainHeader: true,
                layout: 'border',
                items: [
                    {xtype: 'refs-grid', region: 'west', width:400, layout: 'fit', split:true},
                    {xtype: 'refsvalue-grid', region: 'center', flex:1, layout: 'fit'}
                ]
            });
        }
        return win;
    }
});