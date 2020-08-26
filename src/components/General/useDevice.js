export default () => window.innerWidth > 768 ? 'tablet'
  : window.innerWidth > 1024 ? 'desktop'
  : window.innerWidth > 1148 ? 'lgscreen'
  : 'mobile';
