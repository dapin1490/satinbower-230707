export function toc() {
  if (document.querySelector('#core-wrapper h1')) {
    // see: https://github.com/tscanlin/tocbot#usage
    tocbot.init({
      tocSelector: '#toc',
      contentSelector: '.post-content',
      ignoreSelector: '[data-toc-skip]',
      headingSelector: 'h1',
      orderedList: false,
      scrollSmooth: false
    });
  }
}
