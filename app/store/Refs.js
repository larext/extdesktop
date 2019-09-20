Ext.define('Desktop.store.Refs', {
    extend: 'Ext.data.Store',
    alias: 'store.refs',
    autoLoad: true,
    fields:[
        {name:'id', type:'int'},
        {name:'name', type:'string'},
        {name:'text', type:'string'},

    ],
    pageSize: 100,
    proxy: {
        type: 'ajax',
        url: '/app/api/ref',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'total',
        }
    }
});
