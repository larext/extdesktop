Ext.override(Ext.util.Format, {
    refsChildren: function(refName){
        var refs = Desktop.data.refs;
        var refsItems = [];
        if(refs[refName]){
            refsItems = Ext.clone(refs[refName]);
        }
        return refsItems;
    },
    refs: function(refName, refValue){
        var refText = refValue;
        var refs = Ext.util.Format.refsChildren(refName);
        Ext.each(refs, function(rItem){
            if(rItem.value === refValue){
                refText = rItem.text;
            }
        }, this);
        return refText;
    },
    fieldsRenderer: function(fields){
        return function(v, m, record, rowIndex, colIndex, store, view){
            var refText = v;
            if(Ext.isEmpty(refText)){
                Ext.each(fields, function(fieldName){
                    if(Ext.isEmpty(refText)){
                        refText = record.get(fieldName);
                    }
                }, this);
            }
            return refText;
        }
    },

    fieldRenderer: function(fieldName){
        return function(v, m, record, rowIndex, colIndex, store){
            return record.get(fieldName);
        }
    },
    
    refsRenderer: function(refName, valueType){
        valueType = valueType === undefined ? 'int' : valueType;
        return function(v, m, record, rowIndex, colIndex, store, view){
            var refText = v;
            var refs = Ext.util.Format.refsChildren(refName);
            Ext.each(refs, function(rItem){
                if(valueType === 'int'){
                    if(parseInt(rItem.value) === parseInt(v)){
                        refText = rItem.text;
                    }
                }else if(valueType === 'string'){
                    if(rItem.value === v){
                        refText = rItem.text;
                    }
                }
            }, this);
            return refText;
        }
    }
});
