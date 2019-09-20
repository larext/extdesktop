/**
 * Created by
 * Azamat   Musaev
 * on 13.03.2019.
 **/

Ext.define('Desktop.Functions', {
    extend: 'Ext.ux.desktop.Module',
        requires: [

        ]

    }


);

var winLinkOpen = function(link){
    Ext.get('linkOpen').dom.href = link;
    Ext.get('linkOpen').dom.click();
    };

