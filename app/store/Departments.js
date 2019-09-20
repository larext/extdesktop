Ext.define('Desktop.store.Departments', {
    extend: 'Ext.data.Store',
    alias: 'store.departments',
    autoLoad: false,
    fields: [
        {name:'id',            type:"int"},
        {name:'name',          type:"string"},
    ],
    proxy: {
        type: 'ajax',
        url: '/admin/action.php',
        actionMethods: {
            read:'POST'
        },
        extraParams:{
            module: 'CDevisions',
            action:"getList"
        },
        reader: {
            type: 'json',
            keepRawData: true,
            rootProperty: 'records',
            totalProperty: 'totalCount',
        }
    }
});
