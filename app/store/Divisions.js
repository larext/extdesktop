Ext.define('Desktop.store.Divisions', {
    extend: 'Ext.data.Store',
    alias: 'store.divisions',
    autoLoad: false,
    fields: [
        {name: 'id', type:'int'},
        {name: 'name', type:'string'},
        {name: 'manager', type:'int'},
        {name: 'manager_name', type:'string'},
    ],
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/app/api/divisions',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'totalCount',
        }
    }
});