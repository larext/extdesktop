Ext.define('Desktop.view.users.Users', {
    extend: 'Ext.grid.Panel',
    xtype: 'users-grid',
    controller: 'users-users',
    store: {type: 'users'},
    tbar: [
        {text:'Добавить', iconCls:'x-fa fa-plus', userCls:'g-green',  handler: 'onAddUser'},
        '->',
        {
            reference:'wSearch', xtype: 'textfield',
            width: 250,
            hideLabel: true,
            emptyText: 'Введите ключевые слова для поиска',
            config: {
                paramName: 'query', hasSearch: false,
                triggers: {
                    clear: {weight: 0, cls: Ext.baseCSSPrefix + 'form-clear-trigger', scope: 'this'},
                    search: {weight: 0, cls: Ext.baseCSSPrefix + 'form-search-trigger', scope: 'this'},
                }
            },
        }
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
        {text: "ФИО",  dataIndex: 'fio',flex:2},
        {text: "Должность",  dataIndex: 'post_id', renderer: Ext.util.Format.refsRenderer('worker_posts'), flex:2},
        {text: "Роль",  dataIndex: 'role_id_name',flex:1.2},
        {text: "Отдел",  dataIndex: 'devision_name',flex:1},
        {text: "Сотовый телефон",   dataIndex: 'mobilephone', flex:1},
        {text: "Внут. телефон",  dataIndex: 'inphone', hidden: true},
        {text: "Быстрый вызов", dataIndex: 'fastdial', hidden: true},
        {text: "Почта",  sortable: true, dataIndex: 'email', flex:1,fieldStyle: 'color: blue; text-decoration:underline; cursor:pointer',
            renderer: function(data, field) {
            
                return '<a href="mailto:' + data + '" target="_blank">' + data +'</a>';
            }
        },
        {text: "Google Почта",  sortable: true, dataIndex: 'gmail' ,hidden: true,},
        {text: "TOKEN ID",  sortable: true, dataIndex: 'token_id', flex: 1.6},
        {
            xtype:'actioncolumn', width: 30, menuDisabled:true, tdCls: 'g-blue',
            items: [{
                getClass: function(v, m, rec){
                    if(rec.get('id')>0){
                        return 'x-fa fa-pencil x-noexpand';
                    }
                    return '';
                },
                handler: 'onWorkersEdit'
            }]
        },
        {
            xtype:'actioncolumn', width: 30, menuDisabled:true, tdCls: 'g-red',text:'',
            items: [{
                getClass: function(v, m, rec){
                    if(rec.get('id')>0){
                        return 'x-fa fa-trash x-noexpand';

                    }
                    return '';
                },
                handler: 'onUserDelete',

            }]
        }

    ]
});
