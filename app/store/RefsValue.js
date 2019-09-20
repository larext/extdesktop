Ext.define('Desktop.store.RefsValue', {
    extend: 'Ext.data.Store',
    alias: 'store.refsvalue',
    autoLoad: true,
    fields:[
        {name:'id', type:'int'},
        {name:'ref_code', type:'string'},
        {name:'value', type:'string'},
        {name:'text', type:'string'},
        {name:'comments', type:'string'},
        {name:'sort', type:'int'},
        {name:'fixed', type:'int'}

    ],
    pageSize: 100,
    proxy: {
        type: 'ajax',
        url: '/app/api/refval',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'total'
        }
    }
});
