Ext.define('Desktop.view.users.RolesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roles',
    afterRender: function() {
        this.getView().getStore().load();
        this.getRolesGrid().getStore().on("load", function(store){
            this.getRolesGrid().getSelectionModel().select(0);
        }, this);
        
    },

    onRolesDelete:function(view, rowIndex, colIndex, item, e, record){
        Ext.Msg.confirm('Удалить роль', 'Действительно ли вы хотите удалить роль "'+record.get('name')+'" ?',
            function(choice){
                if (choice === 'yes') {
                    Ext.Ajax.request({
                        scope: this, url: '/app/api/roles/delete/'+record.get('id'),
                        callback: function () {
                            this.getView().getStore().load();
                        }
                    });
                }
            }, this);

    },

    onRolesCancelEdit: function() {
        this.getView().getStore().reload();
    },

    onRolesStartEdit: function(view, rowIndex, colIndex, item, e, record){
        var grid = this.getView();
        grid.getSelectionModel().select(record);
        grid.getPlugin('roles-editor').startEdit(record, 1);
    },

    onRolesEdit: function(editor, e){
        var record = e.record;
        var recId = parseInt(record.get('id'));
        var params = {
            name: e.newValues.name,
        };
        var url = '/app/api/roles' + (recId === 0 ? '/add':'/update/'+recId);
        Ext.Ajax.request({
            scope: this, url: url, method: 'POST',
            params: params,
            success: function(response, opts) {
                this.getView().getStore().reload();
            }
        });
    },

    onAddRoles: function(b) {
        var grid = this.getView();
        var store = grid.getStore();
        var record = new Ext.data.Model({id: 0});
        store.insert(0, record);
        grid.getPlugin('roles-editor').startEdit(record);
    },
    getRolesTree: function(){
      return this.getView().up().down('[xtype=roles-grid-tree]');
    },
    getRolesGrid: function(){
      return this.getView().up().down('[xtype=roles-grid]');
    },
    onRolesSelect:function(selModel, record, index, options){
      var gridTree = this.getRolesTree();
      var storeTree = gridTree.getStore();
      if(record.get("id")===0){
          delete storeTree.proxy.extraParams['role_id'];
      }else{
          storeTree.proxy.extraParams['role_id'] = record.get("id");
      }
      storeTree.load();
    },
    onRolesCheckChange:function(n,b){
        var gridRoles = this.getRolesGrid();
        var rolId = 0;
        if(gridRoles.getSelectionModel().getSelected().items[0]){
          rolId = gridRoles.getSelectionModel().getSelected().items[0].data.id;
        }
        Ext.Ajax.request({
        scope:this,
        url:"/app/api/roles/checkChange",
        params:{
            code: n.get('id'),
            role_id:rolId,
            value: b
        },

      });



    },
    onRefreshTree:function(){
      var gridTree = this.getRolesTree();
      var storeTree = gridTree.getStore();
      storeTree.load();
    }
});
