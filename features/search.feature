Feature: Validate Search Functionality
  Scenario: Validate Search Functionality
    Given the application is loaded successfully
    When user searches for word "Testing"
    And user clicks on "Skill" Dropdown
    When user searches for "Automation testing" in Skill Dropdown
    Then user sees results matching the search term in the UI
    # And user fetches search results from the API
    # Then the UI results should match the API results
