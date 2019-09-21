/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.App', {
    extend: 'Ext.ux.desktop.App',
    shortcutTpl: [
        '<tpl for=".">',
        '<div class="ux-desktop-shortcut" id="{module}-shortcut">',
        '<div class="ux-desktop-shortcut-icon {iconCls}">',
        '<img src="', Ext.BLANK_IMAGE_URL, '" title="{text}">',
        '</div>',
        '<span class="ux-desktop-shortcut-text">{text}</span>',
        '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    ],
    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'Desktop.Functions',
        'Desktop.view.ref.RefsWindow',
        'Desktop.view.divisions.DivisionsWindow',
        'Desktop.view.users.UsersWindow',
        'Desktop.view.users.RolesWindow',
    ],

    init: function() {
        this.callParent();
    },

    getModules: function() {
        return [
            //new Desktop.SystemStatus(),

            new Desktop.view.ref.RefsWindow(),
            new Desktop.view.users.RolesWindow(),
            new Desktop.view.divisions.DivisionsWindow(),
            new Desktop.view.users.UsersWindow(),
            new Desktop.view.logvisits.LogWindow(),
        ];
    },

    getDesktopConfig: function() {
        var me = this,
            ret = me.callParent();
        var shortcuts = [];
        Ext.each(me.modules, function(module) {
            var shortcut = Ext.clone(module.shortcut);
            if (shortcut) {
                shortcut.module = module.id;
                shortcuts.push(shortcut);
            }
        }, this);

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',
            contextMenuItems: [
                //{ text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: shortcuts
            }),

            wallpaper: 'resources/images/wallpapers/logo.svg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig: function() {
        var me = this,
            ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    //{text:'Settings', iconCls:'settings', handler: me.onSettings, scope: me},
                    //'-',
                    { text: 'Sign Out', iconCls: 'x-fa fa-sign-out-alt', userCls:'g-red', handler: me.onLogout, scope: me }
                ]
            }
        });
    },

    getTaskbarConfig: function() {
        var me = this,
            ret = this.callParent();
        var shortcuts = [];
        //shortcuts.push({ name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'});
        Ext.each(me.modules, function(module) {
            var shortcut = Ext.clone(module.quickStart);
            if (shortcut) {
                shortcut.module = module.id;
                shortcuts.push(shortcut);
            }
        }, this);

        return Ext.apply(ret, {
            quickStart: shortcuts,
            startIconCls:'x-fa fa-home',
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function() {
        Ext.MessageBox.show({
            title: 'МЭЛТОР',
            msg: 'Вы собираетесь покинуть систему. <br />Выйти?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            fn: function(buttonId) {
                if (buttonId === "yes") {
                    Ext.Ajax.request({
                        url: '/logout',
                        method: 'POST',
                        scope: this,
                        callback: function(response, opts) {
                            this.desktop.destroy();
                            window.location.href = window.location.href;
                        }
                    });
                }
            }
        });
    },

    onSettings: function() {
        var dlg = new Desktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }

});
