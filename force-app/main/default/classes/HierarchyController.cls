public class HierarchyController {
     
    @AuraEnabled
    public static List<item> getAccountTree(){
         
        List<item> items = new List<item>();
        List<Account> acctList = new List<Account>();
        //get list of accounts and respective Opp
        acctList = [SELECT Id, Name, (SELECT Id, Name From Opportunities) From Account where ID IN  ('0012x000005Kw5qAAC','0012x000005Kw5mAAC','0012x000005Kw5gAAC')];
        for(Account acc: acctList){
             
            //get Opp of current account record
            List<item> oppitems = new List<item>();
            for(Opportunity opp: acc.Opportunities){
                //add opportunity items
                item oppitem = new item(opp.Name, String.valueOf(opp.Id), false, null);
                oppitems.add(oppitem);
            }
             
            //add account items
            item accitem = new item(acc.Name, String.valueOf(acc.Id), false, oppitems);
            items.add(accitem);
        }
        return items;
    }
     
    //Item Wrapper Class
    public class item{
        @AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public Boolean expanded {get; set;}
        @AuraEnabled
        public List<item> items {get; set;}
         
        public item(String label, String name, Boolean expanded, List<item> items){
            this.label = label;
            this.name = name;
            this.expanded = expanded;
            this.items = items;
        }
    }
}