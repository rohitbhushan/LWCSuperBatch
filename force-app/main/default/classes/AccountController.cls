public inherited sharing class AccountController {
   
    @AuraEnabled
    public static List<Account> getAccountList(){
       return [Select Id , Name from Account  ];
    }
}
