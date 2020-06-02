# Contributors Guide

## Saving State

- when asking questions of the user we can name a question with a `_` at the front of the name to indicate that this "answer" should _not_ be stored in normal `.yo-rc.json` store. We still want to retain this information but we don't want it to be saved to GIT. In these cases we will save a file called `.yo-transient.json` and ensure that it's part of the `.gitignore`