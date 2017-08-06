(function() {

    var tags = [
        "INPUT",
        "TEXTAREA"
    ];
    var spaceBarPressed;
    var isTextTag;
    var foundHash;

    document.addEventListener("keydown", function(e) {

        foundHash = false;
        spaceBarPressed = e.keyCode === 32;
        isTextTag = (tags.indexOf(document.activeElement.tagName) !== -1);

        if (isTextTag && spaceBarPressed)
        {
            var inputText = document.activeElement.value;
            var lines = inputText.split("\n")

            for (var i = 0; i < lines.length; i++)
            {
                var words = lines[i].match(/(?:[^\s']+|'[^']*')+/g) || 0;

                for (var j = 0; j < words.length; j++)
                {
                    if (words[j].includes("#"))
                    {
                        if (words[j].length === 1) return;

                        foundHash = true;

                        words[j] = `(((${words[j].replace(/[#]*[']*/g, "")})))`;
                        lines[i] = words.join(" ");                        
                    }
                }
            }

            if (foundHash)
                document.activeElement.value = lines.join("\n");

        }
    });
})();
