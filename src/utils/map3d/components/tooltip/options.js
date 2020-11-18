export const defaultOptions = {
  // show: true,
  trigger: 'mousemove', // click
  alwaysShowContent: false,
  triggerOn: 'area', // scatter | area
  showDelay: 0,
  hideDelay: 0,
  position: [],
  enterable: false,
  offset: [15, 15],
  placement: 'right',
  pointCenter: false,
  background: 'rgba(0, 60, 100, 0.7)',
  transitionDuration: 100,
  border: '#333',
  borderRadius: 4,
  borderWidth: 0,
  borderType: 'solid',
  padding: 10,
  width: 'auto',
  height: 'auto',
  boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)',
  textStyle: {
    color: '#fff',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 14,
    lineHeight: 24,
    whiteSpace: 'nowrap'
  },
  // extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
  extraCssText: '',
  formatter: '{name}: <br/>  {value}'
}
