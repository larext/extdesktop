Ext.define('Desktop.view.logvisits.LogVisits', {
    extend: 'Ext.grid.Panel',
    xtype: 'log-visits',
    controller: 'log-cont',
    store: {type: 'logstore'},

    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        emptyText:'Данные не найдены ... '
    },
    plugins: [{ptype:'gridfilters'}],
    bbar: {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true
    },
    columns: [
        {text: "ID", width: 40, hidden: true, align:'right', sortable: true, dataIndex: 'id'},
        {text: "Сотрудник",  dataIndex: 'worker_name',flex:2},
        {text: "IP адрес",  dataIndex: 'ip',flex:2, filter: {type:'number'}},
        {text: "От",  dataIndex: 'start_date', renderer: function(v){ return Ext.util.Format.date(v, "H:i"); }},
        {text: "До",  dataIndex: 'end_date',flex:1.2,renderer: function(v){ return Ext.util.Format.date(v, "H:i"); }},
        {text: "Работал",  dataIndex: 'minute',flex:1},

    ]
});
