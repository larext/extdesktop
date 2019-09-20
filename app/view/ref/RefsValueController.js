Ext.define('Desktop.view.ref.RefsValueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.refsvalue',
    afterRender: function() {
        this.getView().getStore().load();
    },


    getRefsValue: function(){
        return this.getView().up().down('[xtype=refsvalue-grid]');
    },

    onRefsValueDelete: function(view, rowIndex, colIndex, item, e, record) {

        Ext.Msg.confirm('Удалить строку', 'Действительно ли вы хотите удалить строку "' + record.get('text') + '" ?',
            function(choice) {
                if (choice === 'yes') {
                    Ext.Ajax.request({
                        scope: this,
                        url: '/app/api/refval/delete/' + record.get('id'),

                        callback: function() {
                            this.getView().getStore().load();
                        }
                    });

                }
            }, this);
    },

    onRefsValueCancelEdit: function() {
        this.getView().getStore().reload();
    },

    onRefsValueBlock: function(view, rowIndex, colIndex, item, e, record) {

        Ext.Msg.confirm('Блокировать строку', 'Действительно ли вы хотите блокировать строку "' + record.get('text') + '" ?',
            function(choice) {
                if (choice === 'yes') {
                    Ext.Ajax.request(

                        {
                            url: '/action.php',
                            params: {
                                module: 'CRefbookValue',
                                action: 'blockRefbookValue',
                                id: record.get('id')
                            },
                            success: function () {
                            //    g.getStore().reload();
                            //     this.getView().getStore().load();
                            },
                            callback: function () {
                             //   g.getEl().unmask();
                            }
                        }


                    //    {
                    //    scope: this,
                    //    url: '/app/api/refval/delete/' + record.get('id'),
                    //
                    //    callback: function() {
                    //        this.getView().getStore().load();
                    //    }
                    //}

                );

                }
            }, this);

        console.log(record.get('text')+' blocked');
    },

    onRefsValueStartEdit: function(view, rowIndex, colIndex, item, e, record) {
        Ext.create({xtype: 'refval-edit', recId: record.get('id') });
        this.getView().getStore().reload();
    },


    onRefsValueEdit: function(editor, e) {

        var record = e.record;
        var recId = parseInt(record.get('id'));
        var params = {
            name: e.newValues.name,
            text: e.newValues.text
        };
        var url = '/app/api/refval' + (recId === 0 ? '/add' : '/update/' + recId);
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
    onAddRefsValue: function( b ) {
        var refValue = this.getView().up().down('[xtype=refs-grid]');
        var vStore= refValue.getStore();
        //grid.getSelectionModel().getSelected()
        //var ref_code1 = refValue.getSelectionModel().getSelected().get('ref_code');

        var row = refValue.getSelectionModel().getSelection()[0];
        ref_code1=(row.get('name'));

        //var rec = refValue.getView().getSelectionModel().getSelection();
        //var i= rec.get('name');

        //:  vStore.getAt(0).data.ref_code
        Ext.create({xtype: 'refval-edit', recId: 0, ref_code :  ref_code1});
       // console.log( ref_code1 );
    }
});