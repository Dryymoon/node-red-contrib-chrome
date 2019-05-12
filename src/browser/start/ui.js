export default {
  category: 'Browser',
  color: '#8BBDD9',
  defaults: {
    name: { value: '' },
    headless: { value: true },
    incognito: { value: true }
  },
  inputs: 1,
  outputs: 1,
  // outputLabels: ["stdout","stderr"],
  icon: require("../icons/chromium-icon-32.png"),
  label: function () {
    return this.name || "Browser start";
  },
  paletteLabel: "browser start",
};

// https://nodered.org/docs/creating-nodes/appearance

/*
 oneditprepare is called immediately before the dialog is displayed.
 oneditsave is called when the edit dialog is okayed.
 oneditcancel is called when the edit dialog is cancelled.
 oneditdelete is called when the delete button in a configuration node’s edit dialog is pressed.
 oneditresize is called when the edit dialog is resized.
 * */