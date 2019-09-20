Ext.define('Desktop.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.users',
    autoLoad: false,
    fields:[
        {name: 'id', type:'int'},
        'fio','post_id','photo','devision_id','mobilephone','homephone','email','gmail', 'city_id',
        'inphone','fastdial','online','role_id_name','role_id','token_id','status','ip',
        {
            name:'post_name', mapping: function(data){
                return Ext.util.Format.refs('worker_posts', data.post_id);
            }
        }
    ],
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/app/api/users',
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
