Ext.define('Desktop.view.users.RolesTree', {
    extend: 'Ext.tree.Panel',
    alias: ['widget.roles-grid-tree'],
    controller: 'roles',
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    storeName: 'Ext.data.TreeStore',
    border: false,
    
    //idFieldName: 'id',
    storeConfig: null,
    modelName: 'Ext.data.TreeModel',
    apiUrl: '/admin/action.php',
    storeAutoLoad: true,
    hideHeaders : true,
    tbar: [
        { text: 'Refresh', iconCls: 'x-fa fa-refresh', handler: 'onRefreshTree', userCls:'g-green' }
    ],
    initComponent: function() {
        var me = this;
        this.dockedItems = this.dockedItems || [];
        this.createColumns();
        this.createStore();

        this.callParent(arguments);
    },

    createStore: function(){
        var model = new Ext.data.TreeModel({
            fields: [
                {name: 'name',     type: 'string'},
            ]
        });

        this.store = Ext.create(this.storeName, {
            model: model,
            autoLoad: true,
            remoteFilter: true,
            remoteSort: false,
            proxy: {
                keepRawData: true,
                type: 'ajax',
                actionMethods: {
                    read: "POST"
                },
                noCache: false,
                url: this.apiUrl,
                extraParams: this.getExtraParams()
            }
        });

    },


    getExtraParams : function(){
        var extraParams = {
            module:'CRoleAccess',
            action:"getTreeAccess",
            treeId:"id",
            treeName:"name",
            treeParent:"parent_id",
            htype:1,
            role_id:0,
        };

        return extraParams;
    },


    createColumns: function(){
        this.columns = this.getColumnsConfig();
    },

    getColumnsConfig: function(){
        var me = this;
        var items = [{
                xtype : 'treecolumn', text: "Name", flex: 1, align: 'left', sortable: false, dataIndex: 'name',
                renderer: function(value, meta) {
                    meta.style = "white-space: normal;";
                    return value;
                }
            }];

        return items;
    },
    listeners: {
        checkchange: 'onRolesCheckChange'
    },


});
