# find_leaders

Selenium Test case for the following workflow:
1. Start scenario on https://mailchimp.com/
2. Navigate to MailChimps about page
3. Save each leadership team members name, position, and description into a .csv file.
4. End scenario

Tech stack:
- Selenium (for UI automation since it's specified)
- Page Object model design pattern (hand-built page objects)
- Ava (test runner)
- Chai (asserts)

To execute

[Install ava globally](https://github.com/avajs/ava#usage)

```
npm install
npm test
```
