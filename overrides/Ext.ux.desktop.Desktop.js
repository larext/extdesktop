Ext.override(Ext.ux.desktop.Desktop, {
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
    ]
});