Ext.define('Desktop.view.users.Roles', {
    extend: 'Ext.grid.Panel',
    xtype: 'roles-grid',
    controller: 'roles',
    store: { type: 'roles', pageSize: 25 },
    tbar: [
        { text: 'Добавить', iconCls: 'x-fa fa-plus', handler: 'onAddRoles', userCls:'g-green' }
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
        id: 'roles-editor',
        ptype: 'rowediting',
        clicksToEdit: 2
    }],
    listeners: {
        edit: 'onRolesEdit',
        canceledit: 'onRolesCancelEdit',
        select: 'onRolesSelect',

    },
    columns: [
        { text: "ID", width: 50, align: 'right', hideable:false, dataIndex: 'id' },
        { text: "Наименование", dataIndex: 'name', flex: 1, hideable:false, editor: {xtype:'textfield'}},
        {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, draggable: false, hideable:false, tdCls:'g-blue',
            items: [{
                getClass: function(v, m, rec) {
                    if (rec.get('id') > 0) {
                        return 'x-fa fa-pencil';
                    }
                    return '';
                },
                handler: 'onRolesStartEdit'
            }]
        }, {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, draggable: false, hideable:false, tdCls:'g-red',
            items: [{
                getClass: function(v, m, rec) {
                    if (rec.get('id') > 0 && rec.get('is_adm') === 0) {
                        return 'x-fa fa-trash';
                    }
                    return '';
                },
                handler: 'onRolesDelete'
            }]
        }


    ]
});
