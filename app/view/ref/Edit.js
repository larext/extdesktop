Ext.define('Desktop.view.ref.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'refval-edit',
    requires: [
        'Desktop.view.ref.EditController',
        'Desktop.store.RefsValue',
    ],
    autoShow: true,
    border: false,
    animCollapse: true,
    modal: true,
    width: 900,
    height: 240,
    controller: 'refseditor',
    title: 'Редактировать',
    iconCls: 'x-fa fa-edit',
    layout: 'fit',
    initComponent: function(){
        this.maxHeight = Ext.getBody().getHeight();
        this.callParent(arguments);

    },
    items: [
        {
            reference:'cRefsForm',
            xtype:'form',
            layout: 'anchor',
            margin:'5 5 5 5',
            scrollable: true,
            height: '100%',
            waitMsgTarget: true, fieldDefaults: {xtype:'textfield', labelWidth: 170, width: '100%'},
            items: [
                {
                    xtype: 'fieldcontainer',  layout: {type:'hbox'},
                    items: [
                        {flex:1,margin:'5 5 5 5', xtype:'textfield', name: 'ref_code', hidden:true ,  fieldLabel: 'Код:'},
                    ]
                },
                {
                    xtype: 'fieldcontainer',  layout: {type:'hbox'},
                    items: [
                        {flex:1,margin:'5 5 5 5', xtype:'textfield', name: 'value', Width: '100%',   fieldLabel: 'Значение:'},
                    ]
                },
                {
                    xtype: 'fieldcontainer',  layout: {type:'hbox'},
                    items: [
                        {flex:1,margin:'5 5 5 5', xtype:'textfield', name: 'text', Width: '100%',   fieldLabel: 'Название:'},
                    ]
                },
                {
                    xtype: 'fieldcontainer',  layout: {type:'hbox'},
                    items: [
                        {flex:1,margin:'5 5 5 5', xtype:'textfield', name: 'comments', Width: '100%',   fieldLabel: 'Комментарий:'},
                    ]
                },
                {
                    xtype: 'fieldcontainer',  layout: {type:'hbox'},
                    items: [
                        {flex:1,margin:'5 5 5 5', xtype:'textfield', name: 'sort', Width: '100%',   fieldLabel: 'Сортировка:'},
                    ]
                },
                {
                    xtype: 'fieldcontainer',  layout: {type:'hbox'},
                    items: [
                        {flex:1,margin:'5 5 5 5', xtype:'textfield', name: 'fixed',  hidden: true     },
                    ]
                }
            ]
        }],
    buttons: [
        {reference:'refsvalueSave', text:'Сохранить', iconCls:'x-fa fa-save', userCls:'g-red'}
    ]
});
