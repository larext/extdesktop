/*
 * Developer: Azamat Musaev
 * Date: 05.03.2019
 */


Ext.define('Desktop.view.divisions.DivisionsWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Desktop.store.Divisions',
        'Desktop.store.RefsValue',
        'Desktop.view.divisions.Divisions',
        'Desktop.view.divisions.DivisionsController',
        'Ext.grid.plugin.RowEditing'
    ],

    id: 'divisions',

    init: function() {
        this.launcher = {
            text: 'Divisions',
            iconCls: 'departments'
        };

        this.shortcut = {
            text: 'Divisions',
            name: 'Divisions',
            iconCls: 'departments-shortcut'
        };

    },

    createWindow: function() {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if (!win) {
            win = desktop.createWindow({
                id: this.id,
                title: 'Divisions',
                width: 900,
                height: 480,
                border: false,
                iconCls: 'departments',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: {
                    xtype: 'divisions-grid'
                }
            });
        }
        return win;
    }
});
