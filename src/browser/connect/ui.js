// import { name as nodeRedName } from './node-red';
// import url from 'url';

// RED.nodes.registerType(nodeRedName,
export default {
  category: 'Browser',
  color: '#8BBDD9',
  defaults: {
    name: { value: '' },
    browserURL: {
      value: 'http://localhost:9222',
      require: true,
      // validate: ()=>{}
    },
    slowMo: { value: undefined }
  },
  inputs: 1,
  outputs: 1,
  // outputLabels: ["message", "errors"],
  icon: require("../icons/chromium-icon-32.png"),
  label: function () {
    return this.name || "connect";
  },
  paletteLabel: "connect",
  oneditprepare() {
    // $("#node-input-browserURL").val(this.browserURL);
    // $("#node-input-slowMo").val(this.slowMo);
    // $("#node-input-name").val(this.name);
  }
};
// );

// https://nodered.org/docs/creating-nodes/appearance
// s

/*
 oneditprepare is called immediately before the dialog is displayed.
 oneditsave is called when the edit dialog is okayed.
 oneditcancel is called when the edit dialog is cancelled.
 oneditdelete is called when the delete button in a configuration node’s edit dialog is pressed.
 oneditresize is called when the edit dialog is resized.
 * */