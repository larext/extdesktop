/*
 * Developer: Azamat Musaev
 * Date: 05.03.2019
 */

Ext.define('Desktop.view.divisions.Divisions',{
    extend: 'Ext.grid.Panel',
    xtype: 'divisions-grid',
    controller: 'divisions',
    store: { type: 'divisions' },
    tbar: [
        { text: 'Добавить', iconCls: 'x-fa fa-plus', userCls: 'g-green', handler: 'onAddDivisions' }
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
        id: 'divisions-editor',
        ptype: 'rowediting',
        clicksToEdit: 2
    }],
    listeners: {
        edit: 'onDivisionsEdit',
        canceledit: 'onDivisionsCancelEdit'
    },
    columns: [
        { text: "ID", width: 40, align: 'right', hideable: false, sortable: true, dataIndex: 'id' },
        { text: "Наименование", dataIndex: 'name', flex: 2, hideable: false, editor: { xtype: 'textfield' } },
        {
            text: 'Менежер  ', flex: 1, dataIndex: 'manager', hideable: false,
            renderer: Ext.util.Format.fieldRenderer('manager_name'),
            editor: {
                xtype:'remcombo',
                displayField: 'fio',
                valueField: 'id',
                store: {type:'users', autoLoad: true}
            }
        } ,

        {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, draggable: false, hideable:false, tdCls:'g-blue',
            items: [{
                getClass: function(v, m, rec) {
                    if (rec.get('id') > 0) {
                        return 'x-fa fa-pencil';
                    }
                    return '';
                },
                handler: 'onDivisionsStartEdit'
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
                handler: 'onDivisionsDelete'
            }]
        }


    ]
});
