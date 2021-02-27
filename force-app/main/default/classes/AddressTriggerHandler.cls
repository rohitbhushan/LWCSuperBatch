public inherited sharing class AddressTriggerHandler {
    
    public static void getAddress(List<Address__c> addressList){
        List<AddressISOCodeMap__mdt> addressMetaDataList = [Select Id ,label, alpha2__c, alpha3__c, UN_Code__c
                                                                 from AddressISOCodeMap__mdt ];
        for(Address__c addrs : addressList){
            String uniKey = '';
            unikey = addrs.Alpha2__c +addrs.Alpha3__c+ addrs.UN_Code__c;
            for(AddressISOCodeMap__mdt mtdRec : addressMetaDataList ){
                String comKey = '';
                comKey = mtdRec.alpha2__c+mtdRec.alpha3__c+mtdRec.UN_Code__c;
                if(comKey == uniKey){
                    addrs.Country__c = mtdRec.label;
                }
                    
            }

        }
    
    }
}