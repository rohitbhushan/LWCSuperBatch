@isTest
public inherited sharing class AddressTriggerHandler_Test {
    @isTest
    public static void testM1(){
        List<Address__c> addList = new List<Address__c>();
        for(integer i =0 ; i < 3 ; i++){
            Address__c rec = new Address__c();
            rec.alpha2__c = 'AD';
            rec.alpha3__c = 'AND';
            rec.UN_Code__c = '020';
            addList.add(rec);
        }
        if(addList.size() > 0){
            insert addList;
        }
        addList[0].alpha2__c = 'AL';
        addList[0].alpha3__c = 'ALB';
        addList[0].UN_Code__c = '008';
        update addList[0];
    }
}