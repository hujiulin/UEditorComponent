/**
 * @author: hujiulin
 * Onclick plain div -> show content in UEditor
 * On mouse out UEditor -> show plain div
 */

var editor_id_array = new Array();
/*
* @planDiv: plan div show html
* @editorDiv: html content in editor
* @editor: UEditor instance
* */
function slideDivToEditor(event) {
    slideEditorToDiv();
    var innerHtml = event.data.planDiv.html();
    event.data.planDiv.css("display", "none");
    event.data.editor.setContent(innerHtml);
    event.data.editorDiv.css("display","block");
    return false;
}
/*
 * @planDiv: plan div show html
 * @editorDiv: html content in editor
 * @editor: UEditor instance
 * */
function slideEditorToDiv() {
    for(var i in editor_id_array) {
        $("#editor-"+ editor_id_array[i]).css("display", "none");
        var innerHtml = UE.getEditor("editor-"+editor_id_array[i]).getContent();
        $("#editor-plain-"+ editor_id_array[i]).html(innerHtml);
        $("#editor-plain-"+ editor_id_array[i]).css("display", "block");
    }
}

/*
* stop propagation
* */
function blockDom() {
   event.stopPropagation();
}

/*
* Initial UEditor
* @id: corresponding to html div id
* */
function initialUEditor(id) {
    var ue = UE.getEditor("editor-"+id,{
        initialContent:$("#editor-plain-"+id).html()
    });
    editor_id_array.push(id);
    $("#editor-plain-"+id).bind("click",{planDiv:$("#editor-plain-"+id), editorDiv:$("#editor-"+id), editor:ue} ,slideDivToEditor);
	$("#editor-"+id).bind("click", blockDom);
}

$(document).ready(function() {
    //实例化编辑器
    initialUEditor("1");
    initialUEditor("2");

    $("#layout").bind("click", slideEditorToDiv);
});
