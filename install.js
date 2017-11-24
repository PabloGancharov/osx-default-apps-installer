
document.getElementById("installNow").addEventListener('click', function() {
    const { exec } = require('child_process');
    const escapeString = require('escape-string-applescript');
    
        var elements = document.getElementsByClassName('itemToInstall');

        var installElements = [];
        for (var i = 0; i < elements.length; i = i + 1) {
          el = elements[i];
          installElements.push(el);
        };
        
        var checkedItems = installElements.filter(function (item){
            return item.checked === true ;
        });

        var installCommand =  escapeString(checkedItems.map(function (item) {
            var originalItem = list.find(function (anItem) {
                return anItem.key == item.id;
            });
            return originalItem.command;
        }).join(" ; "));


        var finalStringComd = `osascript -e 'tell application "Terminal" to activate' -e 'tell application "Terminal" to do script "${installCommand}" in selected tab of the front window'`;
// console.log(finalStringComd);return;
        var ls = exec(finalStringComd, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });


    
        // ls.stdout.on('data', function (data) {
        //     document.getElementById("droid-output").value += data + '\n';
        // });
    
        // ls.stderr.on('data', function (data) {
        //   console.log('stderr: ' + data);
        // });
    
        // ls.on('close', function (code) {
        //     if (code == 0)
        //         // alert('Process complete.');
        //     else
        //         alert('Error.');

        // });
});

