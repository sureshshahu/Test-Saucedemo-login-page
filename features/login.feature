Feature: SauceDemo Login
  As a registered SauceDemo user
  I want to log in with my credentials
  So that I can access the products page

  Background:
    Given the user is on the SauceDemo login page

  Scenario: Successful login with a standard user
    When the user logs in with the "standardUser" credentials
    Then the user should be navigated to the products page

  Scenario: Login is blocked for a locked out user
    When the user logs in with the "lockedOutUser" credentials
    Then the user should see an error message "Sorry, this user has been locked out."

  Scenario: Login fails with invalid credentials
    When the user logs in with the "invalidUser" credentials
    Then the user should see an error message "Username and password do not match any user in this service"
