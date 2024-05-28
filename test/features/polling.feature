Feature: Live Polling Application

    Scenario: Create a new poll
        Given I am on the Create Poll page
        When I create a new poll with the question "What is your favorite color?" and options "Red", "Blue", "Green"
        Then I should receive a voting URL
        And I should receive a QR code for the voting URL
        And I should receive an admin URL for poll results

    Scenario: Vote in a poll
        Given I am on the Create Poll page
        When I create a new poll with the question "What is your favorite color?" and options "Red", "Blue", "Green"
        And I open the voting URL
        And I select "Blue"
        And I submit my vote
        Then my vote should be counted in the poll results

    Scenario: View poll results as admin
        Given I am on the Create Poll page
        When I create a new poll with the question "What is your favorite color?" and options "Red", "Blue", "Green"
        And I open the admin URL
        Then I should see the poll results
        And the results should include the number of votes for "Red", "Blue", and "Green"
