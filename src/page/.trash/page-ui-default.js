export default {
  category: 'Browser Page',
  color: '#8BBDD9',
  defaults: {
    name: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: require("../browser/icons/chromium-icon-32.png"),
  label() {
    return this.name || this.paletteLabel;
  },
  paletteLabel: new Error('paletteLabel shold be defined'),
};