Ext.define('Desktop.store.LogVisit', {
    extend: 'Ext.data.Store',
    alias: 'store.logstore',
    autoLoad: false,
    fields:[
        'id','worker_id','start_date','end_date', 'worker_name','devision_id','ip',
        {
            name:'minute',
            mapping: function(data){
                var minutes = 0;
                var hour = 0;
                  minutes = new Date(data.end_date).getTime()  - new Date(data.start_date).getTime();
                  minutes = parseInt(minutes/(60*1000));
                  hour = parseInt(minutes/60);
                  minutes = minutes - hour * 60;
                  return (hour>0 ? hour +"ч. ": "")+(minutes > 0 ? minutes +"м.":"0м.");
                }

        }

    ],
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/larext/products',
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
