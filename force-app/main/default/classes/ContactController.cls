@isTest
public with sharing class ContactController {
   
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContacts(){
        /*return [Select Id , FirstName , LastName ,  Email from Contact  WITH SECURITY_ENFORCED
        ORDER BY Name];
        */
       throw new AuraHandledException('Forced error');
    }
    // test again comments again test me 
}