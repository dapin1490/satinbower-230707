export function toc() {
  if (document.querySelector('#core-wrapper h1,#core-wrapper h2')) {
    // see: https://github.com/tscanlin/tocbot#usage
    tocbot.init({
      tocSelector: '#toc',
      contentSelector: '.post-content',
      ignoreSelector: '[data-toc-skip]',
      headingSelector: 'h1, h2',
      orderedList: false,
      scrollSmooth: false
    });
  }
}
