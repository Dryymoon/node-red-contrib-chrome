export default {
  category: 'Browser',
  color: '#8BBDD9',
  defaults: {
    name: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: require("../icons/chromium-icon-32.png"),
  label: function () {
    return this.name || "Browser stop";
  },
  paletteLabel: "browser stop",
};

// https://nodered.org/docs/creating-nodes/appearance

/*
 oneditprepare is called immediately before the dialog is displayed.
 oneditsave is called when the edit dialog is okayed.
 oneditcancel is called when the edit dialog is cancelled.
 oneditdelete is called when the delete button in a configuration node’s edit dialog is pressed.
 oneditresize is called when the edit dialog is resized.
 * */