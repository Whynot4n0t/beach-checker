function editDropBox() {
    let cSelect = document.getElementById('changingList');
    let holder  = document.getElementById('selectHolder');
    
    if(cSelect != null) {
        // if not edit option selected -> just exit
        if(cSelect.value != "-99") {
            return false;
        }
        
        let optionsSavehouse = [];
        
        let optionsArray = Array.from(cSelect.options);

        const arrayLength = optionsArray.length;
        for (let o = 0; o < arrayLength; o++) {
            const option = optionsArray[o];
            let  oVal = option.value;

            if(oVal > 0) {
                let localParams = [];
                localParams.push(option.text);
                localParams.push(option.value);
                //localParams.push(option.selected); // if needed
                optionsSavehouse.push(localParams);
            }
        }
        
        let hidden = ("<input id='hidden_select_options' type='hidden' value='" + JSON.stringify(optionsSavehouse) + "' />");
    
        if(holder != null) {
            // here temporarily 'input' field, which you can change as you wish, add classes, styles, increase size etc.
            holder.innerHTML = (hidden + "<input size='10' type='text' id='tempInput' name='name_temp_input' onchange='restoreDropBox()'>");
            document.getElementById('tempInput').focus();
            return true;
        }
    }
    return false;
}

function restoreDropBox() {
    let holder = document.getElementById('selectHolder');
    let cInput = document.getElementById('tempInput');
    let hOptions = document.getElementById('hidden_select_options');

    if(holder != null) {

        let optionsArray = [];

        if(hOptions != null) {
            optionsArray = JSON.parse(hOptions.value);
        }

        let selectListString = "<select id='changingList' onchange='editDropBox();'>\n";

        let arrayLength = optionsArray.length;
        for (let o = 0; o < arrayLength; o++) {
            let option = optionsArray[o];
            selectListString += ("<option value='" + option[1] + "'>" + option[0] + "</option>\n");
        }

        if(cInput != null) {
            // do not forget change 'value' for new element for something
            // what will fit your purpose
            let nextElementValue = (arrayLength + 1);
            selectListString += ("<option value='" + nextElementValue + "' selected>" + cInput.value + "</option>\n");
        }

        selectListString += ("<option value='-99'>- Edit -</option>\n</select>");
        holder.innerHTML = selectListString;
    }
}
    