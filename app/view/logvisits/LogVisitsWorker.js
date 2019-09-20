Ext.define('Desktop.view.logvisits.LogVisitsWorker', {
    extend: 'Ext.grid.Panel',
    xtype: 'log-visits-worker',
    controller: 'log-cont-workers',
    store: {type: 'users'},

    tbar: [

        {
            reference:'logFilterDep', triggerAction:'all',
            xtype: 'remcombo', editable: false, labelAlign: 'right', labelWidth: 70, width: 300, emptyText: 'Выбрать', fieldLabel: 'Отделы', margin:'0 0 0 0',
            store: {type:'divisions'},
            listeners:{
                select: 'onDepComboSelect'
            }
        },

    ],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        emptyText:'Данные не найдены ... '
    },

    bbar: {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true
    },
    columns: [

        {text: "ID", width: 40, hidden: true, align:'right', sortable: true, dataIndex: 'id'},
        {text: "Сотрудник",  dataIndex: 'fio',flex:2},
        


    ],
    listeners: {
        select: 'onWorkersSelect'
    }
});
