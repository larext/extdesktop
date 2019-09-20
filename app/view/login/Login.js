Ext.define('Desktop.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'Desktop.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',
    bodyPadding: 10,
    width: 300,
    iconCls: 'x-fa fa-key',
    title: 'Login',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form', reference: 'loginForm', bodyStyle:'background: transparent;', border: false,
        fieldDefaults: {anchor:'100%', labelWidth: 100, labelAlign:'right'},
        items: [
            {reference: 'loginUser', xtype: 'textfield', name: 'email', fieldLabel: 'Email', allowBlank: false},
            {reference: 'loginPassword', xtype: 'textfield', name: 'password', inputType: 'password', fieldLabel: 'Password', allowBlank: false},
            {xtype: 'displayfield', hideEmptyLabel: false, value: 'Enter any non-blank password'}
        ],
        buttons: [{
            text: 'Sign In', iconCls: 'x-fa fa-sign-in-alt', userCls:'g-green', scale: 'medium', minWidth: 100,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});