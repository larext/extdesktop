Ext.define('Desktop.view.users.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users-users',
    afterRender: function(){
        this.getView().getStore().load();
    },
    onWorkersEdit: function(view, rowIndex, colIndex, item, e, record){
        Ext.create({xtype: 'users-edit', recId: record.get('id'), listeners: {scope: this, close: this.onReloadStore}});
        e.stopEvent();
    },
    onReloadStore:function(){
        this.getView().getStore().load();
    },

    onAddUser:function(b){
      Ext.create({xtype: 'users-edit', recId: 0, listeners: {scope: this, close: this.onReloadStore}});


    },
    onUserdelete:function(b){

    },
    onUserDelete:function(view, rowIndex, colIndex, item, e, record){
      Ext.Msg.confirm('Удалить', 'Действительно ли вы хотите удалить задачу "'+record.get('fio')+'" ?',
          function(choice){
              if (choice === 'yes') {
                  Ext.Ajax.request({
                      scope: this, url: '/app/api/users/delete/'+record.get('id'),
                      //params: {module: 'CTasks', action: 'delete', id: record.get('id')},
                      success: function(response, opts) {

                      },
                      callback: function () {
                           this.getView().getStore().load();
                      }
                  });
              }
      }, this);

    },
  

});
