document.addEventListener("DOMContentLoaded", () =>
{
    const audreyPhoto = document.querySelector("#img-div img");
    const audreyInput = document.querySelector("#img-div input");

    audreyInput.addEventListener('change', (event) =>
    {
        clearResults();

        for(let i = 0; i < event.target.files.length; i++)
        {
            let sql = readFiles(event.target.files[i]);
            if(sql)
            {
                validateSQL(sql, event.target.files[i].name)
            }
        }

    });

    audreyInput.addEventListener('click', (event) =>
    {
        event.stopPropagation();
    });

    audreyInput.addEventListener('dragover',  (event) =>
    {
        event.preventDefault();
        audreyPhoto.classList.add("drag-over");
    });

    audreyInput.addEventListener('dragleave',  () =>
    {
        audreyPhoto.classList.remove("drag-over");
    });

    audreyInput.addEventListener('drop', async (event) => {
        event.preventDefault();

        audreyPhoto.classList.remove("drag-over");
        clearResults();

        for(let i = 0; i < event.dataTransfer.length; i++)
        {
            let sql = readFiles(event.dataTransfer.files[i]);
            if(sql)
            {
                validateSQL(sql, event.dataTransfer.files[i].name)
            }
        }
    });
    audreyPhoto.addEventListener('click', () =>
    {
        audreyInput.click();
    });

});

function readFiles(file)
{
    let sql = ""

    if(!file.name.match('\.sql')) {
        // TODO error messages
        return null;
    }

    const reader = new FileReader();

    reader.onprogress = (event) =>
    {
       if(event.lengthComputable)
       {
           const percentComplete = Math.round(event.loaded / event.total * 100);
           console.log(percentComplete);
           if(percentComplete < 100)
           {
               console.log("Still loading");
           }
           else
           {
               console.log("Upload Complete");
           }
       }
    };

    reader.onload = (event) =>
    {
        sql = event.target.result;
        console.log(sql);
        validateSQL(sql, file.name);
    };

    reader.readAsText(file);
}

function validateSQL(sql, fileName)
{
    console.log(sql);

    sql = sql.trim();
    let sqlWords = sql.split(' ');
    const lastWord = sqlWords[sqlWords.length - 1];
    const charArrayLastWord = lastWord.split("");
    const lastCharacter = charArrayLastWord[charArrayLastWord.length - 1];
    let errors = ['select', 'from', 'semicolon'];
    let thisErrors = [];

    if(sqlWords[0] !== 'SELECT')
    {
        // FILE DOES NOT START WITH THE SELECT KEYWORD
        thisErrors.push(errors[0]);
    }

    if(sqlWords.indexOf("FROM") === -1)
    {
        // FILE DOES NOT CONTAIN THE FROM KEYWORD
        thisErrors.push(errors[1]);
    }

    if(lastCharacter !== ';')
    {
        // FILE DOES NOT END WITH A SEMICOLON
        thisErrors.push(errors[2]);
    }

    document.getElementById('audrey-text-box').classList.remove("d-none");

    if(thisErrors.length === 0)
    {
        document.getElementById('all-good').classList.remove("d-none");
    }

    for(let error of thisErrors)
    {
        switch(error)
        {
            case errors[0]:
                document.getElementById('select-error').classList.remove("d-none");
                document.getElementById('select-error').innerHTML = `${fileName}: DOESN'T BEGIN WITH <em>SELECT</em> KEYWORD`;
                break;
            case errors[1]:
                document.getElementById('from-error').classList.remove("d-none");
                document.getElementById('from-error').innerHTML = `${fileName}: DOESN'T CONTAIN THE <em>FROM</em> KEYWORD`;
                break;
            case errors[2]:
                document.getElementById('semicolon-error').classList.remove("d-none");
                document.getElementById('semicolon-error').innerHTML = `${fileName}: DOESN'T END WITH A SEMICOLON`;
                break;
        }
    }


}

function clearResults()
{
    const allVisible = [document.getElementById('select-error'), document.getElementById('from-error'), document.getElementById('semicolon-error'), document.getElementById('audrey-text-box'), document.getElementById("all-good")];

    for(let i = 0; i < allVisible.length; i++)
    {
        allVisible[i].className = "d-none";
    }
}