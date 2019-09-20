
Ext.define('Desktop.view.ref.Refs', {
    extend: 'Ext.grid.Panel',
    region:'west',
    xtype: 'refs-grid',
    controller: 'refs',
    store: { type: 'refs' },
    tbar: [
        { text: 'Добавить', iconCls: 'x-fa fa-plus', userCls: 'g-green', handler: 'onAddRef' }
    ],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        emptyText: 'Данные не найдены ... '
    },
    selModel: 'rowmodel',
    bbar: {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true
    },
    
    plugins: [{
        id: 'ref-editor',
        ptype: 'rowediting',
         clicksToEdit: 3
    }],
    listeners: {
        edit: 'onRefEdit',
        canceledit: 'onRefCancelEdit',
        select: 'onRefSelect',
        render : function(grid){
            grid.store.on('load', function(store, records, options){
                grid.getSelectionModel().select(0);

            });
        }
    },
    columns: [
        { text: "ID", width: 40, align: 'right', hideable: false, sortable: true, dataIndex: 'id' },
        { text: "Наименование", dataIndex: 'name', flex: 2, hideable: false, editor: { xtype: 'textfield' } },
        { text: "Текст", dataIndex: 'text', flex: 2, hideable: false, editor: { xtype: 'textfield' } },

        {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, draggable: false, hideable:false, tdCls:'g-blue',
            items: [{
                getClass: function(v, m, rec) {
                    if (rec.get('id') > 0) {
                        return 'x-fa fa-pencil';
                    }
                    return '';
                },
                handler: 'onRefStartEdit'
              //  handler: ''
            }]
        }, {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, draggable: false, hideable:false, tdCls:'g-red',
            items: [{
                getClass: function(v, m, rec) {
                    if (rec.get('id') > 0 ) {
                        return 'x-fa fa-trash';
                    }
                    return '';
                },
                handler: 'onRefDelete'
            //    handler: ''
            }]
        }


    ]
});
