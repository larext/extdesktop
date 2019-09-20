Ext.define('Desktop.store.Roles', {
    extend: 'Ext.data.Store',
    alias: 'store.roles',
    autoLoad: true,
    fields:[
        {name:'id', type:'int'},
        {name:'name', type:'string'},
        {name:'status', type:'int'},
        {name:'is_adm', type:'int'},
    ],
    pageSize: 100,
    proxy: {
        type: 'ajax',
        url: '/app/api/roles',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'total',
        }
    },
    
});
