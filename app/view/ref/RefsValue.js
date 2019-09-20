
Ext.define('Desktop.view.ref.RefsValue', {
    extend: 'Ext.grid.Panel',
    region:'center',
    xtype: 'refsvalue-grid',
    controller: 'refsvalue',
    store: { type: 'refsvalue' },
    tbar: [
        { text: 'Добавить', iconCls: 'x-fa fa-plus', userCls: 'g-green', handler: 'onAddRefsValue'  }

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
    listeners: {
        edit: 'onRefsValueEdit',
        canceledit: 'onRefsValueCancelEdit',
            render : function(grid){
                grid.store.on('load', function(store, records, options){
                    grid.getSelectionModel().select(0);

                });
            }
    },

    columns: [

        { text: "ID",  hidden: false,  dataIndex: 'id' },
        { text: "Код", hidden: false, dataIndex: 'ref_code', hideable: true },
        { text: "Значение", dataIndex: 'value', flex: 1, hideable: false },
        { text: "Название", dataIndex: 'text', flex: 2, hideable: false },
        { text: "Комментарий", dataIndex: 'comments', flex: 2, hideable: false },
        { text: "Сорт", dataIndex: 'sort', flex: 1, hideable: false  },
        { text: "Блокированный",  hidden: true, dataIndex: 'fixed', flex: 2},


{
            xtype: 'actioncolumn', width: 30, menuDisabled: true, draggable: false, hideable:false, tdCls:'g-blue',
            items: [{
                getClass: function(v, m, rec) {
                    if (rec.get('id') > 0) {
                        return 'x-fa fa-pencil';
                    }
                    return '';
                },
                handler: 'onRefsValueStartEdit'
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
                handler: 'onRefsValueDelete'
            }]
        },

        {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, draggable: false, hideable:false, tdCls:'g-red',
            items: [{
                getClass: function(v, m, rec) {
                    if (rec.get('id') > 0 ) {
                        return 'x-fa fa-lock';
                    }
                    return '';
                },
                handler: 'onRefsValueBlock'
            }]
        }


    ]
});