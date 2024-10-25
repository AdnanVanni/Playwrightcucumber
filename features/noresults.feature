  Feature: Validate Search Functionality for NonExistentTerm
  
   Scenario: Invalid Search with No Results
     Given the app is loaded
     When user searchs for NonExistentTerm
     Then user should see a "No results found" message