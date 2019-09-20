Ext.define('Desktop.view.users.Editor', {
    extend: 'Ext.window.Window',
    xtype: 'users-edit',
    requires: [
        'Desktop.view.users.EditorController',
        'Desktop.store.Roles',
    ],
    autoShow: true,
    border: true,
    animCollapse: true,
    modal: true,
    width: 900,
    controller: 'userseditor',
    title: 'Редактировать',
    iconCls: 'x-fa fa-edit',
    layout: 'fit',
    initComponent: function(){
        this.maxHeight = Ext.getBody().getHeight();
        this.callParent(arguments);

    },
    items: [
        {
            xtype:'tabpanel', activeTab:0, layout: 'fit', border:false,
            items: [
                {
                    title:'Данные пользователя', reference:'projectForm', xtype:'form',
                    padding: '5 5 5 5',
                    layout: 'anchor', border:false, scrollable: true, height: '100%',
                    baseParams: {
                        module: 'CWorkers',
                        id:0
                    },
                    waitMsgTarget: true, fieldDefaults: {xtype:'textfield', labelWidth: 170, width: '100%'},
                    items: [
                        {xtype:'hidden', name:'mt'},
                        {
                            xtype: 'fieldcontainer',  layout: {type:'hbox'},
                            items: [
                                {flex:1, xtype:'textfield', name:'fio',  fieldLabel: 'ФИО', allowBlank:false},
                                {xtype: 'splitter'},
                                {flex:1, xtype:'textfield', name:'login',  fieldLabel: 'Логин', labelAlign:'right', allowBlank:false},
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',  layout: {type:'hbox'},
                            items: [
                                {flex:1, xtype:'combobox', name:'role_id', store: {type:'roles'}, valueField:'id', displayField:'name', fieldLabel: 'Роль',  editable: false, allowBlank:false},
                                {xtype: 'splitter'},
                                {flex:1, xtype:'combobox', name:'devision_id', store: {type:'departments'}, valueField:'id', displayField:'name', fieldLabel: 'Отдел', labelAlign:'right', editable: false, allowBlank:false},
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',  layout: {type:'hbox'},
                            items: [
                                {flex:1, xtype:'refcombo', name:'post_id', refName: 'worker_posts', fieldLabel: 'Должность',  editable: false},
                                {xtype: 'splitter'},
                                {flex:1, xtype:'refcombo', name:'status', refName: 'worker_status', fieldLabel: 'Cтатус', labelAlign:'right',  editable: false, allowBlank:false},
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',  layout: {type:'hbox'},
                            items: [
                                {flex:1, xtype:'textfield', fieldLabel: "Сотовый телефон",   name: 'mobilephone'},
                                {xtype: 'splitter'},
                                {flex:1, xtype:'textfield', fieldLabel: "Внут. телефон",  name: 'inphone', labelAlign:'right'},
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',  layout: {type:'hbox'},
                            items: [
                                {flex:1, xtype:'textfield', fieldLabel: "Быстрый вызов", name: 'fastdial'},
                                {xtype: 'splitter'},
                                {flex:1, xtype:'textfield', name:'token_id', fieldLabel:'TOKEN ID', readOnly: true, labelAlign:'right'},
                            ]
                        },

                        {
                            xtype: 'fieldcontainer',  layout: {type:'hbox'},
                            items: [
                                {flex:1, xtype:'textfield', name:'email', fieldLabel:'Почта', allowBlank:false},
                                {xtype: 'splitter'},
                                {flex:1, xtype:'textfield', name:'gmail', fieldLabel:'Google Почта', labelAlign:'right'},
                            ]
                        },
                    ]
                }
            ]
        }
    ],
    buttons: [
        {reference:'projectSave', text:'Сохранить', iconCls:'x-fa fa-save', userCls:'g-red'}
    ]
});
