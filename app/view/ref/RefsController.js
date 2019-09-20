Ext.define('Desktop.view.ref.RefsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.refs',
    afterRender: function() {
        this.getView().getStore().load();
    },

    getRefVal: function(){
        return this.getView().up().down('[xtype=refsvalue-grid]');
    },

    onRefDelete: function(view, rowIndex, colIndex, item, e, record) {

        Ext.Msg.confirm('Удалить отдел', 'Действительно ли вы хотите удалить отдел "' + record.get('name') + '" ?',
            function(choice) {
                if (choice === 'yes') {
                    Ext.Ajax.request({
                        scope: this,
                        url: '/app/api/ref/delete/' + record.get('id'),
                        callback: function() {
                            this.getView().getStore().load();
                        }
                    });
                }
            }, this);
    },



    onRefCancelEdit: function() {
        this.getView().getStore().reload();
        this.getView().up().down('[xtype=button]').focus();
    },

    onRefStartEdit: function(view, rowIndex, colIndex, item, e, record) {

        var grid = this.getView();
        grid.getSelectionModel().select(record);
        grid.getPlugin('ref-editor').startEdit(record, 1);
    },

    onRefSelect:function(selModel, record, index, options){

        var refValue= this.getRefVal();
        var vStore= refValue.getStore();
         var n= record.get('name');

        delete vStore.proxy.extraParams['b.ref_code'];
        if(n === ''){

            delete vStore.proxy.extraParams['ref_code'];
        }else{

            vStore.proxy.extraParams['ref_code'] = n;
        }
        vStore.load();
    },

    onRefEdit: function(editor, e) {

        var record = e.record;
        var recId = parseInt(record.get('id'));
        var params = {
            name: e.newValues.name,
            text: e.newValues.text
        };
        var url = '/app/api/ref' + (recId === 0 ? '/add' : '/update/' + recId);
        Ext.Ajax.request({
            scope: this,
            url: url,
            method: 'POST',
            params: params,
            success: function(response, opts) {
                this.getView().getStore().reload();
                this.getView().up().down('[xtype=button]').focus();

            }
        });
    },
    onAddRef: function(b) {

        var grid = this.getView();
        var store = grid.getStore();
        var record = new Ext.data.Model({ id: 0 });
        store.insert(0, record);
        grid.getPlugin('ref-editor').startEdit(record);

    }
});