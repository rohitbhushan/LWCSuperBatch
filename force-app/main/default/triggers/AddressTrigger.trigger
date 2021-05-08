trigger AddressTrigger on Address__c (before insert, before update) {
    if(Trigger.isBefore){
        if(Trigger.IsInsert){
            AddressTriggerHandler.getAddress( Trigger.new);
        }else if(Trigger.IsUpdate){
            AddressTriggerHandler.getAddress( Trigger.new);
        } 
        
    }
}