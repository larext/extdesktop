/*
 * Developer: Azamat Musaev
 * Date: 05.03.2019
 */

Ext.define('Desktop.view.divisions.DivisionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.divisions',
    afterRender: function() {
        this.getView().getStore().load();
    },
    onDivisionsDelete: function(view, rowIndex, colIndex, item, e, record) {
        Ext.Msg.confirm('Удалить отдел', 'Действительно ли вы хотите удалить отдел "' + record.get('name') + '" ?',
            function(choice) {
                if (choice === 'yes') {
                    Ext.Ajax.request({
                        scope: this,
                        url: '/app/api/divisions/delete/' + record.get('id'),
                        callback: function() {
                            this.getView().getStore().load();
                        }
                    });
                }
            }, this);

    },

    onDivisionsCancelEdit: function() {
        this.getView().getStore().reload();

    },

    onDivisionsStartEdit: function(view, rowIndex, colIndex, item, e, record) {
        var grid = this.getView();
        grid.getSelectionModel().select(record);
        grid.getPlugin('divisions-editor').startEdit(record, 1);
    },

    onDivisionsEdit: function(editor, e) {
        var record = e.record;
        var recId = parseInt(record.get('id'));
        var params = {
            name: e.newValues.name,
            manager: e.newValues.manager,
        };
        var url = '/app/api/divisions' + (recId === 0 ? '/add' : '/update/' + recId);
        Ext.Ajax.request({
            scope: this,
            url: url,
            method: 'POST',
            params: params,
            success: function(response, opts) {
                this.getView().getStore().reload();
            }
        });
    },
    onAddDivisions: function(b) {
        var grid = this.getView();
        var store = grid.getStore();
        var record = new Ext.data.Model({ id: 0 });
        store.insert(0, record);
        grid.getPlugin('divisions-editor').startEdit(record);

    }
});