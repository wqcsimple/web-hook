/**
 * @author whis admin@wwhis.com
 * @Created 5/27/17
 */
module.exports = data => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Log</title>
    <style type="text/css">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-touch-callout: none;
        //-webkit-appearance: none;
        -webkit-font-smoothing: antialiased;
        font-size: 13px; line-height: 20px;
        background: #222; color: #ddd;
        font-family: "Consolas", "Monaco", "Menlo";
    }
    body {
     padding: 0 15px;
    }
    </style>
</head>

<body>
<div>${data}</div>
</body>

</html>
`