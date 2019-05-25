import ace from 'ace-builds';

export default {
  category: 'Browser Page',
  color: '#8BBDD9',
  defaults: {
    name: { value: '' },
    code: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: require("../../browser/icons/chromium-icon-32.png"),
  label() {
    return this.name || "page-evaluate";
  },
  paletteLabel: "page-evaluate",
  oneditprepare() {
    const editor = ace.edit("code-editor");
    editor.session.setMode("ace/mode/javascript");
    editor.session.setValue(this.code);
    this.$$editor = editor;
  },
  oneditsave() {
    this.code = this.$$editor.getValue();
  }
};

// https://nodered.org/docs/creating-nodes/appearance

/*
 oneditprepare is called immediately before the dialog is displayed.
 oneditsave is called when the edit dialog is okayed.
 oneditcancel is called when the edit dialog is cancelled.
 oneditdelete is called when the delete button in a configuration node’s edit dialog is pressed.
 oneditresize is called when the edit dialog is resized.
 * */