export default function ScrollToTop() {
    const currentPosition = window.pageYOffset;
    if (currentPosition > 0) {
       window.requestAnimationFrame(ScrollToTop);
       window.scrollTo(0, currentPosition - currentPosition / 10);
    }
 }
 