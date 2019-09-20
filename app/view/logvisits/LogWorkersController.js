Ext.define('Desktop.view.logvisits.LogWorkersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.log-cont-workers',
    afterRender: function(){

        this.lookup('logFilterDep').getStore().on("load", function(store){
            store.insert( 0, new Ext.data.Record({id:0, name:'Все отделы'}));
        }, this);

        this.getView().getStore().on("load", function(store){
            store.insert( 0,
                new Ext.data.Record({id:0, fio:'Все сотрудники'})
            );
        }, this);

        this.getView().getStore().load();
    },
    // row select filter
    onWorkersSelect:function(selModel, record, index, options){
      var visits= this.getVisits();
      var vStore= visits.getStore();

      if(record.get("id")===0){
          delete vStore.proxy.extraParams['worker_id'];
      }else{
          vStore.proxy.extraParams['worker_id'] = record.get("id");
      }
      vStore.load();

    },
    // row select filter
    getVisits: function(){
      return this.getView().up().down('[xtype=log-visits]');
    },
    //Dep combo select filter
    getUsers: function(){
        return this.getView().up().down('[xtype=log-visits-worker]');
    },
    // Dep combo select filter
    onDepComboSelect: function( combo, r, eOpts){
        var grid= this.getUsers();
        var visits= this.getVisits();
        var store = grid.getStore();
        var vStore = visits.getStore();
        delete vStore.proxy.extraParams['worker_id'];
        if(r.get("id")===0){
            delete store.proxy.extraParams['devision_id'];
            delete vStore.proxy.extraParams['devision_id'];
        }else{
            store.proxy.extraParams['devision_id'] = r.get("id");
            vStore.proxy.extraParams['devision_id'] = r.get("id");
        }
        store.load({
            callback: function(){
            grid.getSelectionModel().selectAll(false);
          }
        });
        vStore.load();
    }



});
