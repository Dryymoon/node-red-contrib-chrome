import { isUri } from 'valid-url';

export default {
  category: 'Browser Page',
  color: '#8BBDD9',
  defaults: {
    name: { value: '' },
    url: { value: '', validate: (v) => v === '' ? true : isUri(v) },
    waitUntil: { value: 'load', required: true },
    timeout: { value: 30, required: true, validate: RED.validators.number }
  },
  inputs: 1,
  outputs: 2,
  outputLabels: ["success", "fail"],
  icon: require("../../browser/icons/chromium-icon-32.png"),
  label() {
    return this.name || "goto url";
  },
  paletteLabel: "goto url",
};

// https://nodered.org/docs/creating-nodes/appearance

/*
 oneditprepare is called immediately before the dialog is displayed.
 oneditsave is called when the edit dialog is okayed.
 oneditcancel is called when the edit dialog is cancelled.
 oneditdelete is called when the delete button in a configuration node’s edit dialog is pressed.
 oneditresize is called when the edit dialog is resized.
 * */