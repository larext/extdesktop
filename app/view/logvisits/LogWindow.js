Ext.define('Desktop.view.logvisits.LogWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Desktop.store.LogVisit',
        'Desktop.view.logvisits.LogVisits',
        'Desktop.view.logvisits.LogController',
        'Desktop.view.logvisits.LogVisitsWorker',
        'Desktop.view.logvisits.LogWorkersController',
        'Ext.grid.filters.Filters'
    ],

    id:'log-win',

    init : function(){
        this.launcher = {
            text: 'Log Visits',
            iconCls:'visitors'
        };

         this.shortcut = {
            text: 'Log Visits',
            name: 'LogVisits',
            iconCls: 'visitors-shortcut'
        };

    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
            win = desktop.createWindow({
                id: this.id,
                title:'Log Visits',
                width:1200,
                height:480,
                border: false,
                iconCls: 'visitors',
                animCollapse:false,
                constrainHeader:true,
                layout: {type:'hbox',align:'stretch'},
                items:[
                    {xtype:'log-visits-worker',flex:1},
                    {xtype:'splitter'},
                    {
                        border:false,
                        layout: {
                            type: 'vbox',
                            align:'stretch',
                        },
                        flex:2,
                        items: [
                          {
                              xtype: 'panel',
                              border:false,
                              layout:'fit',
                              flex:2,
                              items:[
                                {xtype:'log-visits'}
                              ]
                          },
                        {xtype:'splitter'},
                          {
                              xtype: 'panel',
                              layout:'fit',
                              border:false,
                              flex:1,
                              items:[
                                {xtype:'log-visits'}
                              ]
                          }
                        ]
                    }
                ]
            });
        }
        return win;
    }
});
