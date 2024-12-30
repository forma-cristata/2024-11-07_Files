# Little Shop of File Drops

# 🌿 Little Shop of File Drops

A whimsical SQL file validator featuring Audrey, the syntax-hungry plant who feeds on your .sql files!

## About

Meet Audrey, your friendly neighborhood SQL-eating plant! This web application lets Audrey munch on your SQL files and tell you whether they're tasty (syntactically valid) or not.

## Features

- Multi-file feeding - Audrey can eat multiple .sql files at once!
- Smart validation - Audrey checks for essential SQL elements:
    - Must start with SELECT
    - Must contain FROM
    - Must end with a semicolon
- Detailed feedback - Audrey tells you which files were delicious and which gave her indigestion
- File type restriction - Audrey only eats .sql files (she's picky!)

## 🛠 Technical Details

The application ignores leading and trailing spaces during validation, ensuring Audrey doesn't get fussy about formatting. File selection is restricted to .sql files using the input field's accepts attribute.

## Usage

- Drop your .sql files into Audrey's mouth (file input)
- Watch as she digests them one by one
- Get feedback on which files were syntactically valid
- If some files are invalid, don't worry - Audrey will keep eating and checking the rest!

## Error Messages

When Audrey encounters a file she can't digest properly, she'll let you know which file caused the problem. Each error message references the specific file name that upset her stomach.

<aside>
Feed me SQL! But please, make sure it's properly formatted - my stomach is sensitive! 

</aside>
